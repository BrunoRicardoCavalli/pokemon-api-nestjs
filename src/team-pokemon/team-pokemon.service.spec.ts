import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PokemonService } from '../pokemon/pokemon.service';
import { Team } from '../team/entities/team.entity';
import { TeamPokemon } from './entities/team-pokemon.entity';
import { TeamPokemonService } from './team-pokemon.service';

describe('TeamPokemonService', () => {
  let service: TeamPokemonService;

  const teamPokemonRepositoryMock = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  };

  const teamRepositoryMock = {
    findOne: jest.fn(),
  };

  const pokemonServiceMock = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TeamPokemonService,
        {
          provide: getRepositoryToken(TeamPokemon),
          useValue: teamPokemonRepositoryMock,
        },
        {
          provide: getRepositoryToken(Team),
          useValue: teamRepositoryMock,
        },
        {
          provide: PokemonService,
          useValue: pokemonServiceMock,
        },
      ],
    }).compile();

    service = module.get<TeamPokemonService>(TeamPokemonService);

    jest.clearAllMocks();
  });

  it('deve estar definido', () => {
    expect(service).toBeDefined();
  });
});
