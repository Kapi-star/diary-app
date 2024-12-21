import {
  Body,
  Controller,
  Post,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { CreateTodoDTO, UpdateTodoDTO } from './dto/todo.dto';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  // タスク作成
  @Post('create')
  async createTodo(@Body() dto: CreateTodoDTO): Promise<any> {
    try {
      await this.todoService.createTodo(dto);

      return {
        statusCode: HttpStatus.OK,
      };
    } catch (err) {
      throw new HttpException(
        {
          message: 'サーバーエラー: ' + err.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // タスク一覧取得
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
          message: 'サーバーエラー: ' + err.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // タスク詳細取得
  @Get(':id')
  async fetchTodoOne(@Param('id') id: string): Promise<any> {
    try {
      const todos = await this.todoService.getTodoOne(id);

      if(todos == null) {
        throw new HttpException(
          {
            message: 'Todo not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      return {
        statusCode: HttpStatus.OK,
        data: todos,
      };
    } catch (err) {
      throw new HttpException(
        {
          message: 'サーバーエラー: ' + err.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // タスク更新
  @Patch(':id/update')
  async updateTodo(@Param('id') id: string, @Body() dto: UpdateTodoDTO): Promise<any> {
    try {
      const result = await this.todoService.updateTodo(id, dto);

      if (result.affected === 0) {
        throw new HttpException(
          {
            message: 'Todo not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      return {
        statusCode: HttpStatus.OK,
      };
    } catch (err) {

      throw new HttpException(
        {
          message: 'サーバーエラー: ' + err.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // タスク削除
  @Delete(':id/delete')
  async deleteTodo(@Param('id') id: string): Promise<any> {
    try {
      const result = await this.todoService.deleteOne(id);

      if (result.affected === 0) {
        throw new HttpException(
          {
            message: 'Todo not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      return {
        statusCode: HttpStatus.OK,
      };
    } catch (err) {
      throw new HttpException(
        {
          message: 'サーバーエラー: ' + err.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
