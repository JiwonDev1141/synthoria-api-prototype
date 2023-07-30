import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from '../../service/task.service';
import { JwtAuthGuard } from '../../util/auth/guard/jwt-auth.guard';
import { Request } from 'express';
import { CreateTaskDto } from './task.dto';

@ApiTags('Task')
@Controller('/v1/tasks')
export class TaskController {
  private readonly logger = new Logger(TaskController.name);

  constructor(private readonly taskService: TaskService) {}

  @Post('/')
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '작업 생성' })
  async createTask(@Req() request: Request, @Body() body: CreateTaskDto) {
    return {
      code: 0,
      message: 'success',
    };
  }
}
