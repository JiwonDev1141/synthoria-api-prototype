import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Member')
@Controller('/v1/members')
export class MemberController {
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
