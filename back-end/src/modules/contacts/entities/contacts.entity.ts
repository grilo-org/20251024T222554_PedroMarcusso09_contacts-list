import {randomUUID} from "node:crypto"

export class Contact {
  readonly id: string
  fullName: string
  email: string
  telephone: string
  createdAt: string
  clientId?: string

  constructor() {
    this.id = randomUUID()
  }
}
