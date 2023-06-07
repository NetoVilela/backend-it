import {
  Controller,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/v1/movies')
export class MoviesController {
  // eslint-disable-next-line prettier/prettier
  constructor(private readonly moviesService: MoviesService) { console.log("a") }
  
  // @UseGuards(AuthGuard('jwt'))
  @Get('importMovies')
  async importmovies() {
    return await this.moviesService.importmovies();
  }

  // @UseGuards(AuthGuard('jwt'))
  @Get()
  async index() {
    return await this.moviesService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async show(@Param('id') id: number) {
    return await this.moviesService.findById(id);
  }

  
}
