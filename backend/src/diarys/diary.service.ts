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

  async createDiary(dto: CreateDiaryDTO): Promise<DiaryEntity> {
      const Diary = this.diaryRepository.create({
        ...dto,
        id: uuidv4(),
      });

      return await this.diaryRepository.save(Diary);
  
    }

  async getAllDiarys(): Promise<DiaryEntity[]> {
      return await this.diaryRepository.find({
        select: {
            id: true,
            date: true,
            title: true,
        },
    })
  }

  async getDiaryOne(id): Promise<DiaryEntity> {
      return await this.diaryRepository.findOne({
        where: {
            id: id,
        },
    })
  }

  async updateDiary(id, dto: UpdateDiaryDTO): Promise<UpdateResult> {
      return await this.diaryRepository.update(id, dto);
  }

  async deleteOne(id: string): Promise<DeleteResult> {
    return await this.diaryRepository.delete({ id });
  }
}
