import {
  IsArray,
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class TimeScheduleDTO {
  StartTime: Date;
  EndTime: Date;
  todo: string;
}

export class CreateDiaryDTO {
  @IsDate()
  @IsNotEmpty()
  date: Date;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsArray()
  @IsOptional()
  todo: Array<string>;

  @IsArray()
  @IsOptional()
  timeSchedule: TimeScheduleDTO[];

  @IsArray()
  @IsOptional()
  timeScheduleResult: TimeScheduleDTO[];

  @IsArray()
  @IsOptional()
  pros: Array<string>;

  @IsArray()
  @IsOptional()
  cons: Array<string>;

  @IsArray()
  @IsOptional()
  improvements: Array<string>;

  @IsString()
  @IsOptional()
  freeComment: string;
}

export class UpdateDiaryDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsArray()
  @IsOptional()
  todo: Array<string>;

  @IsArray()
  @IsOptional()
  timeSchedule: TimeScheduleDTO[];

  @IsArray()
  @IsOptional()
  timeScheduleResult: TimeScheduleDTO[];

  @IsArray()
  @IsOptional()
  pros: Array<string>;

  @IsArray()
  @IsOptional()
  cons: Array<string>;

  @IsArray()
  @IsOptional()
  improvements: Array<string>;

  @IsString()
  @IsOptional()
  freeComent: string;
}