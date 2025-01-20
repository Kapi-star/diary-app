import {
  Body,
  Controller,
  Post,
  Get,
  HttpException,
  HttpStatus,
  Delete,
  UseGuards,
  Request,
  Put,
} from '@nestjs/common';
import { CreateUserDTO, LoginUserDTO, UpdateUserDTO } from './dto/user.dto';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  // ユーザー情報閲覧
  @UseGuards(AuthGuard)
  @Get('/profile')
  getProfile(@Request() req) {
    return { userName: req.user.name, email: req.user.email};
  }

  // ユーザー作成
  @Post('/create')
  async createUser(@Body() dto: CreateUserDTO): Promise<any> {
    try {
      await this.UserService.createUser(dto);

      return {
        message: `成功`,
        statusCode: HttpStatus.CREATED
      };
    } catch (err) {
      throw new HttpException(
        {
          message: 'サーバーエラー: ' + err.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // ユーザー情報更新
  @UseGuards(AuthGuard)
  @Put('/update')
  async updateUser(@Request() req, @Body() dto: UpdateUserDTO): Promise<any> {
    try {
      await this.UserService.updateUser(req.user.sub, dto);

      return {
        message: "成功",
        statusCode: HttpStatus.OK
      };
    } catch (err) {

      throw new HttpException(
        {
          message: 'サーバーエラー: ' + err.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // ユーザー削除
  @UseGuards(AuthGuard)
  @Delete('/delete')
  async deleteUser(@Request() req): Promise<any> {
    try {
      const result = await this.UserService.deleteOne(req.user.sub);

      if (result.affected === 0) {
        throw new HttpException(
          {
            message: 'ユーザーが見つかりません',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      return {
        message: "成功",
        statusCode: HttpStatus.OK
      };
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
