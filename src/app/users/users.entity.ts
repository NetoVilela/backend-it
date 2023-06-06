import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { hashSync } from 'bcrypt';
import { IsDate } from 'class-validator';

@Entity({ name: 'users' })
export class UsersEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  name: string;

  @Column()
  status: boolean;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  cpf: string;

  @Column({ name: 'date_birth', type: 'date' })
  @IsDate()
  dateBirth: Date;

  @Column()
  profile: number;

  @Column()
  gender: string;

  @Column({ name: 'avatar_src', nullable: true })
  avatarSrc: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @CreateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @BeforeInsert()
  hashPassword() {
    this.password = hashSync(this.password, 10);
  }

  @BeforeInsert()
  setDate() {
    const now = new Date();
    const recifeOffset = -3 * 60 * 60 * 1000; // Recife UTC-3 offset em milissegundos
    this.createdAt = new Date(now.getTime() + recifeOffset);
    this.updatedAt = this.createdAt;
  }
}
