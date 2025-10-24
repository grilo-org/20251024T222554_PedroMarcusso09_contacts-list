import {ApiProperty} from "@nestjs/swagger"
import {hashSync} from "bcryptjs"
import {Transform} from "class-transformer"
import {IsEmail, IsNotEmpty, IsString, MinLength} from "class-validator"

export class CreateClientDto {
  @ApiProperty({
    description: "Nome do usuário",
    type: String,
    default: "Pedro Marcusso"
  })
  @IsString()
  @IsNotEmpty()
  fullName: string

  @ApiProperty()
  @IsString()
  @IsEmail()
  email: string

  @ApiProperty()
  @IsString()
  telephone: string

  @ApiProperty()
  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  @Transform(({value}: {value: string}) => hashSync(value, 10), {
    groups: ["transform"]
  })
  password: string
}
