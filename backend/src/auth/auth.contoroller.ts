import { Body, Controller, Post, HttpCode, HttpStatus, UseGuards, Get, Request, HttpException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDTO } from 'src/users/dto/user.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: LoginUserDTO) {
    try {
      return this.authService.signIn(signInDto);
    } catch (err) {
      throw new HttpException(
        {
          message: 'サーバーエラー: ' + err.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}