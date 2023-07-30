import { IsDateString, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoomDto {
  @IsString()
  @MaxLength(255)
  @ApiProperty({
    description: '워크룸 이름',
    default: '새로운 워크룸',
  })
  roomName: string;

  @IsString()
  @MaxLength(255)
  @ApiProperty({
    description: '워크룸 색상',
    default: 'RED',
  })
  roomColor: string;

  @IsDateString()
  @ApiProperty({
    description: '프로젝트 시작일',
    default: '2023-01-01',
  })
  startDate: Date;

  @IsDateString()
  @ApiProperty({
    description: '프로젝트 종료일',
    default: '2023-12-31',
  })
  endDate: Date;
}

export class UpdateRoomDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  @ApiProperty({
    description: '워크룸 이름',
    default: '새로운 워크룸',
  })
  roomName: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  @ApiProperty({
    description: '워크룸 색상',
    default: 'RED',
  })
  roomColor: string;

  @IsOptional()
  @IsDateString()
  @ApiProperty({
    description: '프로젝트 시작일',
    default: '2023-01-01',
  })
  startDate: Date;

  @IsOptional()
  @IsDateString()
  @ApiProperty({
    description: '프로젝트 종료일',
    default: '2023-12-31',
  })
  endDate: Date;
}
