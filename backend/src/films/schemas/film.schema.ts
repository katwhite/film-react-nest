import { Schema, Document } from 'mongoose';

export interface ScheduleItem {
  id: string;
  daytime: Date;
  hall: number;
  rows: number;
  seats: number;
  price: number;
  taken: string[]; // массив мест, которые уже заняты
}

export interface Film extends Document {
  id: string;
  rating: number;
  director: string;
  tags: string[];
  image: string;
  cover: string;
  title: string;
  about: string;
  description: string;
  schedule: ScheduleItem[];
}

export const FilmSchema = new Schema<Film>({
  id: { type: String, required: true, unique: true },
  rating: Number,
  director: String,
  tags: [String],
  image: String,
  cover: String,
  title: String,
  about: String,
  description: String,
  schedule: [
    {
      id: String,
      daytime: Date,
      hall: Number,
      rows: Number,
      seats: Number,
      price: Number,
      taken: [String],
    },
  ],
});
