import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';

import { TasksService } from './tasks.service';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async findAll(@Res() res: Response) {
    try {
      const result = await this.tasksService.findAll();
      return res.status(HttpStatus.OK).json({
        message: 'Tasks retrieved successfully',
        data: result,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error retrieving tasks',
        error: error.message,
      });
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto, @Res() res: Response) {
    try {
      const result = await this.tasksService.create(createTaskDto);
      return res.status(HttpStatus.CREATED).json({
        message: 'Task created successfully',
        data: result,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error creating task',
        error: error.message,
      });
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @Res() res: Response,
  ) {
    try {
      const result = await this.tasksService.update(id, updateTaskDto);
      return res.status(HttpStatus.OK).json({
        message: 'Task updated successfully',
        data: result,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error updating task',
        error: error.message,
      });
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Res() res: Response) {
    try {
      const result = await this.tasksService.delete(id);
      return res.status(HttpStatus.OK).json({
        message: 'Task deleted successfully',
        data: result,
      });
    } catch (error) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: 'Error deleting task',
        error: error.message,
      });
    }
  }
}
