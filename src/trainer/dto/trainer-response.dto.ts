import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TrainerResponseDto {
  @ApiProperty({
    example: 1,
    description: 'Identidicador único do treinador',
  })
  id: number;

  @ApiProperty({
    example: 'Ash Ketchum',
    description: 'Nome do treinador',
  })
  name: string;

  @ApiPropertyOptional({
    example: 'Pallet',
    description: 'Cidade de origem do treinador',
  })
  cityOrigin?: string;
}
