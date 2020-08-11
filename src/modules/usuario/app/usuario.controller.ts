
import { Usuario } from './../usuario.entity';
import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from '../user.service';
 

@Controller('users')
export class UsuarioController {
  constructor(private readonly _userService: UserService) {}

  @Get(':id')
  async getUser(@Param('id', ParseIntPipe) id: number): Promise<Usuario> {
    const user = await this._userService.get(id);
    return user;
  }

  @Get()
  public async  usuarios(): Promise<Usuario[]> {
    const users = await this._userService.getAll();
    return users;
  }

  @Post()
  async createUser(@Body() user: Usuario): Promise<Usuario> {
    const createUser = await this._userService.create(user);
    return createUser;
  }

  @Patch(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: Usuario,
  ): Promise<Usuario> {
    const createUser = await this._userService.create(user);
    return createUser;
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    await this._userService.delete(id);
    return true;
  }
}
