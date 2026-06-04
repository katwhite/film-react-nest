import { Entity, Column, OneToMany, PrimaryColumn } from 'typeorm';
import { Schedule } from './schedule.entity';

@Entity()
export class Film {
  @PrimaryColumn()
  id: string;

  @Column('float')
  rating: number;

  @Column()
  director: string;

  @Column('text', { array: true, default: [] })
  tags: string[];

  @Column()
  image: string;

  @Column()
  cover: string;

  @Column()
  title: string;

  @Column()
  about: string;

  @Column()
  description: string;

  @OneToMany(() => Schedule, (schedule) => schedule.film)
  schedule: Schedule[];
}
