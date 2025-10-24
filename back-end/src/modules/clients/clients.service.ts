import {ConflictException, Injectable, NotFoundException} from "@nestjs/common"
import {CreateClientDto} from "./dtos/create-client.dto"
import {UpdateClientDto} from "./dtos/update-client.dto"
import {Client} from "./entities/client.entity"
import {plainToInstance} from "class-transformer"
import {PrismaService} from "../../database/prisma.service"

@Injectable()
export class ClientsService {
  constructor(private prisma: PrismaService) {}
  async create(CreateClientDto: CreateClientDto) {
    const findClient = await this.prisma.client.findFirst({
      where: {email: CreateClientDto.email}
    })

    if (findClient) {
      throw new ConflictException({
        statusCode: 409,
        message: "E-mail já cadastrado."
      })
    }

    const client = new Client()
    Object.assign(client, {
      ...CreateClientDto
    })
    await this.prisma.client.create({
      data: {...client}
    })
    return plainToInstance(Client, client)
  }

  async findAll() {
    const findClients = await this.prisma.client.findMany()
    return plainToInstance(Client, findClients)
  }

  async findOne(id: string) {
    const client = await this.prisma.client.findUnique({
      where: {id}
    })
    if (!client) {
      throw new NotFoundException("Client not found")
    }
    return plainToInstance(Client, client)
  }

  async findByEmail(email: string) {
    const findClient = await this.prisma.client.findFirst({
      where: {email}
    })

    return findClient
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    const client = await this.prisma.client.findUnique({
      where: {id}
    })
    if (!client) {
      throw new NotFoundException("Client not found")
    }

    const updatedClient = await this.prisma.client.update({
      where: {id},
      data: {...updateClientDto}
    })

    return plainToInstance(Client, updatedClient)
  }

  async remove(id: string) {
    const client = await this.prisma.client.findUnique({
      where: {id}
    })
    if (!client) {
      throw new NotFoundException("Client not found")
    }
    await this.prisma.client.delete({where: {id}})
  }
}
