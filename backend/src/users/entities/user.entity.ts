import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Entity('user')
@Unique(['email'])
export class UserEntity {
  @PrimaryGeneratedColumn('uuid') 
  id: string;

  @Column('varchar',  { length: 20, comment: 'ユーザー名' })
  username: string;

  @Column('varchar',  { length: 200, comment: 'メールアドレス' })
  email: string;

  @Column('varchar', { length: 100, comment: 'パスワード' })
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password && !this.password.startsWith('$2b$')) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
}