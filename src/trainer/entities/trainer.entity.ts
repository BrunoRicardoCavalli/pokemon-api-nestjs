import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('trainers')
export class Trainer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  cityOrigin?: string;
}
