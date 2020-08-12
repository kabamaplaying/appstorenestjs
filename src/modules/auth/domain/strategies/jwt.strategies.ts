import { IJwtPayload } from './../dto/jwt-payload.interface';
import { AuthRepository } from './../../infrastructure/auth.repository';
import { Configuration } from './../../../../config/config.keys';
import { ConfigService } from './../../../../config/config.service';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UnauthorizedException, Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategie extends PassportStrategy(Strategy) {
  constructor(
    private readonly _configservice: ConfigService,
    @InjectRepository(AuthRepository)
    private readonly _authRepository: AuthRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: _configservice.get(Configuration.JWT_SECRET),
    });
  }
  async validateUser(payload: IJwtPayload) {
    const { username } = payload;
    const user = await this._authRepository.findOne({
      where: {
        username,
        status: 'ACTIVE',
      },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return payload;
  }
}
