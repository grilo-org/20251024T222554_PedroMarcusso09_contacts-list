import {Injectable, UnauthorizedException} from "@nestjs/common"
import {ClientsService} from "../clients/clients.service"
import {JwtService} from "@nestjs/jwt"
import {compare} from "bcryptjs"

@Injectable()
export class AuthService {
  constructor(
    private clientService: ClientsService,
    private jwtService: JwtService
  ) {}

  async login(email: string, password: string) {
    const client = await this.clientService.findByEmail(email)

    if (!client) {
      throw new UnauthorizedException("Cadastro não existe.")
    }

    const passwordMatch = await compare(password, client.password)

    if (!passwordMatch) {
      throw new UnauthorizedException("Email ou senha está(ão) errado(s).")
    }

    return {
      token: this.jwtService.sign({email: email}, {subject: client.id}),
      client: {
        id: client.id,
        fullName: client.fullName,
        email: client.email
      }
    }
  }
}
