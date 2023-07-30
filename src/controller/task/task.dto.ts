import { IsDateString, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

enum TaskStatus {
  TODO,
  DOING,
  DONE,
}

export class CreateTaskDto {
  @IsString()
  @MaxLength(255)
  @ApiProperty({
    description: '객실 식별자',
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

  @IsString()
  @MaxLength(255)
  @ApiProperty({
    description: '작업 상태(TODO, DOING, DONE)',
    default: 'TODO',
  })
  taskStatus: TaskStatus;

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
