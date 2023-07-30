import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TaskService } from '../service/task.service';
import { TaskRepository } from '../repository/task.repository';
import { TaskController } from '../controller/task/task.controller';

@Module({
  controllers: [TaskController],
  providers: [TaskService, JwtService, TaskRepository],
})
export class TaskModule {}
