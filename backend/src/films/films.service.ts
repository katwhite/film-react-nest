import { Injectable, NotFoundException } from '@nestjs/common';

import { FilmResponseDto } from './dto/films.dto';
import { FilmsRepository } from './films.repository';
import { Film } from './film.entity';

@Injectable()
export class FilmsService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async findAll(): Promise<{ total: number; items: FilmResponseDto[] }> {
    const films = await this.filmsRepository.findAll();
    const items = films.map((film) => this.toFilmDTO(film));
    return { total: items.length, items };
  }

  private toFilmDTO(film: Film): FilmResponseDto {
    return {
      id: film.id,
      rating: film.rating,
      director: film.director,
      tags: film.tags,
      image: film.image,
      cover: film.cover,
      title: film.title,
      about: film.about,
      description: film.description,
    };
  }

  async findById(id: string) {
    const film = await this.filmsRepository.findOne(id);
    if (!film) {
      throw new NotFoundException('Film not found');
    }
    // return film; -- чтобы просто вернуть объект с полями фильма и массивом сеансов, как ожидает фронт
    const schedule = film.schedule ?? [];
    const { schedule: _, ...filmWithoutSchedule } = film;
    return {
      ...filmWithoutSchedule,
      total: schedule.length,
      items: schedule,
    };
  } // -- чтобы не падали тесты
}
