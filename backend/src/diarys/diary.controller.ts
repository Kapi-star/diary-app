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
  Query,
} from '@nestjs/common';
import { CreateDiaryDTO, UpdateDiaryDTO } from './dto/diary.dto';
import { DiaryService } from './diary.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('Diary')
export class DiaryController {
  constructor(private readonly DiaryService: DiaryService) {}

  // タスク作成
  @UseGuards(AuthGuard)
  @Post('/create')
  async createDiary(@Request() req, @Body() dto: CreateDiaryDTO): Promise<any> {
    try {
      await this.DiaryService.createDiary(dto, req.user.sub);

      return {
        statusCode: HttpStatus.OK,
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

  // タスク一覧取得
  @UseGuards(AuthGuard)
  @Get('/getall')
  async fetchAllDiary(@Request() req): Promise<any> {
    try {
      const Diarys = await this.DiaryService.getAllDiarys(req.user.sub);
      return {
        statusCode: HttpStatus.OK,
        data: Diarys,
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

  // タスク詳細取得
  @UseGuards(AuthGuard)
  @Get('/getone')
  async fetchDiaryOne(@Request() req, @Query('diaryId') diaryId: string): Promise<any> {
    try {
      const Diarys = await this.DiaryService.getDiaryOne(diaryId, req.user.sub);

      if(Diarys == null) {
        throw new HttpException(
          {
            message: 'Diary not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      return {
        statusCode: HttpStatus.OK,
        data: Diarys,
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

  // タスク更新
  @UseGuards(AuthGuard)
  @Put('/update')
  async updateDiary(@Request() req, @Body() body: { dto: UpdateDiaryDTO; diaryId: string }): Promise<any> {
    try {
      const result = await this.DiaryService.updateDiary(req.user.sub, body.diaryId, body.dto);

      if (result.affected === 0) {
        throw new HttpException(
          {
            message: 'Diary not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      return {
        statusCode: HttpStatus.OK,
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

  // タスク削除
  @UseGuards(AuthGuard)
  @Delete('/delete')
  async deleteDiary(@Request() req, @Query('diaryId') diaryId: string): Promise<any> {
    try {
      const result = await this.DiaryService.deleteOne(req.user.sub, diaryId);

      if (result.affected === 0) {
        throw new HttpException(
          {
            message: 'Diary not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      return {
        statusCode: HttpStatus.OK,
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
