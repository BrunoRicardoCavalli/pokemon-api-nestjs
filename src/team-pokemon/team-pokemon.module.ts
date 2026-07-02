import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TeamPokemon } from './entities/team-pokemon.entity';
import { Team } from '../team/entities/team.entity';
import { TeamPokemonController } from './team-pokemon.controller';
import { TeamPokemonService } from './team-pokemon.service';
import { PokemonModule } from '../pokemon/pokemon.module';

@Module({
  imports: [TypeOrmModule.forFeature([TeamPokemon, Team]), PokemonModule],
  controllers: [TeamPokemonController],
  providers: [TeamPokemonService],
})
export class TeamPokemonModule {}
