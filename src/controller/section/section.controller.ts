import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Logger, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../util/auth/guard/jwt-auth.guard';

@ApiTags('Section')
@Controller('/v1/sections')
export class SectionController {
  private readonly logger = new Logger(SectionController.name);

  @Get('/')
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '(구현 예정) 섹션 조회' })
  async getSectionTask() {
    return {
      code: 0,
      message: 'success',
    };
  }
}
