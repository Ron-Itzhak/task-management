import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { MongoModule } from 'src/shared/mongo/mongo.module';

@Module({
  imports: [MongoModule],
  providers: [TasksService],
  controllers: [TasksController],
})
export class TasksModule {}
