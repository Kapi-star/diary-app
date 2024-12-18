import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoEntity } from './entities/todo.entity';
import { CreateTodoDTO } from './dto/create-todo.dto';
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
      });

      return await this.todoRepository.save(todo);
  }
}
