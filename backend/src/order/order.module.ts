import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { FilmSchema } from '../films/schemas/film.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Film', schema: FilmSchema }])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
