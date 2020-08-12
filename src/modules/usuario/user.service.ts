import { Rol } from './../rol/rol.entity';
import { UsuarioRepositorio } from './usuario.repository';
import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './usuario.entity';
import { StatusEntity } from 'src/shared/enum/entity-status.enum';
import { getConnection, Not } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UsuarioRepositorio)
    private readonly _usuarioRepository: UsuarioRepositorio,
  ) {}

  async get(id: number): Promise<Usuario> {
    if (!id) {
      throw new BadRequestException('Id mus be sent');
    }
    const usuario: Usuario = await this._usuarioRepository.findOne(id, {
      where: {
        status: StatusEntity.ACTIVE,
      },
    });

    if (!usuario) {
      throw new NotFoundException('El usuario no existe!');
    }

    return usuario;
  }

  async getAll(): Promise<Usuario[]> {
    const usuarios: Usuario[] = await this._usuarioRepository.find({
      where: {
        status: StatusEntity.ACTIVE,
      },
    });

    if (!usuarios) {
      throw new NotFoundException('El usuario no existe!');
    }

    return usuarios;
  }

  async create(usuario: Usuario): Promise<Usuario> {
    const saveUser: Usuario = await this._usuarioRepository.save(usuario);
    return saveUser;
  }
  async update(id: number, usuario: Usuario): Promise<void> {
    await this._usuarioRepository.update(id, usuario);
  }

  async delete(id: number): Promise<void> {
    const userExist = await this._usuarioRepository.findOne(id, {
      where: {
        status: StatusEntity.ACTIVE,
      },
    });

    if (!userExist) {
      throw new NotFoundException('Usuario no existe!');
    }
    await this._usuarioRepository.delete(id);
  }

  async setRoleToUser(userId: number, roleId: number) {
    const userExits = await this._usuarioRepository.findOne(userId, {
      where: {
        status: StatusEntity.ACTIVE,
      },
    });

    if (!userExits) {
      throw new NotFoundException();
    }

    const roleExists = await getConnection()
      .getRepository(Rol)
      .findOne(roleId, {
        where: {
          status: StatusEntity.ACTIVE,
        },
      });

    if (!roleExists) {
      throw new NotFoundException('Rol dont exists');
    }

    userExits.roles.push(roleExists);
    await this._usuarioRepository.save(userExits);
    return true;
  }
}
