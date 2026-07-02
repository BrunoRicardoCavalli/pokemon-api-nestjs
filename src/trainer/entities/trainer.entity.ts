import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Team } from '../../team/entities/team.entity';

@Entity('trainers')
export class Trainer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  cityOrigin?: string;

  @OneToMany(() => Team, (team) => team.trainer)
  teams: Team[];
}
