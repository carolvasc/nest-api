import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseInterceptors,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Customer } from 'src/backoffice/models/customer.model';
import { Result } from 'src/backoffice/models/result.model';
import { ValidatorInterceptor } from 'src/interceptors/validator.interceptor';
import { CreateCustomerContract } from 'src/backoffice/contracts/customer/create-customer.contract';
import { CreateCustomerDTO } from 'src/backoffice/dtos/create-customer-dto';
import { AccountService } from 'src/backoffice/services/account.service';
import { User } from 'src/backoffice/models/user.model';
import { CustomerService } from 'src/backoffice/services/customer.service';
import { Address } from 'src/backoffice/models/address.model';
import { CreateAddressContract } from 'src/backoffice/contracts/customer/create-address.contract';
import { CreatePetContract } from 'src/backoffice/contracts/customer/create-pet.contract';
import { Pet } from 'src/backoffice/models/pet.model';

@Controller('v1/customers')
export class CustomerController {
  constructor(
    private readonly accountService: AccountService,
    private readonly customerService: CustomerService,
  ) {}

  @Get()
  async getAll() {
    const customers = await this.customerService.findAll();

    return new Result(null, customers, [], true);
  }

  @Get(':document')
  async getById(@Param('document') document: string) {
    const customer = await this.customerService.find(document);

    return new Result(null, customer, null, true);
  }

  @Post()
  @UseInterceptors(new ValidatorInterceptor(new CreateCustomerContract()))
  async post(@Body() model: CreateCustomerDTO) {
    try {
      // Criação do usuário
      const user = await this.accountService.create(
        new User(model.document, model.password, true),
      );

      // Criação do cliente
      const customer = new Customer(
        model.name,
        model.document,
        model.email,
        [],
        null,
        null,
        null,
        user,
      );
      const response = await this.customerService.create(customer);

      return new Result('Cliente criado com sucesso!', response, [], true);
    } catch (error) {
      throw new HttpException(
        new Result(
          'Não foi possível realizar seu cadastro',
          null,
          error,
          false,
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post(':document/addresses/billing')
  @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
  async addBillingAddress(
    @Param('document') document: string,
    @Body() model: Address,
  ) {
    try {
      await this.customerService.addBillingAddress(document, model);

      return new Result('Endereço cadastrado com sucesso!', model, [], true);
    } catch (error) {
      throw new HttpException(
        new Result('Não foi possível adicionar o endereço', null, error, false),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post(':document/addresses/shipping')
  @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
  async addShippingAddress(
    @Param('document') document: string,
    @Body() model: Address,
  ) {
    try {
      await this.customerService.addShippingAddress(document, model);

      return new Result('Endereço cadastrado com sucesso!', model, [], true);
    } catch (error) {
      throw new HttpException(
        new Result('Não foi possível adicionar o endereço', null, error, false),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post(':document/pets')
  @UseInterceptors(new ValidatorInterceptor(new CreatePetContract()))
  async createPet(@Param('document') document: string, @Body() model: Pet) {
    try {
      await this.customerService.createPet(document, model);

      return new Result('Seu pet adicionado com sucesso!', model, [], true);
    } catch (error) {
      throw new HttpException(
        new Result('Não foi possível criar seu pet', null, error, false),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put(':document/pets/:id')
  @UseInterceptors(new ValidatorInterceptor(new CreatePetContract()))
  async updatePet(
    @Param('document') document: string,
    @Param('id') id: string,
    @Body() model: Pet,
  ) {
    try {
      await this.customerService.updatePet(document, id, model);

      return new Result('Seu pet foi atualizado com sucesso!', model, [], true);
    } catch (error) {
      throw new HttpException(
        new Result('Não foi possível atualizar seu pet', null, error, false),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put(':document')
  put(@Param('document') document: string, @Body() body: Customer) {
    return new Result('Cliente atualizado com sucesso!', body, [], true);
  }

  @Delete(':document')
  delete(@Param('document') document: string) {
    return new Result('Cliente removido com sucesso!', {}, [], true);
  }
}
