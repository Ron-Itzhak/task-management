import { Inject, Injectable } from '@nestjs/common';
import { Db, ObjectId } from 'mongodb';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';

@Injectable()
export class TasksService {
  private readonly collection = this.db.collection('tasks');

  constructor(@Inject('DATABASE_CONNECTION') private db: Db) {}

  async findAll(): Promise<any[]> {
    const tasks = await this.collection.find().toArray();
    return tasks.map(({ _id, ...rest }) => ({
      id: _id.toString(),
      ...rest,
    }));
  }

  async findOne(id: string): Promise<any> {
    const found = await this.collection.findOne({
      _id: new ObjectId(id),
    });
    if (!found) {
      return null;
    }
    const { _id, ...rest } = found;
    return {
      id,
      ...rest,
    };
  }

  async create(createTaskDto: CreateTaskDto): Promise<any> {
    const catId = createTaskDto.categoryId
      ? new ObjectId(createTaskDto.categoryId)
      : null;

    const task = {
      ...createTaskDto,
      categoryId: catId,
      status: createTaskDto.status || 'backlog',
      priority: createTaskDto.priority || 'medium',
      createdAt: new Date(),
      dueDate: new Date(createTaskDto.dueDate),
    };
    return await this.collection.insertOne(task);
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<any> {
    await this.collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateTaskDto },
    );
    return this.findOne(id);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.collection.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount === 1;
  }

  async getTommorowDueDate(): Promise<any[]> {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const startOfTomorrow = new Date(tomorrow);
    startOfTomorrow.setHours(0, 0, 0, 0);
    const endOfTomorrow = new Date(tomorrow);
    endOfTomorrow.setHours(23, 59, 59, 999);

    const tasks = await this.collection
      .find({
        dueDate: {
          $gte: startOfTomorrow,
          $lte: endOfTomorrow,
        },
      })
      .toArray();
    return tasks.map(({ _id, ...rest }) => ({
      id: _id.toString(),
      ...rest,
    }));
  }
}
