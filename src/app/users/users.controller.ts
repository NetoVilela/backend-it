import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('api/v1/users')
export class UsersController {
  // eslint-disable-next-line prettier/prettier
  constructor(private readonly usersService: UsersService) { }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async index() {
    return await this.usersService.findAll();
  }

  @Post('add')
  async add(@Body() body: CreateUserDto) {
    return await this.usersService.create(body);
  }

  @Post('uploadAvatar/:user_id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public/attachments/users',
        filename: (_req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, file.fieldname + '-' + uniqueSuffix);
        },
      }),
    }),
  )
  async uploadFile(
    @Param('user_id') user_id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    await this.usersService.updateAvatar(user_id, file.filename);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async show(@Param('id') id: number) {
    return await this.usersService.findById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(@Param('id') id: number, @Body() body: UpdateUserDto) {
    return await this.usersService.update(id, body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.usersService.destroy(id);
  }
}
