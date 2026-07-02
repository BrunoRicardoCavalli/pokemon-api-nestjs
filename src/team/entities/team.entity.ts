import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Trainer } from '../../trainer/entities/trainer.entity';
import { TeamPokemon } from '../../team-pokemon/entities/team-pokemon.entity';

@Entity('teams')
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  teamName: string;

  @ManyToOne(() => Trainer, { onDelete: 'CASCADE' })
  trainer: Trainer;

  @OneToMany(() => TeamPokemon, (teamPokemon) => teamPokemon.team)
  pokemons: TeamPokemon[];
}
