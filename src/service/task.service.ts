import { Injectable } from '@nestjs/common';
import { TaskRepository } from '../repository/task.repository';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}
}
