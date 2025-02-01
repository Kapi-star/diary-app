import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { TodoEntity } from './entities/todo.entity';
import { CreateTodoDTO, UpdateTodoDTO } from './dto/todo.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>,
  ) {}

  async createTodo(userId, dto: CreateTodoDTO): Promise<TodoEntity> {
      const todo = this.todoRepository.create({
        ...dto,
        id: uuidv4(),
        isFinished: false,
        userId: userId,
      });

      return await this.todoRepository.save(todo);
  
    }

  async getAllTodos(userId: string): Promise<TodoEntity[]> {
      return await this.todoRepository.find({
        select: {
            id: true,
            title: true,
            startDate: true,
            timeRequired:true,
            isFinished: true,
        },
        where: {
          userId: userId,
        },
    })
  }

  async getTodoOne(userId: string, todoId: string): Promise<TodoEntity> {
      return await this.todoRepository.findOne({
        where: {
            id: todoId,
            userId: userId,
        },
    })
  }

  async fetchTodoByDate(userId: string, date: string): Promise<TodoEntity[]> {
    const today = new Date(date);
    return await this.todoRepository.find({
      select: {
          id: true,
          title: true,
          startDate: true,
          timeRequired:true,
          isFinished: true,
      },
      where: {
        userId: userId,
        startDate: today,
      },
  })
}

  async updateTodo(userId, todoId, dto: UpdateTodoDTO): Promise<UpdateResult> {
      return await this.todoRepository.update({ id: todoId, userId: userId }, dto);
  }

  async deleteOne(userId: string, todoId: string): Promise<DeleteResult> {
    return await this.todoRepository.delete({ id: todoId, userId: userId });
  }
}
