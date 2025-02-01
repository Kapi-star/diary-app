import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { CreateUserDTO, UpdateUserDTO } from './dto/user.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly UserRepository: Repository<UserEntity>,
  ) {}

  async createUser(dto: CreateUserDTO): Promise<UserEntity> {
      const User = this.UserRepository.create({
        ...dto,
        id: uuidv4(),
      });

      try {
        return await this.UserRepository.save(User);
      } catch (error) {
        if (error.driverError.code === '23505') {
          throw new HttpException(
            {
              message: 'メールアドレスがすでに登録されています: ' + error.message,
            },
            HttpStatus.CONFLICT,
          );
        }
      }
  
    }

    async findOne(email: string): Promise<UserEntity | undefined> {
      return this.UserRepository.findOne({
        where: {
            email: email,
        },
    });
    }

  async updateUser(id, dto: UpdateUserDTO): Promise<UserEntity> {
    const existingUser = await this.UserRepository.findOne({ where: { id } });
      if (!existingUser) {
        throw new HttpException(
          {
            message: 'User not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      const updateUser = this.UserRepository.create({
        ...dto,
        id: id,
      });      
      try {
        return await this.UserRepository.save(updateUser);
      } catch (error) {
        if (error.driverError.code === '23505') {
          throw new HttpException(
            {
              message: 'メールアドレスがすでに登録されています: ' + error.message,
            },
            HttpStatus.CONFLICT,
          );
        }
      }
  }

  async deleteOne(id: string): Promise<DeleteResult> {
    return await this.UserRepository.delete({ id });
  }
}
