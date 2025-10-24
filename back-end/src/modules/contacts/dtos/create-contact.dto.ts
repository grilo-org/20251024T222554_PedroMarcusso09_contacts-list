import {ApiProperty} from "@nestjs/swagger"
import {IsString} from "class-validator"

export class CreateContactDTO {
  @ApiProperty()
  @IsString()
  fullName: string

  @ApiProperty()
  @IsString()
  email: string

  @ApiProperty()
  @IsString()
  telephone: string

  @ApiProperty()
  @IsString()
  clientId: string
}
