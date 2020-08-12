import { UsuarioModule } from './modules/usuario/usuario.module';
import { Configuration } from './config/config.keys';
import { ConfigService } from './config/config.service';
import { ConfigModule } from './config/config.module';

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './infrastructure/database.module';
import { RolModule } from './modules/rol/rol.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [ConfigModule, DatabaseModule, RolModule, UsuarioModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static port: number | string;
  
  constructor(private readonly _configService: ConfigService) {
   AppModule.port = this._configService.get(Configuration.PORT);
  }
}
