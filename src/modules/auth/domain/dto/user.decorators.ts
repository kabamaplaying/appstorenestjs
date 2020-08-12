import { UsuarioDto } from './../../../usuario/dto/usuario.dto';
import { createParamDecorator } from '@nestjs/common';

export const Getuser = createParamDecorator(
  (data, req): UsuarioDto => {
    return req.user;
  },
);
