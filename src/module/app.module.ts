import { Module } from '@nestjs/common';
import { UtilService } from '../service/util.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtAccessStrategy } from '../util/auth/stretegy/jwt-access.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtRefreshStrategy } from '../util/auth/stretegy/jwt-refresh.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from '../entity/member.entity';
import { Token } from '../entity/token.entity';
import { AuthModule } from './auth.module';
import { Room } from '../entity/room.entity';
import { SubTask } from '../entity/sub-task.entity';
import { Task } from '../entity/task.entity';
import { SubTaskComment } from '../entity/task-comment.entity';

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
      username: 'user',
      password: 'user',
      database: 'workroom',
      logging: false,
      entities: [Member, Token, Room, SubTask, Task, SubTaskComment],
      synchronize: false,
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [UtilService, JwtAccessStrategy, JwtRefreshStrategy],
})
export class AppModule {}
