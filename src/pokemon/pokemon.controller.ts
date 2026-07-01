import { Controller, Get, Param } from '@nestjs/common';
import { PokemonService } from './pokemon.service';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get(':nameOrId')
  findOne(@Param('nameOrId') nameOrId: string) {
    return this.pokemonService.findOne(nameOrId);
  }
}
