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

import { TrainerService } from './trainer.service';
import { CreateTrainerDto } from './dto/create-trainer.dto';
import { UpdateTrainerDto } from './dto/update-trainer.dto';
import { TrainerResponseDto } from './dto/trainer-response.dto';

@ApiTags('Trainers')
@Controller('trainers')
export class TrainerController {
  constructor(private readonly trainerService: TrainerService) {}

  @Post()
  @ApiOperation({
    summary: 'Criar treinador',
    description: 'Cria um novo treinador no banco de dados.',
  })
  @ApiCreatedResponse({
    description: 'Treinador criado com sucesso.',
    type: TrainerResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Dados inválidos.',
  })
  create(@Body() createTrainerDto: CreateTrainerDto) {
    return this.trainerService.create(createTrainerDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar treinadores',
    description: 'Retorna todos os treinadores cadastrados.',
  })
  @ApiOkResponse({
    description: 'Lista de treinadores.',
    type: TrainerResponseDto,
    isArray: true,
  })
  findAll() {
    return this.trainerService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Buscar treinador por ID',
    description: 'Retorna um treinador específico.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID do treinador.',
    example: 1,
  })
  @ApiOkResponse({
    description: 'Treinador encontrado.',
    type: TrainerResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Treinador não encontrado.',
  })
  findOne(@Param('id') id: string) {
    return this.trainerService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Atualizar treinador',
    description: 'Atualiza os dados de um treinador.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID do treinador.',
    example: 1,
  })
  @ApiOkResponse({
    description: 'Treinador atualizado.',
    type: TrainerResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Treinador não encontrado.',
  })
  update(@Param('id') id: string, @Body() updateTrainerDto: UpdateTrainerDto) {
    return this.trainerService.update(+id, updateTrainerDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Remover treinador',
    description: 'Remove um treinador do banco de dados.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID do treinador.',
    example: 1,
  })
  @ApiOkResponse({
    description: 'Treinador removido com sucesso.',
  })
  @ApiNotFoundResponse({
    description: 'Treinador não encontrado.',
  })
  remove(@Param('id') id: string) {
    return this.trainerService.remove(+id);
  }
}
