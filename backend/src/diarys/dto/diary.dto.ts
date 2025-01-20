import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class TimeScheduleDTO {
  StartTime: Date;
  EndTime: Date;
  todo: string;
}

export class CreateDiaryDTO {
  @IsDateString()
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
  @IsDateString()
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