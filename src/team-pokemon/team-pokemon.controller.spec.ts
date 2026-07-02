import { Test, TestingModule } from '@nestjs/testing';
import { TeamPokemonController } from './team-pokemon.controller';
import { TeamPokemonService } from './team-pokemon.service';

describe('TeamPokemonController', () => {
  let controller: TeamPokemonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeamPokemonController],
      providers: [TeamPokemonService],
    }).compile();

    controller = module.get<TeamPokemonController>(TeamPokemonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
