import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Film } from './film.entity';
import { IFilmsRepository } from './films.repository.interface';

@Injectable()
export class FilmsRepository implements IFilmsRepository {
  constructor(
    @InjectRepository(Film)
    private filmsRepository: Repository<Film>,
  ) {}

  async findAll(): Promise<Film[]> {
    return this.filmsRepository.find();
  }

  async findOne(id: string): Promise<Film | null> {
    return this.filmsRepository.findOne({ where: { id }, relations: ['schedule'], });
  }
}
