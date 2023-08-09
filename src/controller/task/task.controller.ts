import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Logger, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { TaskService } from '../../service/task.service';
import { JwtAuthGuard } from '../../util/auth/guard/jwt-auth.guard';
import { Request } from 'express';
import { CreateTaskDto, UpdateTaskDto } from './task.dto';
import { AuthMember } from '../../dto/member/auth-member';
import { Task } from '../../entity/task.entity';

@ApiTags('Task')
@Controller('/v1/tasks')
export class TaskController {
  private readonly logger = new Logger(TaskController.name);

  constructor(private readonly taskService: TaskService) {}

  @Get('/:taskId')
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '작업 조회' })
  async getTask(@Req() request: Request, @Param('taskId') taskId: number) {
    const user = request.user as AuthMember;
    const task = await this.taskService.getTask(taskId);
    return {
      code: 0,
      message: 'success',
      data: {
        task: task,
      },
    };
  }

  @Post('/')
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '작업 생성' })
  async createTask(@Req() request: Request, @Body() body: CreateTaskDto) {
    const user = request.user as AuthMember;
    await this.taskService.createTask(user.memberId, body);
    return {
      code: 0,
      message: 'success',
    };
  }

  @Patch('/:taskId')
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '작업 수정' })
  async updateTask(@Req() request: Request, @Body() body: UpdateTaskDto, @Param('taskId') taskId: number) {
    const user = request.user as AuthMember;
    await this.taskService.updateTask(user.memberId, taskId, body);
    return {
      code: 0,
      message: 'success',
    };
  }
}
