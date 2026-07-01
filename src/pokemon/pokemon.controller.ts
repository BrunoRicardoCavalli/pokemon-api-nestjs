import { Controller, Get, Param, Query } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { get } from 'node_modules/axios/index.cjs';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get()
  findAll(@Query('limit') limit = '10', @Query('offset') offset = '0') {
    return this.pokemonService.findAll(Number(limit), Number(offset));
  }

  @Get('type/:type')
  findByType(@Param('type') type: string) {
    return this.pokemonService.findByType(type);
  }

  @Get('random')
  findRandom() {
    return this.pokemonService.findRandom();
  }

  @Get(':nameOrId')
  findOne(@Param('nameOrId') nameOrId: string) {
    return this.pokemonService.findOne(nameOrId);
  }
}
