import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Film } from '../films/schemas/film.schema';
import { CreateOrderDto } from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(@InjectModel('Film') private filmModel: Model<Film>) {}

  async createOrder(createOrderDto: CreateOrderDto) {
    const { filmId, scheduleId, seats } = createOrderDto;

    const film = await this.filmModel.findOne({ id: filmId }).exec();
    if (!film) {
      throw new NotFoundException(`Film with id ${filmId} not found`);
    }

    const schedule = film.schedule.find((s) => s.id === scheduleId);
    if (!schedule) {
      throw new NotFoundException(`Schedule with id ${scheduleId} not found`);
    }

    const alreadyTaken = seats.filter((seat) => schedule.taken.includes(seat));
    if (alreadyTaken.length > 0) {
      throw new ConflictException(
        `Seats ${alreadyTaken.join(', ')} are already taken`,
      );
    }

    const updatedTaken = [...schedule.taken, ...seats];

    const updatedFilm = await this.filmModel
      .findOneAndUpdate(
        { id: filmId, 'schedule.id': scheduleId },
        { $set: { 'schedule.$.taken': updatedTaken } },
        { new: true },
      )
      .exec();

    if (!updatedFilm) {
      throw new NotFoundException('Could not update the schedule');
    }

    return {
      message: 'Order created successfully',
      order: {
        filmId,
        scheduleId,
        seats,
        totalPrice: seats.length * schedule.price,
      },
    };
  }
}
