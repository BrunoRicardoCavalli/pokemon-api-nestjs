import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTeamPokemonDto {
  @IsString()
  @IsNotEmpty()
  pokemonIdentifier: string;
}
