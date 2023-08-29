import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAccessAuthGuard } from '../../util/auth/guard/jwt-access-auth.guard';
import { Request } from 'express';
import { RoomService } from '../../service/room.service';
import { CreateRoomDto, InviteMemebrDto, UpdateRoomDto } from './room.dto';
import { AuthMember } from '../../dto/member/auth-member';
import { Room } from '../../entity/room.entity';

@ApiTags('Room')
@Controller('/v1/rooms')
export class RoomController {
  private readonly logger = new Logger(RoomController.name);

  constructor(private readonly roomService: RoomService) {}

  @Get('/')
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAccessAuthGuard)
  @ApiOperation({ summary: '워크룸 리스트 조회' })
  async getRooms(@Req() request: Request) {
    const user = request.user as AuthMember;
    const rooms = await this.roomService.getRooms(user.memberId);
    return {
      code: 0,
      message: 'success',
      data: {
        rooms: rooms,
      },
    };
  }

  @Get('/:uuid')
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAccessAuthGuard)
  @ApiOperation({ summary: '워크룸 상세 조회' })
  async getRoom(@Req() request: Request, @Param('uuid') uuid: string) {
    const user = request.user as AuthMember;
    if (!uuid || uuid === '') {
      throw new BadRequestException();
    }

    const room = await this.roomService.getRoom(user.memberId, uuid);
    return {
      code: 0,
      message: 'success',
      data: {
        room: room,
      },
    };
  }

  @Get('/:uuid/tasks')
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAccessAuthGuard)
  @ApiOperation({ summary: '워크룸 작업 리스트 조회' })
  async getTasksInRoom(@Req() request: Request, @Param('uuid') uuid: string) {
    const user = request.user as AuthMember;
    if (!uuid || uuid === '') {
      throw new BadRequestException();
    }
    const tasks = await this.roomService.getTasks(uuid);
    return {
      code: 0,
      message: 'success',
      data: {
        tasks: tasks,
      },
    };
  }

  @Post('/')
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAccessAuthGuard)
  @ApiOperation({ summary: '워크룸 생성' })
  async createRoom(@Req() request: Request, @Body() body: CreateRoomDto) {
    const user = request.user as AuthMember;
    const room: Room = await this.roomService.createRoom(user.memberId, body);
    return {
      code: 0,
      message: 'success',
      data: {
        room: room,
      },
    };
  }

  @Post('/:uuid/invite')
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAccessAuthGuard)
  @ApiOperation({ summary: '워크룸 회원 초대' })
  async inviteMember(@Req() request: Request, @Param('uuid') uuid: string, @Body() body: InviteMemebrDto) {
    await this.roomService.inviteMember(uuid, body.loginId);
    return {
      code: 0,
      message: 'success',
    };
  }

  @Get('/:uuid/members')
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAccessAuthGuard)
  @ApiOperation({ summary: '워크룸 회원 목록 조회' })
  async getMembersInRoom(@Req() request: Request, @Param('uuid') uuid: string) {
    const members = await this.roomService.getInvitedMembers(uuid);
    return {
      code: 0,
      message: 'success',
      data: {
        members: members,
      },
    };
  }

  @Patch('/:uuid')
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAccessAuthGuard)
  @ApiOperation({ summary: '워크룸 수정' })
  async updateRoom(@Req() request: Request, @Body() body: UpdateRoomDto, @Param('uuid') uuid: string) {
    const user = request.user as AuthMember;
    if (!uuid || uuid === '') {
      throw new BadRequestException();
    }

    await this.roomService.updateRoom(user.memberId, uuid, body);
    return {
      code: 0,
      message: 'success',
    };
  }

  @Delete('/:uuid')
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAccessAuthGuard)
  @ApiOperation({ summary: '워크룸 삭제' })
  async deleteRoom(@Req() request: Request, @Param('uuid') uuid: string) {
    const user = request.user as AuthMember;

    if (!uuid || uuid === '') {
      throw new BadRequestException();
    }

    await this.roomService.deleteRoom(user.memberId, uuid);
    return {
      code: 0,
      message: 'success',
    };
  }
}
