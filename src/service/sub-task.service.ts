import { BadRequestException, Injectable } from '@nestjs/common';
import { SubTaskRepository } from '../repository/sub-task.repository';
import { CreateSubTaskDto } from '../controller/sub-task/sub-task.dto';
import { TaskRepository } from '../repository/task.repository';

@Injectable()
export class SubTaskService {
  constructor(private readonly subTaskRepository: SubTaskRepository, private readonly taskRepository: TaskRepository) {}

  /**
   * 서브 작업 생성
   * @param memberId 회원 시퀀스
   * @param createSubTaskDto
   */
  async createSubTask(memberId: number, createSubTaskDto: CreateSubTaskDto) {
    const foundTask = await this.taskRepository.findById(createSubTaskDto.taskId);
    if (!foundTask) throw new BadRequestException('테스크를 찾을 수 없습니다.');

    console.log(JSON.stringify(foundTask));
  }
}
