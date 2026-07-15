import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTrainerDto } from './dto/create-trainer.dto';
import { TrainerResponseDto } from './dto/trainer-response.dto';
import { UpdateTrainerDto } from './dto/update-trainer.dto';
import { Trainer } from './entities/trainer.entity';

@Injectable()
export class TrainerService {
  constructor(
    @InjectRepository(Trainer)
    private readonly trainerRepository: Repository<Trainer>,
  ) {}

  async create(
    createTrainerDto: CreateTrainerDto,
  ): Promise<TrainerResponseDto> {
    const trainer = this.trainerRepository.create(createTrainerDto);
    const savedTrainer = await this.trainerRepository.save(trainer);

    return this.toResponseDto(savedTrainer);
  }

  async findAll(): Promise<TrainerResponseDto[]> {
    const trainers = await this.trainerRepository.find();

    return trainers.map((trainer) => this.toResponseDto(trainer));
  }

  async findOne(id: number): Promise<TrainerResponseDto> {
    const trainer = await this.findEntityById(id);

    return this.toResponseDto(trainer);
  }

  async update(
    id: number,
    updateTrainerDto: UpdateTrainerDto,
  ): Promise<TrainerResponseDto> {
    const trainer = await this.findEntityById(id);

    Object.assign(trainer, updateTrainerDto);

    const updatedTrainer = await this.trainerRepository.save(trainer);

    return this.toResponseDto(updatedTrainer);
  }

  async remove(id: number): Promise<{ message: string }> {
    const trainer = await this.findEntityById(id);

    await this.trainerRepository.remove(trainer);

    return {
      message: 'Treinador removido com sucesso',
    };
  }

  private async findEntityById(id: number): Promise<Trainer> {
    const trainer = await this.trainerRepository.findOne({
      where: { id },
    });

    if (!trainer) {
      throw new NotFoundException('Treinador não encontrado');
    }

    return trainer;
  }

  private toResponseDto(trainer: Trainer): TrainerResponseDto {
    return {
      id: trainer.id,
      name: trainer.name,
      cityOrigin: trainer.cityOrigin,
    };
  }
}
