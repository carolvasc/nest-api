// Modules
import { Module, CacheModule, HttpModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
// Schemas
import { UserSchema } from './schemas/user.schema';
import { CustomerSchema } from './schemas/customer.schema';
// Services
import { PetService } from './services/pet.service';
import { AddressService } from './services/address.service';
import { AccountService } from './services/account.service';
import { CustomerService } from './services/customer.service';
import { AuthService } from 'src/shared/services/auth/auth.service';
// Controllers
import { PetController } from './controllers/pet/pet.controller';
import { AddressController } from './controllers/address/address.controller';
import { CustomerController } from './controllers/customer/customer.controller';
import { AccountController } from './controllers/account/account.controller';
// Strategies
import { JwtStrategy } from 'src/shared/strategies/jwt.strategy';

@Module({
  imports: [
    HttpModule,
    CacheModule.register(),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrPrivateKey: '54147f5ce0d2',
      signOptions: {
        expiresIn: 3600,
      },
    }),
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
  controllers: [
    CustomerController,
    AddressController,
    PetController,
    AccountController,
  ],
  providers: [
    AccountService,
    CustomerService,
    AddressService,
    PetService,
    AuthService,
    JwtStrategy,
  ],
})
export class BackofficeModule {}
