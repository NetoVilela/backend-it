import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersEntity } from './users.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

// Dtos
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
  ) {}

  async findAll() {
    return await this.usersRepository.find({
      select: [
        'id',
        'status',
        'createdAt',
        'updatedAt',
        'name',
        'email',
        'profile',
        'dateBirth',
        'cpf',
        'avatarSrc',
      ],
    });
  }

  async findById(id: number) {
    return await this.usersRepository.findOneBy({ id });
  }

  async findByEmail(email: string) {
    return await this.usersRepository.findOneBy({ email });
  }

  async findByCpf(cpf: string) {
    return await this.usersRepository.findOneBy({ cpf });
  }

  async create(data: CreateUserDto) {
    const verifyUserEmail = await this.findByEmail(data.email);
    const verifyUserCpf = await this.findByCpf(data.cpf);

    if (verifyUserEmail)
      throw new BadRequestException(
        'Já existe usuário com esse email cadastrado.',
      );

    if (verifyUserCpf)
      throw new BadRequestException(
        'Já existe usuário com esse cpf cadastrado.',
      );

    const user = this.usersRepository.create(data);
    return await this.usersRepository.save(user);
  }

  async update(id: number, data: UpdateUserDto) {
    const user = await this.usersRepository.findOne({
      where: { id },
    });
    this.usersRepository.merge(user, data);
    return await this.usersRepository.save(user);
  }

  async destroy(id: number) {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new BadRequestException('Usuário não encontrado.');
    }

    this.usersRepository.delete({ id });
  }

  async updateAvatar(id: number, avatarSrc: string) {
    return await this.usersRepository.update(id, { avatarSrc });
  }
}
