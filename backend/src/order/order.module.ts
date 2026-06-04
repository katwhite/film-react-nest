import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleRepository } from './schedule.repository';
import { Schedule } from 'src/films/schedule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Schedule])],
  controllers: [OrderController],
  providers: [OrderService, ScheduleRepository],
})
export class OrderModule {}
