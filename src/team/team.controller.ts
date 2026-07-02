import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { TeamService } from './team.service';

@Controller()
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post('trainers/:trainerId/teams')
  create(
    @Param('trainerId') trainerId: string,
    @Body() createTeamDto: CreateTeamDto,
  ) {
    return this.teamService.create(Number(trainerId), createTeamDto);
  }

  @Get('trainers/:trainerId/teams')
  findAllByTrainer(@Param('trainerId') trainerId: string) {
    return this.teamService.findAllByTrainer(Number(trainerId));
  }

  @Get('teams/:id')
  findOne(@Param('id') id: string) {
    return this.teamService.findOne(Number(id));
  }

  @Patch('teams/:id')
  update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
    return this.teamService.update(Number(id), updateTeamDto);
  }

  @Delete('teams/:id')
  remove(@Param('id') id: string) {
    return this.teamService.remove(Number(id));
  }
}
