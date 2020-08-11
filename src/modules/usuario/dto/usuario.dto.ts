import { UsuarioDetails } from './../usuario.details.entity';
import { RolType } from './../../rol/roletuype.enum';
import { IsNotEmpty } from 'class-validator';
export class UsuarioDto {
  @IsNotEmpty()
  id: number;
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  roles: RolType[];
  @IsNotEmpty()
  details: UsuarioDetails;
}
