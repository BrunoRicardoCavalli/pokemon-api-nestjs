import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Team } from './entities/team.entity';
import { Trainer } from '../trainer/entities/trainer.entity';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,

    @InjectRepository(Trainer)
    private readonly trainerRepository: Repository<Trainer>,
  ) {}

  async create(trainerId: number, createTeamDto: CreateTeamDto) {
    const trainer = await this.trainerRepository.findOne({
      where: { id: trainerId },
    });

    if (!trainer) {
      throw new NotFoundException('Treinador não encontrado');
    }

    const team = this.teamRepository.create({
      ...createTeamDto,
      trainer,
    });

    return this.teamRepository.save(team);
  }

  findAllByTrainer(trainerId: number) {
    return this.teamRepository.find({
      where: {
        trainer: {
          id: trainerId,
        },
      },
      relations: {
        trainer: true,
      },
    });
  }

  async findOne(id: number) {
    const team = await this.teamRepository.findOne({
      where: { id },
      relations: {
        trainer: true,
      },
    });

    if (!team) {
      throw new NotFoundException('Time não encontrado');
    }

    return team;
  }

  async update(id: number, updateTeamDto: UpdateTeamDto) {
    const team = await this.findOne(id);

    Object.assign(team, updateTeamDto);

    return this.teamRepository.save(team);
  }

  async remove(id: number) {
    const team = await this.findOne(id);

    await this.teamRepository.remove(team);

    return {
      message: 'Time removido com sucesso',
    };
  }
}
