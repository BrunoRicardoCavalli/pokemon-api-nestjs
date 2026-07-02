import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

import { CreateTeamPokemonDto } from './dto/create-team-pokemon.dto';
import { TeamPokemonService } from './team-pokemon.service';

@Controller('teams/:teamId/pokemons')
export class TeamPokemonController {
  constructor(private readonly teamPokemonService: TeamPokemonService) {}

  @Post()
  create(
    @Param('teamId') teamId: string,
    @Body() createTeamPokemonDto: CreateTeamPokemonDto,
  ) {
    return this.teamPokemonService.create(Number(teamId), createTeamPokemonDto);
  }

  @Get()
  findAll(@Param('teamId') teamId: string) {
    return this.teamPokemonService.findAll(Number(teamId));
  }

  @Delete(':pokemonTeamId')
  remove(@Param('pokemonTeamId') pokemonTeamId: string) {
    return this.teamPokemonService.remove(Number(pokemonTeamId));
  }
}
