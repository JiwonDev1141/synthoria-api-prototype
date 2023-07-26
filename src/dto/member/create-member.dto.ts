import { IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMemberDto {
  @IsString()
  @MaxLength(255)
  @ApiProperty({
    description: '로그인 아이디',
    default: 'test',
  })
  loginId: string;

  @IsString()
  @MaxLength(255)
  @ApiProperty({
    type: 'string',
  })
  password: string;
}
