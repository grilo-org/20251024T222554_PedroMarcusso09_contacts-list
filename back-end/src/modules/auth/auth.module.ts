import {Module} from "@nestjs/common"
import {AuthService} from "./auth.service"
import {ClientsModule} from "../clients/clients.module"
import {JwtModule} from "@nestjs/jwt"
import {AuthController} from "./auth.controller"
import {JwtStrategy} from "./jwt.strategy"

@Module({
  imports: [
    ClientsModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: {expiresIn: "1h"}
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy]
})
export class AuthModule {}
