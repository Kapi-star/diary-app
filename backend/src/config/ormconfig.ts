import * as dotenv from "dotenv";
import { TodoEntity } from '../todos/entities/todo.entity';
import { DiaryEntity } from '../diarys/entities/diary.entity';
import { UserEntity } from '../users/entities/user.entity';
import { DataSource } from 'typeorm';
import { InitialMigrations1738274621352 } from "migration/1738274621352-InitialMigrations";

dotenv.config({ path: '../.env' });

export const AppDataSource: DataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: parseInt(process.env.CONTAINER_DBPORT),
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  entities: [
    TodoEntity,
    DiaryEntity,
    UserEntity
  ],
  migrations: ["migration/*.ts"],
})