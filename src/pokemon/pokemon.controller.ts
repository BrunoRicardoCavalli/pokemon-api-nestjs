import { Controller, Get, Param, Query } from '@nestjs/common';
import { PokemonService } from './pokemon.service';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get()
  findAll(@Query('limit') limit = '10', @Query('offset') offset = '0') {
    return this.pokemonService.findAll(Number(limit), Number(offset));
  }

  @Get(':nameOrId')
  findOne(@Param('nameOrId') nameOrId: string) {
    return this.pokemonService.findOne(nameOrId);
  }
}
