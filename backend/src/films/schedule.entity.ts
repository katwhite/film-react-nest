import { Entity, Column, ManyToOne, PrimaryColumn } from 'typeorm';
import { Film } from './film.entity';

@Entity()
export class Schedule {
  @PrimaryColumn()
  id: string;

  @Column('timestamptz')
  daytime: Date;

  @Column('int')
  hall: number;

  @Column('int')
  rows: number;

  @Column('int')
  seats: number;

  @Column('int')
  price: number;

  @Column('text', { array: true, default: [] })
  taken: string[];

  @ManyToOne(() => Film, (film) => film.schedule)
  film: Film;
}
