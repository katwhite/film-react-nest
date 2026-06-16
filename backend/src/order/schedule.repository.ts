import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Schedule } from './../films/schedule.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ScheduleRepository {
  constructor(
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
  ) {}

  async bookSeat(scheduleId: string, seatKey: string): Promise<boolean> {
    const schedule = await this.scheduleRepository.findOne({
      where: { id: scheduleId },
    });
    if (!schedule) return false;
    if (schedule.taken.includes(seatKey)) return false;
    schedule.taken.push(seatKey);
    await this.scheduleRepository.save(schedule);
    return true;
  }

  async existsById(id: string): Promise<boolean> {
    const count = await this.scheduleRepository.count({ where: { id } });
    return count > 0;
  }

  async existsByFilmAndSchedule(
    filmId: string,
    scheduleId: string,
  ): Promise<boolean> {
    const count = await this.scheduleRepository.count({
      where: {
        id: scheduleId,
        film: { id: filmId },
      },
    });
    return count > 0;
  }
}
