import { IsString, isNotEmpty, IsNotEmpty } from 'class-validator';
export class SigninDto {
  @IsNotEmpty()
  @IsString()
  username: string;
  
  @IsNotEmpty()
  @IsString()
  password: string;
}
