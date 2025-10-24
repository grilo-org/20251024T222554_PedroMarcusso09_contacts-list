import {Module} from "@nestjs/common"
import {ContactsModule} from "./src/modules/contacts/contacts.module"
import {ClientsModule} from "./src/modules/clients/clients.module"
import {AuthModule} from "./src/modules/auth/auth.module"

@Module({
  imports: [ContactsModule, ClientsModule, AuthModule],
  controllers: [],
  providers: []
})
export class AppModule {}
