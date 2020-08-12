import { ConfigModule } from './../../config/config.module';
import { Configuration } from './../../config/config.keys';
import { JwtStrategie } from './domain/strategies/jwt.strategies';
import { AuthController } from './app/auth.controller';
import { AuthRepository } from './infrastructure/auth.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from './../../config/config.service';
import { Module } from '@nestjs/common';

import { AuthService } from './domain/auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
 
 
@Module({
  imports: [
    TypeOrmModule.forFeature([AuthRepository]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        return {
          secret: config.get(Configuration.JWT_SECRET),
          signOptions: {
            expiresIn: 3600,
          },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, ConfigService, JwtStrategie],
  exports: [JwtStrategie, PassportModule],
})
export class AuthModule {}
