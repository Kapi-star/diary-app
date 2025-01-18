import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from './config/typeorm.config';
import { TodoModule } from './todos/todo.module';
import { DiaryModule } from './diarys/diary.module';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeormConfig),
    TodoModule,
    DiaryModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}