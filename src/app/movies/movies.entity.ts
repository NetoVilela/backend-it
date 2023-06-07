import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'movies' })
export class MoviesEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  poster_link: string;

  @Column()
  series_title: boolean;

  @Column()
  relesased_year: number;

  @Column()
  certificate: string;

  @Column()
  runtime: string;

  @Column()
  genre: string;

  @Column('decimal', { scale: 2, nullable: true })
  imdb_raiting: number;

  @Column()
  overview: string;

  @Column()
  meta_score: number;

  @Column()
  director: string;

  @Column()
  star1: string;

  @Column()
  star2: string;

  @Column()
  star3: string;

  @Column()
  star4: string;

  @Column()
  no_of_votes: number;

  @Column()
  gross: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @CreateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @BeforeInsert()
  setDate() {
    const now = new Date();
    const recifeOffset = -3 * 60 * 60 * 1000; // Recife UTC-3 offset em milissegundos
    this.createdAt = new Date(now.getTime() + recifeOffset);
    this.updatedAt = this.createdAt;
  }
}
