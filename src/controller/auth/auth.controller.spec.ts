import { Test, TestingModule, TestingModuleBuilder } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from '../../service/auth.service';
import { Request } from 'express';
import { SignInRequestDto } from './auth.dto';
import { UtilService } from '../../service/util.service';
import { JwtService } from '@nestjs/jwt';
import { MemberRepository } from '../../repository/member.repository';
import { TokenRepository } from '../../repository/token.repository';
import { ConfigService } from '@nestjs/config';
import { AppModule } from '../../module/app.module';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeAll(async () => {
    const moduleref = await Test.createTestingModule({
      imports: [AppModule],
      controllers: [AuthController],
      providers: [AuthService, UtilService, ConfigService, JwtService, MemberRepository, TokenRepository],
    }).compile();

    authService = moduleref.get<AuthService>(AuthService);
    authController = moduleref.get<AuthController>(AuthController);
  });

  describe('signIn', () => {
    it('should return token', async () => {
      const request = {} as Request;
      const body: SignInRequestDto = {
        loginId: 'admin',
        password: '1234',
      };

      jest.spyOn(authService, 'verifyMember').mockResolvedValueOnce({
        accessToken: 'access-token',
        refreshToken: 'refresh-token',
      });

      const result = await authController.signIn(request, body);
      expect(result).toEqual({
        code: 200,
        message: 'success',
        data: {
          accessToken: 'access-token',
          refreshToken: 'refresh-token',
        },
      });
    });
  });
});
