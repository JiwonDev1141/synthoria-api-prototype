import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Logger, Param, Post, Req, UseGuards } from '@nestjs/common';
import { TaskService } from '../../service/task.service';
import { SubTaskService } from '../../service/sub-task.service';
import { JwtAccessAuthGuard } from '../../util/auth/guard/jwt-access-auth.guard';
import { Request } from 'express';
import { CreateSubTaskDto } from './sub-task.dto';
import { AuthMember } from '../../dto/member/auth-member';

@ApiTags('Sub Task')
@Controller('/v1/sub-tasks')
export class SubTaskController {
  private readonly logger = new Logger(SubTaskController.name);

  constructor(private readonly subTaskService: SubTaskService) {}

  @Get('/:subTaskId')
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAccessAuthGuard)
  @ApiOperation({ summary: '(개발중) 서브 작업 조회' })
  async getSubTask(@Req() request: Request, @Param('subTaskId') subTaskId: number) {
    return {
      code: 0,
      message: 'success',
      data: {
        subTask: 'subTask',
      },
    };
  }

  @Post('/')
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAccessAuthGuard)
  @ApiOperation({ summary: '작업 생성' })
  async createSubTask(@Req() request: Request, @Body() body: CreateSubTaskDto) {
    const user = request.user as AuthMember;
    const subTask = await this.subTaskService.createSubTask(user.memberId, body);
    return {
      code: 0,
      message: 'success',
      data: {
        subTask: subTask,
      },
    };
  }
}
