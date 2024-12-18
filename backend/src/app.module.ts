import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from './config/typeorm.config';
import { TodoModule } from './todos/todo.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeormConfig),
    TodoModule,
  ],
})
export class AppModule {}