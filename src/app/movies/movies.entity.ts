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

  @Column({ nullable: true })
  poster_link: string;

  @Column({ nullable: true })
  series_title: string;

  @Column({ nullable: true })
  released_year: number;

  @Column({ nullable: true })
  certificate: string;

  @Column({ nullable: true })
  runtime: string;

  @Column({ nullable: true })
  genre: string;

  @Column('decimal', { scale: 2, nullable: true })
  imdb_raiting: number;

  @Column({ nullable: true })
  overview: string;

  @Column({ nullable: true })
  meta_score: number;

  @Column({ nullable: true })
  director: string;

  @Column({ nullable: true })
  star1: string;

  @Column({ nullable: true })
  star2: string;

  @Column({ nullable: true })
  star3: string;

  @Column({ nullable: true })
  star4: string;

  @Column({ nullable: true })
  no_of_votes: number;

  @Column({ nullable: true })
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
