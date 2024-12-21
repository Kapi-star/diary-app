import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import * as dotenv from "dotenv";

dotenv.config();

export const typeormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.CONTAINER_DBPORT),
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  entities: [
    join(__dirname, '../../dist/todos/entities/todo.entity.js'),
    join(__dirname, '../../dist/diarys/entities/diary.entity.js')
  ],
  synchronize: true,
  logging: false,
};