import { Rol } from './../rol.entity';
import {
  Controller,
  Param,
  Get,
  ParseIntPipe,
  Post,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { RolService } from '../domain/rol.service';

@Controller('roles')
export class RolController {
  constructor(private readonly _RolService: RolService) {}

  @Get(':id')
  async getRol(@Param('id', ParseIntPipe) id: number): Promise<Rol> {
    const Rol = await this._RolService.get(id);
    return Rol;
  }

  @Get()
  public async Rols(): Promise<Rol[]> {
    const Rols = await this._RolService.getAll();
    return Rols;
  }

  @Post()
  async createRol(@Body() Rol: Rol): Promise<Rol> {
    const createRol = await this._RolService.create(Rol);
    return createRol;
  }

  @Patch(':id')
  async updateRol(
    @Param('id', ParseIntPipe) id: number,
    @Body() Rol: Rol,
  ): Promise<Rol> {
    const createRol = await this._RolService.create(Rol);
    return createRol;
  }

  @Delete(':id')
  async deleteRol(@Param('id', ParseIntPipe) id: number) {
    await this._RolService.delete(id);
    return true;
  }
}
