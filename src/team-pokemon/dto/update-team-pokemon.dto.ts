import { PartialType } from '@nestjs/swagger';
import { CreateTeamPokemonDto } from './create-team-pokemon.dto';

export class UpdateTeamPokemonDto extends PartialType(CreateTeamPokemonDto) {}
