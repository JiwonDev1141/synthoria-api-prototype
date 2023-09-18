import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param, Post, Query, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAccessAuthGuard } from '../../util/auth/guard/jwt-access-auth.guard';
import { Request } from 'express';
import { MemberService } from '../../service/member.service';
import { Member } from '../../entity/member.entity';

@ApiTags('Member')
@Controller('/v1/members')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Get('/')
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAccessAuthGuard)
  @ApiOperation({ summary: '워크룸 초대용 회원 조회' })
  @ApiQuery({ name: 'keyword', required: false, type: String })
  async getMember(@Req() request: Request, @Query('keyword') keyword?: string) {
    let members: Member[];

    if (keyword) {
      members = await this.memberService.findMemberByKeyword(keyword);
    } else {
      members = await this.memberService.findMembers();
    }

    return {
      code: 0,
      message: 'success',
      data: {
        members: members,
      },
    };
  }

  @Post('/profile/image')
  @UseInterceptors(FileInterceptor('image'))
  @ApiOperation({ summary: '(개발중) 프로필 이미지 업데이트' })
  async uploadProfileImage(@UploadedFile() file: Express.Multer.File) {
    return {
      originalName: file.originalname,
      filename: file.filename,
      path: file.path,
    };
  }
}
