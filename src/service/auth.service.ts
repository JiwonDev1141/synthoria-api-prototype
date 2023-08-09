import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInRequestDto } from '../controller/auth/auth.dto';
import { UtilService } from './util.service';
import { MemberRepository } from '../repository/member.repository';
import { TokenRepository } from '../repository/token.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly memberRepository: MemberRepository,
    private readonly tokenRepository: TokenRepository,
    private readonly utilSerivce: UtilService,
  ) {}

  async verifyMember(body: SignInRequestDto) {
    const foundMember = await this.memberRepository.findOne({
      where: { loginId: body.loginId },
      relations: { token: true },
    });

    // 아이디를 찾을 수 없는 경우
    if (!foundMember) {
      throw new HttpException(
        {
          code: 1,
          message: '아이디 또는 비밀번호를 확인해주세요.',
        },
        401,
      );
    }

    // 비밀번호 확인
    const isValidPassword = !this.utilSerivce.verifyPassword(foundMember.password, body.password);

    if (!isValidPassword) {
      throw new HttpException(
        {
          code: 1,
          message: '아이디 또는 비밀번호를 확인해주세요.',
        },
        401,
      );
    }

    // JWT 토큰 발급 후, 저장
    const accessToken = this.utilSerivce.getAccessToken(foundMember);
    const refreshToken = this.utilSerivce.getRefreshToken(foundMember);

    await this.tokenRepository.update(foundMember.token.id, {
      refreshToken: refreshToken,
    });

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }

  /**
   * JWT 토큰을 재발급합니다.
   */
  async reissueToken(prevRefreshToken: string, memberId: number) {
    const foundMember = await this.memberRepository.findById(memberId);
    if (!foundMember) {
      throw new UnauthorizedException();
    }

    // JWT 토큰 발급
    const accessToken = this.utilSerivce.getAccessToken(foundMember);
    const refreshToken = this.utilSerivce.getRefreshToken(foundMember);

    // Todo - DB에 저장된된 REFRESH TOKEN 값 비교 로직 추가!!

    // JWT 리프레시 토큰 업데이트
    await this.tokenRepository.update(foundMember.token.id, {
      refreshToken: refreshToken,
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}
