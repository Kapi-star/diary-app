import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from "dotenv";

import { AuthService } from './auth.service';
import { AuthController } from './auth.contoroller';
import { UserModule } from 'src/users/user.module';

dotenv.config();

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWTCONSTANSSECRET,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
