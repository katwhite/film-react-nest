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
      const seatKey = `${ticket.row}:${ticket.seat}`;

      const result = await this.filmModel
        .updateOne(
          {
            id: ticket.film,
            'schedule.id': ticket.session,
            'schedule.taken': { $ne: seatKey },
          },
          {
            $addToSet: { 'schedule.$.taken': seatKey },
          },
        )
        .exec();

      if (result.modifiedCount === 0) {
        const exists = await this.filmModel
          .exists({
            id: ticket.film,
            'schedule.id': ticket.session,
          })
          .exec();
        if (!exists) {
          throw new NotFoundException(`Film or schedule not found`);
        }
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
