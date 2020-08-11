import { Rol } from './../rol.entity';
import { Repository, EntityRepository } from "typeorm";
 

@EntityRepository(Rol)
export class RolRepository extends Repository<Rol> {
    
}