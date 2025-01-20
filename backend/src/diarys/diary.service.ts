import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { DiaryEntity } from './entities/diary.entity';
import { CreateDiaryDTO, UpdateDiaryDTO } from './dto/diary.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class DiaryService {
  constructor(
    @InjectRepository(DiaryEntity)
    private readonly diaryRepository: Repository<DiaryEntity>,
  ) {}

  async createDiary(
    dto: CreateDiaryDTO,
    userId: string,
  ): Promise<DiaryEntity> {
      const Diary = this.diaryRepository.create({
        ...dto,
        id: uuidv4(),
        userId: userId,
      });

      return await this.diaryRepository.save(Diary);
  
    }

  async getAllDiarys(
    userId: string,
  ): Promise<DiaryEntity[]> {
      return await this.diaryRepository.find({
        select: {
            id: true,
            date: true,
            title: true,
        },
        where: {
          userId: userId,
        },
    })
  }

  async getDiaryOne(diaryId, userId): Promise<DiaryEntity> {
      return await this.diaryRepository.findOne({
        where: {
            id: diaryId,
            userId: userId,
        },
    })
  }

  async updateDiary(userId, diaryId, dto: UpdateDiaryDTO): Promise<UpdateResult> {
    return await this.diaryRepository.update({ id: diaryId, userId: userId }, dto);
  }

  async deleteOne(userId: string, diaryId: string): Promise<DeleteResult> {
    return await this.diaryRepository.delete({ id: diaryId, userId: userId});
  }
}
