import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UseGuards
} from "@nestjs/common"
import {ClientsService} from "./clients.service"
import {CreateClientDto} from "./dtos/create-client.dto"
import {UpdateClientDto} from "./dtos/update-client.dto"
import {JwtAuthGuard} from "../auth/jwt-auth.guard"
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger"

@ApiTags("clients")
@Controller("clients")
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  create(@Body() CreateClientDto: CreateClientDto) {
    return this.clientsService.create(CreateClientDto)
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.clientsService.findAll()
  }

  @Get(":id")
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  findOne(@Param("id") id: string) {
    return this.clientsService.findOne(id)
  }

  @Patch(":id")
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  update(@Param("id") id: string, @Body() UpdateClientDto: UpdateClientDto) {
    return this.clientsService.update(id, UpdateClientDto)
  }

  @Delete(":id")
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  remove(@Param("id") id: string) {
    return this.clientsService.remove(id)
  }
}
