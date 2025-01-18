import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { UserService } from '../users/user.service';
import { LoginUserDTO, LoginUserResponseDTO } from 'src/users/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
) {}

async signIn(dto: LoginUserDTO): Promise<{ token: string; user: LoginUserResponseDTO }> {
    const user = await this.usersService.findOne(dto.email);

    const isPasswordValid = await bcrypt.compare(dto.password, user.password)
    if (!isPasswordValid) {
      throw new HttpException(
        {
          message: 'パスワードが間違っています'
        },
        HttpStatus.UNAUTHORIZED,
      );
      }
  
    const payload = {
        sub: user.id,
        name: user.username,
        email: user.email,
    };
    const token = await this.jwtService.signAsync(payload);
  
    return {
      token,
      user: {
        username: user.username,
        useremail: user.email,
      },
    };
  }
  
}
