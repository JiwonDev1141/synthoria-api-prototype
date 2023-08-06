import { IsDateString, IsNumber, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @IsNumber()
  @ApiProperty({
    description: '섹션 ID',
    default: 1,
  })
  taskSectionId: number;

  @IsString()
  @MaxLength(255)
  @ApiProperty({
    description: '워크룸 식별자',
    default: '4d810aed-7477-46f0-91db-88d49f2fd5e9',
  })
  roomUuid: string;

  @IsString()
  @MaxLength(255)
  @ApiProperty({
    description: '작업 이름',
    default: '작업1',
  })
  taskName: string;

  @IsString()
  @MaxLength(1023)
  @ApiProperty({
    description: '작업 내용',
    default: '작업1에 대한 내용입니다.',
  })
  taskDescription: string;

  @IsString()
  @MaxLength(255)
  @ApiProperty({
    description: '작업 타입(?)',
    default: 'PLAN',
  })
  taskType: string;

  @IsDateString()
  @ApiProperty({
    description: '작업 시작일',
    default: '2023-01-01',
  })
  startDate: Date;

  @IsDateString()
  @ApiProperty({
    description: '작업 종료일',
    default: '2023-01-01',
  })
  endDate: Date;
}

export class UpdateTaskDto {
  @IsNumber()
  @ApiProperty({
    description: '섹션 ID',
    default: 1,
  })
  taskSectionId: number;

  @IsString()
  @MaxLength(255)
  @ApiProperty({
    description: '작업 이름',
    default: '작업1',
  })
  taskName: string;

  @IsString()
  @MaxLength(1023)
  @ApiProperty({
    description: '작업 내용',
    default: '작업1에 대한 내용입니다.',
  })
  taskDescription: string;

  @IsString()
  @MaxLength(255)
  @ApiProperty({
    description: '작업 타입(?)',
    default: 'PLAN',
  })
  taskType: string;

  @IsDateString()
  @ApiProperty({
    description: '작업 시작일',
    default: '2023-01-01',
  })
  startDate: Date;

  @IsDateString()
  @ApiProperty({
    description: '작업 종료일',
    default: '2023-01-01',
  })
  endDate: Date;
}
