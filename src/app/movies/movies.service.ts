/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { MoviesEntity } from './movies.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as path from 'path';
import * as fs from 'fs';
import * as csvParser from 'csv-parser';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(MoviesEntity)
    private readonly moviesRepository: Repository<MoviesEntity>,
  ) { }

  async findAll() {
    return await this.moviesRepository.find();
  }

  async findById(id: number) {
    return await this.moviesRepository.findOneBy({ id });
  }

  async readCSV(filePath: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const results = [];

      fs.createReadStream(filePath)
        .pipe(csvParser())
        .on('data', (data) => results.push(data))
        .on('end', () => resolve(results))
        .on('error', (error) => reject(error));
    });
  }

  async importmovies() {
    const filePath = path.join(
      `${__dirname}/../../../public/files`,
      'imdb_top_1000.csv',
    );

    let movies = [];
    movies = await this.readCSV(filePath);

    for (const data of movies) {
      const objMovie = {
        poster_link: data.poster_link,
        series_title: data.series_title,
        released_year: /^\d+$/.test(data.released_year) ? parseInt(data.released_year) : 0,
        certificate: data.certificate,
        runtime: data.runtime,
        genre: data.genre,
        imdb_raiting: parseFloat(data.imdb_raiting),
        overview: data.overview,
        meta_score: data.meta_score ? parseFloat(data.meta_score) : 0,
        director: data.director,
        star1: data.star1,
        star2: data.star2,
        star3: data.star3,
        star4: data.star4,
        no_of_votes: parseFloat(data.no_of_votes),
        gross: data.gross,
      };
      const movie = this.moviesRepository.create(objMovie);
      await this.moviesRepository.save(movie);
    }

    return `${movies.length} registers importeds.`;
  }
}
