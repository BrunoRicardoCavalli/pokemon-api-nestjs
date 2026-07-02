import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Team } from '../../team/entities/team.entity';

@Entity('team_pokemons')
export class TeamPokemon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  pokemonIdentifier: string;

  @ManyToOne(() => Team, { onDelete: 'CASCADE' })
  team: Team;
}
