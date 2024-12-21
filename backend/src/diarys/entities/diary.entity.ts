import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

class TimeSchedule {
  StartTime: Date;
  EndTime: Date;
  todo: string;
}

@Entity('diary')
export class DiaryEntity {
  @PrimaryGeneratedColumn('uuid') 
  id: string;

  @Column('date', { comment: '始める日' })
  date: Date;

  @Column('varchar',  { length: 30, comment: 'タイトル' })
  title: string;

  @Column('text',  { array: true, comment: '今日のタスク', nullable: true })
  todo?: Array<string>;

  @Column('json', { array: true, comment: '今日のタイムスケジュール予定', nullable: true })
  timeSchedule?: TimeSchedule[];

  @Column('json',  { array: true, comment: '今日のタイムスケジュール結果', nullable: true })
  timeScheduleResult?: TimeSchedule[];

  @Column('varchar', { array: true, comment: '良かった点', nullable: true })
  pros?: Array<string>;

  @Column('text', { array: true, comment: '良くなかった点', nullable: true })
  cons?: Array<string>;

  @Column('text', { array: true, comment: '改善点', nullable: true })
  improvements?: Array<string>;

  @Column('text', { comment: 'コメント', nullable: true })
  freeComment?: string;
}