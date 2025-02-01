import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from "dotenv";
import { TodoEntity } from 'src/todos/entities/todo.entity';
import { DiaryEntity } from 'src/diarys/entities/diary.entity';
import { UserEntity } from 'src/users/entities/user.entity';

dotenv.config();

export const typeormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'db',
  port: parseInt(process.env.CONTAINER_DBPORT),
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  entities: [
    TodoEntity,
    DiaryEntity,
    UserEntity
  ],
  synchronize: false,
  logging: false,
};