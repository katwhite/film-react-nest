import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { FilmsService } from './films.service';

@Controller('afisha/films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}
  // GET /api/afisha/films
  @Get()
  getFilms() {
    return this.filmsService.findAll();
  }

  // GET /api/afisha/films/:id/schedule
  @Get(':id/schedule')
  async getFilmSchedule(@Param('id') id: string) {
    const film = await this.filmsService.findById(id);
    if (!film) {
      throw new NotFoundException(`Film with id ${id} not found`);
    }
    return film.schedule;
  }
}
