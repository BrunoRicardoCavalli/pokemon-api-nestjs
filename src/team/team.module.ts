import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Team } from './entities/team.entity';
import { Trainer } from '../trainer/entities/trainer.entity';
import { TeamController } from './team.controller';
import { TeamService } from './team.service';

@Module({
  imports: [TypeOrmModule.forFeature([Team, Trainer])],
  controllers: [TeamController],
  providers: [TeamService],
})
export class TeamModule {}
