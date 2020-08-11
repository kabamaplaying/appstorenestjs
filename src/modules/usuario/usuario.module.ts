import { UsuarioController } from './app/usuario.controller';
import { SharedModule } from './../../shared/shared.module';
import { UsuarioRepositorio } from './usuario.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioRepositorio]), SharedModule],
  providers: [UserService],
  controllers: [UsuarioController],
})
export class UsuarioModule {}
