import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Film } from '../films/schemas/film.schema';
import { CreateOrderDto, TicketDto } from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(@InjectModel('Film') private filmModel: Model<Film>) {}

  async createOrder(order: CreateOrderDto) {
    const { tickets } = order;
    const bookedTickets: TicketDto[] = [];

    for (const ticket of tickets) {
      const film = await this.filmModel.findOne({ id: ticket.film }).exec();
      if (!film) {
        throw new NotFoundException(`Film with id ${ticket.film} not found`);
      }

      const schedule = film.schedule.find((s) => s.id === ticket.session);
      if (!schedule) {
        throw new NotFoundException(
          `Schedule with id ${ticket.session} not found`,
        );
      }

      const seatKey = `${ticket.row}:${ticket.seat}`;
      if (schedule.taken.includes(seatKey)) {
        throw new ConflictException(`Seat ${seatKey} is already taken`);
      }

      const updatedTaken = [...schedule.taken, seatKey];
      const updateResult = await this.filmModel
        .updateOne(
          { id: ticket.film, 'schedule.id': ticket.session },
          { $set: { 'schedule.$.taken': updatedTaken } },
        )
        .exec();

      if (updateResult.modifiedCount === 0) {
        throw new NotFoundException('Could not update the schedule');
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
