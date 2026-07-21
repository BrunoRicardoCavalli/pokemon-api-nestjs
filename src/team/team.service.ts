import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTeamDto } from './dto/create-team.dto';
import { TeamResponseDto } from './dto/team-response.dto';
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

  async create(
    trainerId: number,
    createTeamDto: CreateTeamDto,
  ): Promise<TeamResponseDto> {
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

    const savedTeam = await this.teamRepository.save(team);

    return this.toResponseDto(savedTeam);
  }

  async findAllByTrainer(trainerId: number): Promise<TeamResponseDto[]> {
    const trainer = await this.trainerRepository.findOne({
      where: { id: trainerId },
    });

    if (!trainer) {
      throw new NotFoundException('Treinador não encontrado');
    }

    const teams = await this.teamRepository.find({
      where: {
        trainer: {
          id: trainerId,
        },
      },
      relations: {
        trainer: true,
      },
    });

    return teams.map((team) => this.toResponseDto(team));
  }

  async findOne(id: number): Promise<TeamResponseDto> {
    const team = await this.findEntityById(id);

    return this.toResponseDto(team);
  }

  async update(
    id: number,
    updateTeamDto: UpdateTeamDto,
  ): Promise<TeamResponseDto> {
    const team = await this.findEntityById(id);

    Object.assign(team, updateTeamDto);

    const updatedTeam = await this.teamRepository.save(team);

    return this.toResponseDto(updatedTeam);
  }

  async remove(id: number): Promise<{ message: string }> {
    const team = await this.findEntityById(id);

    await this.teamRepository.remove(team);

    return {
      message: 'Time removido com sucesso',
    };
  }

  private async findEntityById(id: number): Promise<Team> {
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

  private toResponseDto(team: Team): TeamResponseDto {
    return {
      id: team.id,
      teamName: team.teamName,
      trainerId: team.trainer.id,
    };
  }
}
