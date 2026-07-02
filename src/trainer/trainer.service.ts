import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTrainerDto } from './dto/create-trainer.dto';
import { UpdateTrainerDto } from './dto/update-trainer.dto';
import { Trainer } from './entities/trainer.entity';

@Injectable()
export class TrainerService {
  constructor(
    @InjectRepository(Trainer)
    private readonly trainerRepository: Repository<Trainer>,
  ) {}

  create(createTrainerDto: CreateTrainerDto) {
    const trainer = this.trainerRepository.create(createTrainerDto);
    return this.trainerRepository.save(trainer);
  }

  findAll() {
    return this.trainerRepository.find();
  }

  async findOne(id: number) {
    const trainer = await this.trainerRepository.findOne({
      where: { id },
    });

    if (!trainer) {
      throw new NotFoundException('Treinador não encontrado');
    }

    return trainer;
  }

  async update(id: number, updateTrainerDto: UpdateTrainerDto) {
    const trainer = await this.findOne(id);

    Object.assign(trainer, updateTrainerDto);

    return this.trainerRepository.save(trainer);
  }

  async remove(id: number) {
    const trainer = await this.findOne(id);

    await this.trainerRepository.remove(trainer);

    return {
      message: 'Treinador removido com sucesso',
    };
  }
}
