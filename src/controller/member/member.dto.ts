import { IsDateString, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMemberDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  @ApiProperty({
    description: '회원명',
    default: '김해양',
  })
  username: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  @ApiProperty({
    description: '부서',
    default: '선체설계부',
  })
  departmnet: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  @ApiProperty({
    description: '직책',
    default: '선임',
  })
  position: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  @ApiProperty({
    description: '이메일',
    default: 'kimhaeyang@hhi.co.kr',
  })
  email: string;

  @IsOptional()
  @IsDateString()
  @ApiProperty({
    description: '생년월일',
    default: '1990-04-10',
  })
  birth: Date;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  @ApiProperty({
    description: '타임존',
    default: 'Asia/Seoul',
  })
  timezone: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  @ApiProperty({
    description: '국가코드',
    default: '+82',
  })
  countryCode: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  @ApiProperty({
    description: '연락처',
    default: '01012345998',
  })
  phone: string;
}
