import { BadRequestException, Injectable } from '@nestjs/common';
import { TaskRepository } from '../repository/task.repository';
import { CreateTaskDto, UpdateTaskDto } from '../controller/task/task.dto';
import { Task } from '../entity/task.entity';
import { SectionRepository } from '../repository/section.repository';
import { RoomRepository } from '../repository/room.repository';

@Injectable()
export class TaskService {
  constructor(
    private readonly roomRepository: RoomRepository,
    private readonly taskSectionRepository: SectionRepository,
    private readonly taskRepository: TaskRepository,
  ) {}

  async getTask(taskId: number) {
    const foundTask = await this.taskRepository.findById(taskId);
    if (!foundTask) throw new BadRequestException('테스크를 찾을 수 없습니다.');
    return foundTask;
  }

  async createTask(memberId: number, createTaskDto: CreateTaskDto) {
    const foundTaskSection = await this.taskSectionRepository.findById(
      createTaskDto.taskSectionId,
    );

    const foundRoom = await this.roomRepository.findByUuid(
      createTaskDto.roomUuid,
    );

    if (!foundTaskSection)
      throw new BadRequestException('섹션을 찾을 수 없습니다.');
    if (!foundRoom) throw new BadRequestException('워크룸을 찾을 수 없습니다.');

    const newTask = new Task();
    newTask.taskSection = foundTaskSection;
    newTask.taskName = createTaskDto.taskName;
    newTask.taskDescription = createTaskDto.taskDescription;
    newTask.taskType = createTaskDto.taskType;
    newTask.startDate = createTaskDto.startDate;
    newTask.endDate = createTaskDto.endDate;
    newTask.createdBy = memberId;
    newTask.updatedBy = memberId;
    newTask.room = foundRoom;

    await this.taskRepository.save(newTask);
  }

  async updateTask(
    memberId: number,
    taskId: number,
    updateTaskDto: UpdateTaskDto,
  ) {
    const foundTask = await this.taskRepository.findById(taskId);
    const foundTaskSection = await this.taskSectionRepository.findById(
      updateTaskDto.taskSectionId,
    );

    if (!foundTask) throw new BadRequestException('테스크를 찾을 수 없습니다.');
    if (!foundTaskSection)
      throw new BadRequestException('섹션을 찾을 수 없습니다.');

    foundTask.taskSection = foundTaskSection;
    foundTask.taskName = updateTaskDto.taskName ?? foundTask.taskName;
    foundTask.taskDescription =
      updateTaskDto.taskDescription ?? foundTask.taskDescription;
    foundTask.taskType = updateTaskDto.taskType ?? foundTask.taskType;
    foundTask.startDate = updateTaskDto.startDate ?? foundTask.startDate;
    foundTask.endDate = updateTaskDto.endDate ?? foundTask.endDate;

    await this.taskRepository.save(foundTask);
  }
}
