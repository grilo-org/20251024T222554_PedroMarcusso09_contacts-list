import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards
} from "@nestjs/common"
import {CreateContactDTO} from "./dtos/create-contact.dto"
import {ContactsService} from "./contacts.service"
import {JwtAuthGuard} from "../auth/jwt-auth.guard"
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger"
import {UpdateContactDto} from "./dtos/update-contact.dtos"

@ApiTags("contacts")
@Controller("contacts")
export class ContactsController {
  constructor(private contactsService: ContactsService) {}
  @Post("")
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  create(@Body() createContactDTO: CreateContactDTO) {
    return this.contactsService.create(createContactDTO)
  }

  @Get("")
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.contactsService.findAll()
  }

  @Get(":clientId/contacts")
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  findContactsByClientId(@Param("clientId") clientId: string) {
    return this.contactsService.findContactsByClientId(clientId)
  }

  @Patch(":id")
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  update(@Param("id") id: string, @Body() UpdateContactDto: UpdateContactDto) {
    return this.contactsService.update(id, UpdateContactDto)
  }

  @HttpCode(204)
  @Delete(":id")
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  remove(@Param("id") id: string) {
    return this.contactsService.remove(id)
  }
}
