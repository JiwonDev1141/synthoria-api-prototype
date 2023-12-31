import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UtilService } from '../service/util.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtAccessStrategy } from '../util/auth/stretegy/jwt-access.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtRefreshStrategy } from '../util/auth/stretegy/jwt-refresh.strategy';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Member } from '../entity/member.entity';
import { Token } from '../entity/token.entity';
import { AuthModule } from './auth.module';
import { Room } from '../entity/room.entity';
import { SubTask } from '../entity/sub-task.entity';
import { Task } from '../entity/task.entity';
import { SubTaskComment } from '../entity/task-comment.entity';
import { MemberRoom } from '../entity/member-room.entity';
import { RoomModule } from './room.module';
import { TaskModule } from './task.module';
import { Section } from '../entity/section.entity';
import { SectionModule } from './section.module';
import { LoggerMiddleware } from '../middleware/logger.middleware';
import { MemberModule } from './member.module';
import { SubTaskModule } from './sub-task.module';
import { VideoController } from '../controller/video/video.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: false,
      envFilePath: `.env`,
    }),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_ACCESS_SECRET'),
        signOptions: {
          expiresIn: configService.get('JWT_ACCESS_EXPIRES_IN') + 'm',
        },
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: process.env.POSTGRE_PW,
      database: 'synthoria',
      logging: false,
      entities: [Member, Token, Room, SubTask, Task, SubTaskComment, MemberRoom, Section],
      synchronize: true,
    }),
    MemberModule,
    AuthModule,
    RoomModule,
    TaskModule,
    SubTaskModule,
    SectionModule,
  ],
  controllers: [VideoController],
  providers: [UtilService, JwtAccessStrategy, JwtRefreshStrategy],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes();
  }
}
