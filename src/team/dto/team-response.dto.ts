import { ApiProperty } from '@nestjs/swagger';

export class TeamResponseDto {
  @ApiProperty({
    example: 1,
    description: 'Identificador único do time',
  })
  id: number;

  @ApiProperty({
    example: 'Water Team',
    description: 'Nome do time',
  })
  teamName: string;

  @ApiProperty({
    example: 3,
    description: 'Identificador do treinador responsável pelo time',
  })
  trainerId: number;
}
