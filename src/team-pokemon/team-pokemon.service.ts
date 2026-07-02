import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TeamPokemon } from './entities/team-pokemon.entity';
import { Team } from '../team/entities/team.entity';
import { CreateTeamPokemonDto } from './dto/create-team-pokemon.dto';
import { PokemonService } from '../pokemon/pokemon.service';

@Injectable()
export class TeamPokemonService {
  constructor(
    @InjectRepository(TeamPokemon)
    private readonly teamPokemonRepository: Repository<TeamPokemon>,

    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,

    private readonly pokemonService: PokemonService,
  ) {}

  async create(teamId: number, dto: CreateTeamPokemonDto) {
    const team = await this.teamRepository.findOne({
      where: { id: teamId },
      relations: {
        pokemons: true,
      },
    });

    if (!team) {
      throw new NotFoundException('Time não encontrado');
    }

    if (team.pokemons.length >= 6) {
      throw new BadRequestException('Um time pode ter no máximo 6 Pokémon');
    }

    // Valida se existe na PokéAPI
    await this.pokemonService.findOne(dto.pokemonIdentifier);

    const teamPokemon = this.teamPokemonRepository.create({
      pokemonIdentifier: dto.pokemonIdentifier,
      team,
    });

    return this.teamPokemonRepository.save(teamPokemon);
  }

  async findAll(teamId: number) {
    const team = await this.teamRepository.findOne({
      where: { id: teamId },
      relations: {
        pokemons: true,
      },
    });

    if (!team) {
      throw new NotFoundException('Time não encontrado');
    }

    const result = [];

    for (const pokemon of team.pokemons) {
      const details = await this.pokemonService.findOne(
        pokemon.pokemonIdentifier,
      );

      result.push(details);
    }

    return result;
  }

  async remove(id: number) {
    const pokemon = await this.teamPokemonRepository.findOne({
      where: { id },
    });

    if (!pokemon) {
      throw new NotFoundException('Pokémon não encontrado no time');
    }

    await this.teamPokemonRepository.remove(pokemon);

    return {
      message: 'Pokémon removido do time com sucesso',
    };
  }
}
