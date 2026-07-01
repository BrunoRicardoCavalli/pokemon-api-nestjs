import { Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class PokemonService {
  constructor(private readonly httpService: HttpService) {}

  async findAll(limit: number, offset: number) {
    const response = await firstValueFrom(
      this.httpService.get('https://pokeapi.co/api/v2/pokemon', {
        params: {
          limit,
          offset,
        },
      }),
    );

    return {
      count: response.data.count,
      limit,
      offset,
      results: response.data.results,
    };
  }

  async findByType(type: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(
          `https://pokeapi.co/api/v2/type/${type.toLowerCase()}`,
        ),
      );

      return {
        type: response.data.name,
        total: response.data.pokemon.length,
        pokemons: response.data.pokemon.map((item) => ({
          name: item.pokemon.name,
          url: item.pokemon.url,
        })),
      };
    } catch {
      throw new NotFoundException('Tipo de Pokémon não encontrado');
    }
  }

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
