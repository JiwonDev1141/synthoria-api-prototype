import { ApiProperty } from '@nestjs/swagger';

export class SignInRequestDto {
  @ApiProperty({
    default: 'admin',
    required: true,
    description: '로그인 아이디',
  })
  loginId: string;

  @ApiProperty({
    default: '1234',
    required: true,
    description: '패스워드',
  })
  password: string;
}

export interface Payload {
  memberId: number;
  loginId: string;
}
