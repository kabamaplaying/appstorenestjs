import { SharedModule } from './../../../../shared/shared.module';
import { AuthRepository } from './../../infrastructure/auth.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './../../domain/auth.service';
import { Module } from '@nestjs/common';
import { AuthController } from '../auth.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AuthRepository]), SharedModule],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
