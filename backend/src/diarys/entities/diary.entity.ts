import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TimeScheduleDTO } from '../dto/diary.dto';

@Entity('diary')
export class DiaryEntity {
  @PrimaryGeneratedColumn('uuid') 
  id: string

  @Column('uuid', { comment: 'ユーザーID' })
  userId: string;

  @Column('timestamp', { comment: '始める日' })
  date: Date;

  @Column('varchar',  { length: 30, comment: 'タイトル' })
  title: string;

  @Column('jsonb', { comment: '今日のタイムスケジュール予定', nullable: true })
  timeSchedule?: TimeScheduleDTO[];

  @Column('jsonb',  { comment: '今日のタイムスケジュール結果', nullable: true })
  timeScheduleResult?: TimeScheduleDTO[];

  @Column('varchar', { array: true, comment: '良かった点', nullable: true })
  pros?: Array<string>;

  @Column('text', { array: true, comment: '良くなかった点', nullable: true })
  cons?: Array<string>;

  @Column('text', { array: true, comment: '改善点', nullable: true })
  improvements?: Array<string>;

  @Column('text', { comment: 'コメント', nullable: true })
  freeComment?: string;
}