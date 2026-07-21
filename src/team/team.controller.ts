import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { CreateTeamDto } from './dto/create-team.dto';
import { TeamResponseDto } from './dto/team-response.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { TeamService } from './team.service';

@ApiTags('Teams')
@Controller()
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post('trainers/:trainerId/teams')
  @ApiOperation({
    summary: 'Criar time para um treinador',
    description:
      'Cria um novo time associado ao treinador informado no parâmetro trainerId.',
  })
  @ApiParam({
    name: 'trainerId',
    description: 'Identificador do treinador responsável pelo time.',
    example: 1,
  })
  @ApiCreatedResponse({
    description: 'Time criado com sucesso.',
    type: TeamResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Dados enviados são inválidos.',
  })
  @ApiNotFoundResponse({
    description: 'Treinador não encontrado.',
  })
  create(
    @Param('trainerId') trainerId: string,
    @Body() createTeamDto: CreateTeamDto,
  ) {
    return this.teamService.create(Number(trainerId), createTeamDto);
  }

  @Get('trainers/:trainerId/teams')
  @ApiOperation({
    summary: 'Listar times de um treinador',
    description: 'Retorna todos os times associados ao treinador informado.',
  })
  @ApiParam({
    name: 'trainerId',
    description: 'Identificador do treinador.',
    example: 1,
  })
  @ApiOkResponse({
    description: 'Lista de times do treinador.',
    type: TeamResponseDto,
    isArray: true,
  })
  @ApiNotFoundResponse({
    description: 'Treinador não encontrado.',
  })
  findAllByTrainer(@Param('trainerId') trainerId: string) {
    return this.teamService.findAllByTrainer(Number(trainerId));
  }

  @Get('teams/:id')
  @ApiOperation({
    summary: 'Buscar time por ID',
    description: 'Retorna os dados públicos de um time específico.',
  })
  @ApiParam({
    name: 'id',
    description: 'Identificador do time.',
    example: 1,
  })
  @ApiOkResponse({
    description: 'Time encontrado.',
    type: TeamResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Time não encontrado.',
  })
  findOne(@Param('id') id: string) {
    return this.teamService.findOne(Number(id));
  }

  @Patch('teams/:id')
  @ApiOperation({
    summary: 'Atualizar time',
    description: 'Atualiza o nome de um time existente.',
  })
  @ApiParam({
    name: 'id',
    description: 'Identificador do time.',
    example: 1,
  })
  @ApiOkResponse({
    description: 'Time atualizado com sucesso.',
    type: TeamResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Dados enviados são inválidos.',
  })
  @ApiNotFoundResponse({
    description: 'Time não encontrado.',
  })
  update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
    return this.teamService.update(Number(id), updateTeamDto);
  }

  @Delete('teams/:id')
  @ApiOperation({
    summary: 'Remover time',
    description:
      'Remove o time e os registros de Pokémon associados por exclusão em cascata.',
  })
  @ApiParam({
    name: 'id',
    description: 'Identificador do time.',
    example: 1,
  })
  @ApiOkResponse({
    description: 'Time removido com sucesso.',
    schema: {
      example: {
        message: 'Time removido com sucesso',
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Time não encontrado.',
  })
  remove(@Param('id') id: string) {
    return this.teamService.remove(Number(id));
  }
}
