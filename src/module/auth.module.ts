import { Module } from '@nestjs/common';
import { AuthController } from '../controller/auth/auth.controller';
import { AuthService } from '../service/auth.service';
import { UtilService } from '../service/util.service';
import { JwtService } from '@nestjs/jwt';
import { MemberRepository } from '../repository/member.repository';
import { TokenRepository } from '../repository/token.repository';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UtilService, JwtService, MemberRepository, TokenRepository],
})
export class AuthModule {}
