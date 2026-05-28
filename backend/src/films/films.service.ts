import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Film } from './schemas/film.schema';
import { FilmResponseDto } from './dto/films.dto';

@Injectable()
export class FilmsService {
  constructor(@InjectModel('Film') private filmModel: Model<Film>) {}

  async findAll(): Promise<{ total: number; items: FilmResponseDto[] }> {
    const films = await this.filmModel.find().exec();
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
    const film = await this.filmModel.findOne({ id: id }).exec();
    if (!film) {
      throw new NotFoundException('Film not found');
    }
    delete film._id;
    delete film.__v;
    // return film; -- чтобы просто вернуть объект с полями фильма и массивом сеансов, как ожидает фронт
    const { schedule, ...filmWithoutSchedule } = film;
    return {
      ...filmWithoutSchedule,
      total: schedule.length,
      items: schedule,
    };
  } // -- чтобы не падали тесты
}
