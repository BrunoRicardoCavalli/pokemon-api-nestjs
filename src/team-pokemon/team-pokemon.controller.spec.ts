import { Test, TestingModule } from '@nestjs/testing';
import { TeamPokemonController } from './team-pokemon.controller';
import { TeamPokemonService } from './team-pokemon.service';

describe('TeamPokemonController', () => {
  let controller: TeamPokemonController;

  const teamPokemonServiceMock = {
    create: jest.fn(),
    findAll: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeamPokemonController],
      providers: [
        {
          provide: TeamPokemonService,
          useValue: teamPokemonServiceMock,
        },
      ],
    }).compile();

    controller = module.get<TeamPokemonController>(TeamPokemonController);

    jest.clearAllMocks();
  });

  it('deve estar definido', () => {
    expect(controller).toBeDefined();
  });
});
