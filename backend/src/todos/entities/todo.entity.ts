import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('todo')
export class TodoEntity {
  @PrimaryGeneratedColumn('uuid') 
  id: string;

  @Column('varchar',  {length: 30, comment: 'タイトル' })
  title: string;

  @Column('text',  {comment: '内容', nullable: true })
  todoDetail?: string;

  @Column('date', { comment: '始める日', nullable: true })
  startDate?: Date;

  @Column('integer', { comment: 'かける時間（分）', nullable: true })
  timeRequired?: number;

  @Column('boolean', { comment: '完了したか', default: false })
  isFinished: boolean;
}