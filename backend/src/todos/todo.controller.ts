import {
  Body,
  Controller,
  Post,
  Get,
  HttpException,
  HttpStatus,
  Delete,
  Put,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { CreateTodoDTO, UpdateTodoDTO } from './dto/todo.dto';
import { TodoService } from './todo.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  // タスク作成
  @UseGuards(AuthGuard)
  @Post('/create')
  async createTodo(@Request() req, @Body() dto: CreateTodoDTO): Promise<any> {
    try {
      await this.todoService.createTodo(req.user.sub, dto);

      return {
        message: `成功`,
        statusCode: HttpStatus.CREATED
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
  @UseGuards(AuthGuard)
  @Get()
  async fetchAllTodo(@Request() req): Promise<any> {
    try {
      const todos = await this.todoService.getAllTodos(req.user.sub);
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
  @UseGuards(AuthGuard)
  @Get('/getOne')
  async fetchTodoOne(@Request() req, @Query('todoId') todoId: string): Promise<any> {
    try {
      const todos = await this.todoService.getTodoOne(req.user.sub, todoId);

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

  // 日付からタスク一覧取得
  @UseGuards(AuthGuard)
  @Get('/byDate')
  async fetchTodoByDate(
    @Request() req,
    @Query('date') date: string
  ): Promise<any> {
    try {
      const todos = await this.todoService.fetchTodoByDate(req.user.sub, date);
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
  @UseGuards(AuthGuard)
  @Put('/update')
  async updateTodo(@Request() req, @Query('todoId') todoId: string, @Body() dto: UpdateTodoDTO): Promise<any> {
    try {
      const result = await this.todoService.updateTodo(req.user.sub, todoId, dto);

      if (result.affected === 0) {
        throw new HttpException(
          {
            message: 'Todo not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      return {
        message: `成功`,
        statusCode: HttpStatus.OK
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
  @UseGuards(AuthGuard)
  @Delete('/delete')
  async deleteTodo(@Request() req, @Query('todoId') todoId: string): Promise<any> {
    try {
      const result = await this.todoService.deleteOne(req.user.sub, todoId);

      if (result.affected === 0) {
        throw new HttpException(
          {
            message: 'Todo not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      return {
        message: `成功`,
        statusCode: HttpStatus.OK
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
