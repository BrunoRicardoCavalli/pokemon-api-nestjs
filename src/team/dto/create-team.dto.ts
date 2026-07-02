import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateTeamDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  teamName: string;
}
