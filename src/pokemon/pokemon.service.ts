import { Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class PokemonService {
  constructor(private readonly httpService: HttpService) {}

  async findOne(nameOrId: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(
          `https://pokeapi.co/api/v2/pokemon/${nameOrId.toLowerCase()}`,
        ),
      );

      return {
        id: response.data.id,
        name: response.data.name,
        height: response.data.height,
        weight: response.data.weight,
        types: response.data.types.map((item) => item.type.name),
        abilities: response.data.abilities.map((item) => item.ability.name),
      };
    } catch {
      throw new NotFoundException('Pokémon não encontrado');
    }
  }
}
