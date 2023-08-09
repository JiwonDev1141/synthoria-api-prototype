import { Body, Controller, ForbiddenException, Logger, Post, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SignInRequestDto } from './auth.dto';
import { AuthService } from '../../service/auth.service';
import { JwtRefreshAuthGuard } from '../../util/auth/guard/jwt-refresh-auth.guard';

@ApiTags('Auth')
@Controller('/v1/auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @Post('/sign-in')
  @ApiOperation({ summary: '로그인' })
  async signIn(@Req() request: Request, @Body() body: SignInRequestDto) {
    const { accessToken, refreshToken } = await this.authService.verifyMember(body);
    return {
      code: 200,
      message: 'success',
      data: {
        accessToken,
        refreshToken,
      },
    };
  }

  @Post('/sign-up')
  @ApiOperation({ summary: '(미구현) 회원가입' })
  async signUp() {
    return {
      code: 200,
      message: 'success',
    };
  }

  @Post('/token/reissue')
  @UseGuards(JwtRefreshAuthGuard)
  @ApiBearerAuth('JWT_REFRESH')
  @ApiOperation({ summary: '토큰 재발급' })
  async reissueToken(@Req() request: Request) {
    const user = request.user as any;
    const prevRefreshToken = request.headers['authorization'].replace('Bearer ', '');
    const { accessToken, refreshToken } = await this.authService.reissueToken(prevRefreshToken, user.memberId);
    return {
      code: 200,
      message: 'success',
      data: {
        accessToken,
        refreshToken,
      },
    };
  }
}
