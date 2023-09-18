import { IsDateString, IsNumber, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSubTaskDto {
  @IsNumber()
  @ApiProperty({
    description: '테스크 ID',
    default: 1,
  })
  taskId: number;

  @IsString()
  @MaxLength(255)
  @ApiProperty({
    description: '서브 작업 이름',
    default: '서브 작업 이름',
  })
  subTaskName: string;

  @IsString()
  @MaxLength(255)
  @ApiProperty({
    description: '서브 작업 설명',
    default: '서브 작업 설명',
  })
  subTaskDescription: string;

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
