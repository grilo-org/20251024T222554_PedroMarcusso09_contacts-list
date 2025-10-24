import {Exclude} from "class-transformer"
import {randomUUID} from "node:crypto"

export class Client {
  readonly id: string
  fullName: string
  email: string
  telephone: string

  @Exclude()
  password: string

  constructor() {
    this.id = randomUUID()
  }
}
