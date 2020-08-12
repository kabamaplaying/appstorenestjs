import { SigninDto } from './../domain/dto/sigin.dto';
import { AuthService } from './../domain/auth.service';
import { SignUpDto } from './../domain/dto/signout.dto';
import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly _authservice: AuthService) {}
  @Post('/signup')
  async signup(@Body() sigupDto: SignUpDto) {
    return this._authservice.sigup(sigupDto);
  }

  @Post('/signin')
  @UsePipes(ValidationPipe)
  async signin(@Body() signinDto: SigninDto) {
    return this._authservice.signin(signinDto);
  }
}
