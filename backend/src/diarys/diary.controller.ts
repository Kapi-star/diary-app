import {
  Body,
  Controller,
  Post,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { CreateDiaryDTO, UpdateDiaryDTO } from './dto/diary.dto';
import { DiaryService } from './diary.service';

@Controller('Diary')
export class DiaryController {
  constructor(private readonly DiaryService: DiaryService) {}

  // タスク作成
  @Post('create')
  async createDiary(@Body() dto: CreateDiaryDTO): Promise<any> {
    try {
      await this.DiaryService.createDiary(dto);

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
  @Get()
  async fetchAllDiary(): Promise<any> {
    try {
      const Diarys = await this.DiaryService.getAllDiarys();
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
  @Get(':id')
  async fetchDiaryOne(@Param('id') id: string): Promise<any> {
    try {
      const Diarys = await this.DiaryService.getDiaryOne(id);

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
  @Patch(':id/update')
  async updateDiary(@Param('id') id: string, @Body() dto: UpdateDiaryDTO): Promise<any> {
    try {
      const result = await this.DiaryService.updateDiary(id, dto);

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
  @Delete(':id/delete')
  async deleteDiary(@Param('id') id: string): Promise<any> {
    try {
      const result = await this.DiaryService.deleteOne(id);

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
