import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MemberController } from '../controller/member/member.controller';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads', // 이미지가 저장될 폴더 설정
    }),
  ],
  controllers: [MemberController],
  providers: [JwtService],
})
export class MemberModule {}
