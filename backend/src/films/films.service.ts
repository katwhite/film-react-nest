import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Film } from './schemas/film.schema';

@Injectable()
export class FilmsService {
  constructor(@InjectModel('Film') private filmModel: Model<Film>) {}

  async findAll(): Promise<Film[]> {
    return this.filmModel.find().exec();
  }

  async findById(id: string): Promise<Film | null> {
    return this.filmModel.findOne({ id }).exec();
  }
}
