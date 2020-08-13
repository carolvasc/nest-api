import { Module } from '@nestjs/common';
import { PetController } from './controllers/pet/pet.controller';
import { AddressController } from './controllers/address/address.controller';
import { CustomerController } from './controllers/customer/customer.controller';
import { CustomerSchema } from './schemas/customer.schema';
import { UserSchema } from './schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { PetService } from './services/pet.service';
import { AddressService } from './services/address.service';
import { AccountService } from './services/account.service';
import { CustomerService } from './services/customer.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Customer',
        schema: CustomerSchema,
      },
      {
        name: 'User',
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [CustomerController, AddressController, PetController],
  providers: [AccountService, CustomerService, AddressService, PetService],
})
export class BackofficeModule {}
