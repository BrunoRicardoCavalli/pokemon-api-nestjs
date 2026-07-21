import { Test, TestingModule } from '@nestjs/testing';
import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';

describe('PokemonController', () => {
  let controller: PokemonController;
  let service: jest.Mocked<PokemonService>;

  const pokemonServiceMock = {
    findAll: jest.fn(),
    findByType: jest.fn(),
    findRandom: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PokemonController],
      providers: [
        {
          provide: PokemonService,
          useValue: pokemonServiceMock,
        },
      ],
    }).compile();

    controller = module.get<PokemonController>(PokemonController);
    service = module.get(PokemonService);

    jest.clearAllMocks();
  });

  it('deve estar definido', () => {
    expect(controller).toBeDefined();
  });

  it('deve listar Pokémon com limite e deslocamento', async () => {
    const result = {
      count: 2,
      results: [{ name: 'bulbasaur' }, { name: 'ivysaur' }],
    };

    service.findAll.mockResolvedValue(result as never);

    await expect(controller.findAll('2', '0')).resolves.toEqual(result);
    expect(service.findAll).toHaveBeenCalledWith(2, 0);
  });

  it('deve buscar Pokémon por tipo', async () => {
    const result = [{ name: 'pikachu' }];

    service.findByType.mockResolvedValue(result as never);

    await expect(controller.findByType('electric')).resolves.toEqual(result);
    expect(service.findByType).toHaveBeenCalledWith('electric');
  });

  it('deve retornar um Pokémon aleatório', async () => {
    const result = {
      id: 25,
      name: 'pikachu',
    };

    service.findRandom.mockResolvedValue(result as never);

    await expect(controller.findRandom()).resolves.toEqual(result);
    expect(service.findRandom).toHaveBeenCalledTimes(1);
  });

  it('deve buscar um Pokémon pelo nome ou ID', async () => {
    const result = {
      id: 25,
      name: 'pikachu',
    };

    service.findOne.mockResolvedValue(result as never);

    await expect(controller.findOne('pikachu')).resolves.toEqual(result);
    expect(service.findOne).toHaveBeenCalledWith('pikachu');
  });
});
