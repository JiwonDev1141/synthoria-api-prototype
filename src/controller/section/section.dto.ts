import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSectionDto {
  @IsString()
  @ApiProperty({
    description: '워크룸 UUID',
    default: '93c69108-3a70-40f1-a2ee-1134f6dd7cc8',
  })
  roomUuid: string;

  @IsString()
  @ApiProperty({
    description: '섹션명',
    default: 'Todo',
  })
  sectionName: string;
}

export class UpdateSectionDto {
  @IsString()
  @ApiProperty({
    description: '섹션명',
    default: 'Todo',
  })
  sectionName: string;
}
