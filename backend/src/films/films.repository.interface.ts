import { Film } from './film.entity';

export interface IFilmsRepository {
  findAll(): Promise<Film[]>;
  findOne(id: string): Promise<Film | null>;
}
