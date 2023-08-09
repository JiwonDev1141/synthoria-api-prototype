import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { Payload } from '../controller/auth/auth.dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Member } from '../entity/member.entity';

@Injectable()
export class UtilService {
  private readonly iterNum: number = 103237;
  private readonly saltValue: number = 10;

  constructor(private readonly configService: ConfigService, private readonly jwtService: JwtService) {}

  // 시크릿 키
  private readonly accessSecretKey: string = 'QSDCk7W_ctV_BPFQqS6L2mTHkCbVRFtY722vycag6YI';
  private readonly refreshSecretKey: string = 'o55zCo-eIRuOo-x60qX3MU_UUmMaM2jbuUybR0bm5Vk';

  /**
   * 문자열 암호화
   * @remarks
   * sha512를 이용해 문자열을 암호화
   * 반복 횟수(`iterNum`)는 103237회로 설정(함수 밖에 정의함)
   * key 길이는 32바이트로 설정
   * @param text - 암호화 할 문자열
   * @param salt - 암호화에 사용할 salt
   * @returns 암호화된 문자열
   */
  encrypt(text: string, salt: string): string {
    return crypto.pbkdf2Sync(text, salt, this.iterNum, 32, 'sha512').toString('base64');
  }

  /**
   * 비밀번호 Hash화
   * @remarks
   * `encrypt` 함수를 이용해 비밀번호를 암호화
   * `salt`는 class 밖에 선언한 `saltValue`를 이용
   * @param password - 암호화 할 비밀번호 평문
   * @returns 암호화된 비밀번호와 salt `$`로 구분
   */
  genHashedPassword(password: string): string {
    const salt = crypto.randomBytes(this.saltValue).toString('base64');
    const hashedPassword = this.encrypt(password, salt);
    return `${salt}$${hashedPassword}`;
  }

  /**
   * 비밀번호 검증
   */
  verifyPassword(dbPassword: string, inputPassword: string): boolean {
    const [salt, hashedPassword] = dbPassword.split('$');
    const inputHashedPassword = this.encrypt(inputPassword, salt);
    return hashedPassword === inputHashedPassword;
  }

  getAccessToken(member: Member): string {
    const payload = { memberId: member.id, loginId: member.loginId };
    const expMin = this.configService.get('JWT_ACCESS_EXPIRES_IN');
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_SECRET'),
      expiresIn: expMin + 'm',
    });
  }

  getRefreshToken(member: Member): string {
    const payload = { memberId: member.id, loginId: member.loginId };
    const expMin = this.configService.get('JWT_REFRESH_EXPIRES_IN');
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: expMin + 'm',
    });
  }
}
