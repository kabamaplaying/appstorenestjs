
import { UsuarioRepositorio } from './usuario.repository';
import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './usuario.entity';

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
    const usuario: Usuario = await this._usuarioRepository.findOne(id, {where: {
        status: "ACTIVE"
    }});

    if (!usuario) {
      throw new NotFoundException('El usuario no existe!');
    }

    return usuario;
  }

  async getAll(): Promise<Usuario[]> {
    const usuarios: Usuario[] = await this._usuarioRepository.find({where: {
        status: "ACTIVE"
    }});

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
    const userExist = await this._usuarioRepository.findOne(id , {where: {
        status: "ACTIVE"
    }}  
    );

    if (!userExist) {
      throw new NotFoundException('Usuario no existe!');
    }
    await this._usuarioRepository.delete(id);
  }
}
