import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateTrainerDto {
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  cityOrigin?: string;
}
