import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Schedule } from 'src/films/schedule.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ScheduleRepository {
  constructor(
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
  ) {}

  async bookSeat(scheduleId: string, seatKey: string): Promise<boolean> {
    const result = await this.scheduleRepository
      .createQueryBuilder()
      .update(Schedule)
      .set({
        taken: () => `array_append(taken, '${seatKey}')`,
      })
      .where('id = :id', { id: scheduleId })
      .andWhere('NOT (:seatKey = ANY(taken))', { seatKey })
      .execute();

    return result.affected === 1;
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
