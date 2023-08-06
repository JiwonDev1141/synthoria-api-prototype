import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TaskService } from '../service/task.service';
import { TaskRepository } from '../repository/task.repository';
import { TaskController } from '../controller/task/task.controller';
import { SectionRepository } from '../repository/section.repository';
import { RoomRepository } from '../repository/room.repository';

@Module({
  controllers: [TaskController],
  providers: [
    TaskService,
    JwtService,
    TaskRepository,
    SectionRepository,
    RoomRepository,
  ],
})
export class TaskModule {}
