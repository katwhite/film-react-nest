import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';

describe('FilmsController', () => {
  let controller: FilmsController;
  let filmsService: FilmsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [FilmsService],
    })
      .overrideProvider(FilmsService)
      .useValue({
        findAll: jest.fn(),
        findById: jest.fn(),
      })
      .compile();

    controller = module.get<FilmsController>(FilmsController);
    filmsService = module.get<FilmsService>(FilmsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getFilms', () => {
    it('should call findAll', async () => {
      controller.getFilms();
      expect(filmsService.findAll).toHaveBeenCalled();
    });
  });

  describe('getFilmSchedule', () => {
    it('should call findById', async () => {
      const filmId = 'some-uuid';
      controller.getFilmSchedule(filmId);
      expect(filmsService.findById).toHaveBeenCalledWith(filmId);
    });
  });
});
