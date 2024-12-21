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

  async createTodo(dto: CreateTodoDTO): Promise<TodoEntity> {
      const todo = this.todoRepository.create({
        ...dto,
        id: uuidv4(),
        isFinished: false,
      });

      return await this.todoRepository.save(todo);
  
    }

  async getAllTodos(): Promise<TodoEntity[]> {
      return await this.todoRepository.find({
        select: {
            id: true,
            title: true,
            startDate: true,
            timeRequired:true,
            isFinished: true,
        },
    })
  }

  async getTodoOne(id): Promise<TodoEntity> {
      return await this.todoRepository.findOne({
        where: {
            id: id,
        },
    })
  }

  async updateTodo(id, dto: UpdateTodoDTO): Promise<UpdateResult> {
      return await this.todoRepository.update(id, dto);
  }

  async deleteOne(id: string): Promise<DeleteResult> {
    return await this.todoRepository.delete({ id });
  }
}
