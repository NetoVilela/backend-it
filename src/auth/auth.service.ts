import { Injectable } from '@nestjs/common';
import { UsersEntity } from 'src/app/users/users.entity';
import { UsersService } from 'src/app/users/users.service';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  // eslint-disable-next-line prettier/prettier
  constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) { }

  async login(user) {
    const payload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      profile: user.profile,
      avatar: `attachments/users/${user.avatarSrc}`,
      gender: user.gender,
    };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, password: string) {
    let user: UsersEntity;

    try {
      user = await this.usersService.findByEmail(email);

      if (!user) return null;
    } catch (error) {
      return null;
    }

    const isPasswordValid = compareSync(password, user.password);
    if (!isPasswordValid) return null;

    return user;
  }

  async verifyJwt(token: string) {
    try {
      const tokenValidated = jwt.verify(token, process.env.JWT_SECRET_KEY);
      return { validate: true, payload: tokenValidated };
    } catch (e) {
      return { validate: false, erro: e.message };
    }
  }
}
