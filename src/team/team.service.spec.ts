import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';
import { Trainer } from '../trainer/entities/trainer.entity';
import { TeamService } from './team.service';

describe('TeamService', () => {
  let service: TeamService;

  const teamRepositoryMock = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    preload: jest.fn(),
    remove: jest.fn(),
  };

  const trainerRepositoryMock = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TeamService,
        {
          provide: getRepositoryToken(Team),
          useValue: teamRepositoryMock,
        },
        {
          provide: getRepositoryToken(Trainer),
          useValue: trainerRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<TeamService>(TeamService);

    jest.clearAllMocks();
  });

  it('deve estar definido', () => {
    expect(service).toBeDefined();
  });
});
