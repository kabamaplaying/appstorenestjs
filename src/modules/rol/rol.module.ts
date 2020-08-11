import { RolController } from './app/rol.controller';
import { RolService } from './domain/rol.service';
import { SharedModule } from './../../shared/shared.module';
import { RolRepository } from './infrastucture/rol.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
    imports :[TypeOrmModule.forFeature([RolRepository]), SharedModule],
    providers: [RolService],
    controllers: [RolController]
})
export class RolModule {}
