import { IJwtPayload } from './dto/jwt-payload.interface';
import { Usuario } from './../../usuario/usuario.entity';
import { SigninDto } from './dto/sigin.dto';
import { SignUpDto } from './dto/signout.dto';
import { AuthRepository } from './../infrastructure/auth.repository';
import { Injectable, NotFoundException, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { RolType } from 'src/modules/rol/roletype.enum';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthRepository)
    private readonly _authRepository: AuthRepository,
    private readonly _jwtService: JwtService,
  ) {}

  async sigup(sigupDto: SignUpDto) {
    const { username, email } = sigupDto;

    const userExist = await this._authRepository.findOne({
      where: [
        {
          username,
        },
        { email },
      ],
    });

    if(userExist) {
        throw new ConflictException('username or email already exists');
    }

    return this._authRepository.signup(sigupDto);
  }
  async signin(signinDto: SigninDto): Promise<{token: string}> {
      const { username, password } = signinDto;
      const user: Usuario = await this._authRepository.findOne({
          where: {username}
      });
      if(!user) {
          throw new NotFoundException('user dont exists');
      }

      const isMatch = await compare(password, user.password);
      if(!isMatch) {
          throw new UnauthorizedException('invalid credentials');
      }

      const payload: IJwtPayload = {
          id: user.id,
          email: user.email,
          username: user.username,
          roles: user.roles.map(r => r.name as RolType)
      };

      const token = await this._jwtService.sign(payload);
      return { token};
  }
}
