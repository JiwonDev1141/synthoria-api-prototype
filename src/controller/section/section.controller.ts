import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, Logger, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../util/auth/guard/jwt-auth.guard';
import { Request } from 'express';
import { SectionService } from '../../service/section.service';
import { CreateSectionDto, UpdateSectionDto } from './section.dto';
import { AuthMember } from '../../dto/member/auth-member';
import { UpdateTaskDto } from '../task/task.dto';

@ApiTags('Section')
@Controller('/v1/sections')
export class SectionController {
  private readonly logger = new Logger(SectionController.name);

  constructor(private readonly sectionService: SectionService) {}

  @Get('/')
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '섹션 리스트 조회' })
  async getSections(@Req() request: Request, @Query('roomUuid') roomUuid: string) {
    const sections = await this.sectionService.getSection(roomUuid);
    return {
      code: 0,
      message: 'success',
      data: {
        sections: sections,
      },
    };
  }

  @Post('/')
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '섹션 추가' })
  async createSection(@Req() request: Request, @Body() body: CreateSectionDto) {
    const user = request.user as AuthMember;
    await this.sectionService.createSection(user.memberId, body);
    return {
      code: 0,
      message: 'success',
    };
  }

  @Patch('/:sectionId')
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '섹션 수정' })
  async updateSection(@Req() request: Request, @Param('sectionId') sectionId: number, @Body() body: UpdateSectionDto) {
    const user = request.user as AuthMember;
    const section = await this.sectionService.updateSection(user.memberId, sectionId, body);
    return {
      code: 0,
      message: 'success',
      data: {
        section: section,
      },
    };
  }

  @Delete('/:sectionId')
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '섹션 삭제' })
  async deleteSection(@Req() request: Request, @Param('sectionId') sectionId: number) {
    await this.sectionService.deleteSection(sectionId);
    return {
      code: 0,
      message: 'success',
    };
  }
}
