import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Trainer } from './entities/trainer.entity';
import { TrainerService } from './trainer.service';

describe('TrainerService', () => {
  let service: TrainerService;

  const trainerRepositoryMock = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    preload: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TrainerService,
        {
          provide: getRepositoryToken(Trainer),
          useValue: trainerRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<TrainerService>(TrainerService);

    jest.clearAllMocks();
  });

  it('deve estar definido', () => {
    expect(service).toBeDefined();
  });
});
