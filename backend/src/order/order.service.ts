import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { CreateOrderDto, TicketDto } from './dto/order.dto';
import { ScheduleRepository } from './schedule.repository';

@Injectable()
export class OrderService {
  constructor(private readonly scheduleRepository: ScheduleRepository) {}

  async createOrder(order: CreateOrderDto) {
    const { tickets } = order;
    const bookedTickets: TicketDto[] = [];

    for (const ticket of tickets) {
      const seatKey = `${ticket.row}:${ticket.seat}`;

      const exists = await this.scheduleRepository.existsByFilmAndSchedule(
        ticket.film,
        ticket.session,
      );
      if (!exists) {
        throw new NotFoundException(`Film or schedule not found`);
      }

      const success = await this.scheduleRepository.bookSeat(
        ticket.session,
        seatKey,
      );
      if (!success) {
        throw new ConflictException(`Seat ${seatKey} is already taken`);
      }

      bookedTickets.push({
        film: ticket.film,
        session: ticket.session,
        daytime: ticket.daytime,
        row: ticket.row,
        seat: ticket.seat,
        price: ticket.price,
      });
    }

    return {
      total: bookedTickets.length,
      items: bookedTickets,
    };
  }
}
