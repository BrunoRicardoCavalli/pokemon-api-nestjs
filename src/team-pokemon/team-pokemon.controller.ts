import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { CreateTeamPokemonDto } from './dto/create-team-pokemon.dto';
import { TeamPokemonService } from './team-pokemon.service';

@ApiTags('Team Pokémon')
@Controller('teams/:teamId/pokemons')
export class TeamPokemonController {
  constructor(private readonly teamPokemonService: TeamPokemonService) {}

  @Post()
  @ApiOperation({
    summary: 'Adicionar Pokémon ao time',
    description:
      'Valida o Pokémon na PokéAPI e adiciona sua referência ao time informado.',
  })
  @ApiParam({
    name: 'teamId',
    description: 'Identificador do time.',
    example: 1,
  })
  @ApiCreatedResponse({
    description: 'Pokémon adicionado ao time com sucesso.',
    schema: {
      example: {
        id: 1,
        pokemonIdentifier: 'pikachu',
        teamId: 1,
      },
    },
  })
  @ApiBadRequestResponse({
    description:
      'Time já possui seis Pokémon, Pokémon duplicado ou dados inválidos.',
    schema: {
      examples: {
        duplicatePokemon: {
          summary: 'Pokémon duplicado',
          value: {
            statusCode: 400,
            message: 'Este Pokémon já pertence ao time',
            error: 'Bad Request',
          },
        },
        teamLimitReached: {
          summary: 'Limite do time atingido',
          value: {
            statusCode: 400,
            message: 'Um time pode ter no máximo 6 Pokémon',
            error: 'Bad Request',
          },
        },
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Time ou Pokémon não encontrado.',
  })
  create(
    @Param('teamId') teamId: string,
    @Body() createTeamPokemonDto: CreateTeamPokemonDto,
  ) {
    return this.teamPokemonService.create(Number(teamId), createTeamPokemonDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar Pokémon de um time',
    description:
      'Retorna os Pokémon associados ao time com dados enriquecidos pela PokéAPI.',
  })
  @ApiParam({
    name: 'teamId',
    description: 'Identificador do time.',
    example: 1,
  })
  @ApiOkResponse({
    description: 'Lista de Pokémon do time.',
    schema: {
      example: [
        {
          id: 25,
          name: 'pikachu',
          height: 4,
          weight: 60,
          sprite:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
          types: ['electric'],
          abilities: ['static', 'lightning-rod'],
        },
      ],
    },
  })
  @ApiNotFoundResponse({
    description: 'Time não encontrado.',
  })
  findAll(@Param('teamId') teamId: string) {
    return this.teamPokemonService.findAll(Number(teamId));
  }

  @Delete(':pokemonTeamId')
  @ApiOperation({
    summary: 'Remover Pokémon do time',
    description:
      'Remove a referência do Pokémon associado ao time, sem alterar os dados da PokéAPI.',
  })
  @ApiParam({
    name: 'teamId',
    description: 'Identificador do time.',
    example: 1,
  })
  @ApiParam({
    name: 'pokemonTeamId',
    description: 'Identificador interno da associação entre time e Pokémon.',
    example: 1,
  })
  @ApiOkResponse({
    description: 'Pokémon removido do time com sucesso.',
    schema: {
      example: {
        message: 'Pokémon removido do time com sucesso',
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Pokémon não encontrado no time.',
  })
  remove(@Param('pokemonTeamId') pokemonTeamId: string) {
    return this.teamPokemonService.remove(Number(pokemonTeamId));
  }
}
