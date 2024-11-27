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
  todoDetail: string;

  @Column('date', { comment: '始める日', nullable: true })
  startDate: Date;

  @Column('date', { comment: '終わる日', nullable: true })
  endDate: Date;

  @Column('boolean', { comment: '完了したか' })
  isFinished: boolean;
}