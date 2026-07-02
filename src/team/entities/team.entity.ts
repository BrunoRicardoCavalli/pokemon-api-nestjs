import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Trainer } from '../../trainer/entities/trainer.entity';

@Entity('teams')
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  teamName: string;

  @ManyToOne(() => Trainer, { onDelete: 'CASCADE' })
  trainer: Trainer;
}
