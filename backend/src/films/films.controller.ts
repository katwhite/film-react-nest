import { Controller, Get, Param } from '@nestjs/common';
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
    return this.filmsService.findById(id);
  }
}
