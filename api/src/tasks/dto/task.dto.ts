import {
  IsDateString,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { Priority, Status } from '../interfaces/enums';
// export enum Priority {
//   Low = 'low',
//   Medium = 'medium',
//   High = 'high',
// }
// export enum Status {
//   Backlog = 'backlog',
//   Todo = 'todo',
//   InProgress = 'in progress',
//   Done = 'done',
//   Canceled = 'canceled',
// }
export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  title: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @IsOptional()
  @IsDateString()
  dueDate?: string;

  @IsOptional()
  @IsDateString()
  CreatedAt?: string;

  @IsOptional()
  @IsEnum(Priority, {
    message: 'Priority must be one of: low, medium, high',
  })
  priority?: Priority;

  @IsOptional()
  @IsEnum(Status, {
    message:
      'Status must be one of: backlog, todo, in progress, done, canceled',
  })
  status?: Status;

  @IsOptional()
  @IsMongoId()
  categoryId?: string;

  @IsOptional()
  @IsString({ each: true })
  labels?: string[];
}

export class UpdateTaskDto extends CreateTaskDto {}
