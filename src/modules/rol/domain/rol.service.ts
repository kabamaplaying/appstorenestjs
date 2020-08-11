import { Rol } from './../rol.entity';
import { RolRepository } from './../infrastucture/rol.repository';
import { Injectable, Inject, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RolService {
  constructor(
    @InjectRepository(RolRepository)
    private readonly _rolRepository: RolRepository,
  ) {}

  async get(id: number): Promise<Rol> {
    if (!id) {
      throw new BadRequestException('Id mus be sent');
    }
    const Rol: Rol = await this._rolRepository.findOne(id, {where: {
        status: "ACTIVE"
    }});

    if (!Rol) {
      throw new NotFoundException('El Rol no existe!');
    }

    return Rol;
  }

  async getAll(): Promise<Rol[]> {
    const Rols: Rol[] = await this._rolRepository.find({where: {
        status: "ACTIVE"
    }});

    if (!Rols) {
      throw new NotFoundException('El Rol no existe!');
    }

    return Rols;
  }

  async create(Rol: Rol): Promise<Rol> {
    const saveUser: Rol = await this._rolRepository.save(Rol);
    return saveUser;
  }
  async update(id: number, Rol: Rol): Promise<void> {
    await this._rolRepository.update(id, Rol);
  }

  async delete(id: number): Promise<void> {
    const userExist = await this._rolRepository.findOne(id , {where: {
        status: "ACTIVE"
    }}  
    );

    if (!userExist) {
      throw new NotFoundException('Rol no existe!');
    }
    await this._rolRepository.delete(id);
  }
}
