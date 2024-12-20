import {
  Body,
  Controller,
  Post,
  Get,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CreateTodoDTO } from './dto/create-todo.dto';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post('create')
  async createTodo(@Body() dto: CreateTodoDTO): Promise<any> {
    try {
      await this.todoService.createTodo(dto);

      return {
        statusCode: HttpStatus.OK,
      };
    } catch (err) {
      if (err.name === 'ValidationError') {
        throw new HttpException(
          {
            message: 'バリデーションエラー: ' + err.message,
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      throw new HttpException(
        {
          message: 'その他のサーバー側のエラー: ' + err.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async fetchAllTodo(): Promise<any> {
    try {
      const todos = await this.todoService.getAllTodos();
      return {
        statusCode: HttpStatus.OK,
        data: todos,
      };
    } catch (err) {
      throw new HttpException(
        {
          message: 'その他のサーバー側のエラー: ' + err.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
