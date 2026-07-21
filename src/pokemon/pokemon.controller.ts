import { Controller, Get, Param, Query } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { PokemonService } from './pokemon.service';

@ApiTags('Pokemon')
@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get()
  @ApiOperation({
    summary: 'Listar Pokémon',
    description: 'Retorna uma lista paginada de Pokémon da PokéAPI.',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    example: 10,
    description: 'Quantidade de registros.',
  })
  @ApiQuery({
    name: 'offset',
    required: false,
    example: 0,
    description: 'Posição inicial da paginação.',
  })
  @ApiOkResponse({
    description: 'Lista retornada com sucesso.',
  })
  findAll(@Query('limit') limit = '10', @Query('offset') offset = '0') {
    return this.pokemonService.findAll(Number(limit), Number(offset));
  }

  @Get('type/:type')
  @ApiOperation({
    summary: 'Buscar Pokémon por tipo',
    description: 'Retorna todos os Pokémon pertencentes ao tipo informado.',
  })
  @ApiParam({
    name: 'type',
    example: 'electric',
  })
  @ApiOkResponse({
    description: 'Pokémon encontrados.',
  })
  findByType(@Param('type') type: string) {
    return this.pokemonService.findByType(type);
  }

  @Get('random')
  @ApiOperation({
    summary: 'Buscar Pokémon aleatório',
    description: 'Retorna um Pokémon aleatório.',
  })
  @ApiOkResponse({
    description: 'Pokémon retornado com sucesso.',
  })
  findRandom() {
    return this.pokemonService.findRandom();
  }

  @Get(':nameOrId')
  @ApiOperation({
    summary: 'Buscar Pokémon por nome ou ID',
    description: 'Retorna os detalhes de um Pokémon específico.',
  })
  @ApiParam({
    name: 'nameOrId',
    example: 'pikachu',
  })
  @ApiOkResponse({
    description: 'Pokémon encontrado.',
  })
  findOne(@Param('nameOrId') nameOrId: string) {
    return this.pokemonService.findOne(nameOrId);
  }
}
