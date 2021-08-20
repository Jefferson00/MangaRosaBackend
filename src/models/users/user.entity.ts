import { Expose } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import Knowledges from '../knowledges/knowledges.entity';

@Entity('users')
class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  cpf: string;

  @Column()
  phone: string;

  @Column()
  is_validated: boolean;

  @ManyToMany(() => Knowledges)
  @JoinTable()
  knowledges: Knowledges[];

  @Expose()
  getKnowledges(): Knowledges[] {
    return this.knowledges;
  }

  @Column()
  validated_at: Date | null;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default User;
