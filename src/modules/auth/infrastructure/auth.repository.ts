import { Rol } from './../../rol/rol.entity';
import { Usuario } from './../../usuario/usuario.entity';
import { UsuarioDetails } from './../../usuario/usuario.details.entity';
import { RolType } from './../../rol/roletype.enum';
import { RolRepository } from './../../rol/infrastucture/rol.repository';
import { SignUpDto } from './../domain/dto/signout.dto';
import { SigninDto } from './../domain/dto/sigin.dto';
import { Repository, EntityRepository, getConnection } from 'typeorm';
import { genSalt, hash } from 'bcryptjs';

@EntityRepository(Usuario)
export class AuthRepository extends Repository<Usuario> {
  async signup(signOutDto: SignUpDto) {
    const { username, email, password } = signOutDto;

    const user = new Usuario();
    user.username = username;
    user.email = email;
    const rolRepository: RolRepository = await getConnection().getRepository(
      Rol,
    );
    const defaultRol: Rol = await rolRepository.findOne({
      where: { name: RolType.GENERAL },
    });
    user.roles = [defaultRol];
    const userDetail = new UsuarioDetails();
    user.details = userDetail;

    const salt = await genSalt(10);
    user.password = await hash(password, salt);
    this.save(user);

  }
}
