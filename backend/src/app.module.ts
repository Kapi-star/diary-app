import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from './config/typeorm.config';
import { TodoModule } from './todos/todo.module';
import { DiaryModule } from './diarys/diary.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeormConfig),
    TodoModule,
    DiaryModule,
  ],
})
export class AppModule {}