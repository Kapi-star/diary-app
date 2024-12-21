import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTodoDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  todoDetail: string;

  @IsDate()
  @IsOptional()
  startDate: Date;

  @IsNumber()
  @IsOptional()
  timeRequired: number;
}

export class UpdateTodoDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  todoDetail: string;

  @IsDate()
  @IsOptional()
  startDate: Date;

  @IsNumber()
  @IsOptional()
  timeRequired: number;

  @IsBoolean()
  @IsNotEmpty()
  isFinished: boolean;
}