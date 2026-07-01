import { Injectable } from '@nestjs/common';

@Injectable()
export class PokemonService {
  findAll() {
    return {
      message: 'Lista de Pokémons funcionando!',
    };
  }
}
