import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiaryController } from './diary.controller';
import { DiaryEntity } from './entities/diary.entity';
import { DiaryService } from './diary.service';

@Module({
  imports: [TypeOrmModule.forFeature([DiaryEntity])],
  controllers: [DiaryController],
  providers: [DiaryService],
})
export class DiaryModule {}