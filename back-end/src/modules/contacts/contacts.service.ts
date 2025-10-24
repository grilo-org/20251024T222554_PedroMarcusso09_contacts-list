import {unlink} from "node:fs"
import {Injectable, NotFoundException} from "@nestjs/common"
import {PrismaService} from "../../database/prisma.service"
import {v2 as cloudinary} from "cloudinary"
import {CreateContactDTO} from "./dtos/create-contact.dto"
import {Contact} from "./entities/contacts.entity"
import {UpdateContactDto} from "./dtos/update-contact.dtos"
import {plainToInstance} from "class-transformer"

@Injectable()
export class ContactsService {
  constructor(private prisma: PrismaService) {}

  async create(createContactDto: CreateContactDTO) {
    const contact = new Contact()
    Object.assign(contact, createContactDto)

    const newContact = await this.prisma.contact.create({
      data: {
        id: contact.id,
        fullName: contact.fullName,
        email: contact.email,
        telephone: contact.telephone,
        clientId: contact.clientId
      }
    })

    return newContact
  }

  async findContactsByClientId(clientId: string) {
    const contacts = await this.prisma.contact.findMany({
      where: {clientId}
    })
    return contacts
  }

  async findAll() {
    const contacts = await this.prisma.contact.findMany()
    return contacts
  }

  async update(id: string, updateContactDto: UpdateContactDto) {
    const contact = await this.prisma.contact.findUnique({
      where: {id}
    })
    if (!contact) {
      throw new NotFoundException("Contact not found")
    }

    const updatedContact = await this.prisma.contact.update({
      where: {id},
      data: {...updateContactDto}
    })

    return plainToInstance(Contact, updatedContact)
  }

  async remove(id: string) {
    const contact = await this.prisma.contact.findUnique({
      where: {id}
    })
    if (!contact) {
      throw new NotFoundException("Contact not found")
    }
    await this.prisma.contact.delete({where: {id}})
  }
}
