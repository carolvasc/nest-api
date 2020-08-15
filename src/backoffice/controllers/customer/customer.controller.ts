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
import { CreateCustomerDTO } from 'src/backoffice/dtos/customer/create-customer.dto';
import { AccountService } from 'src/backoffice/services/account.service';
import { User } from 'src/backoffice/models/user.model';
import { CustomerService } from 'src/backoffice/services/customer.service';
import { QueryDto } from 'src/backoffice/dtos/query.dto';
import { UpdateCustomerContract } from 'src/backoffice/contracts/customer/update-customer.contract';
import { UpdateCustomerDTO } from 'src/backoffice/dtos/customer/update-customer.dto';
import { CreateCreditCardContract } from 'src/backoffice/contracts/customer/create-credit-card.contract';
import { CreditCard } from 'src/backoffice/models/credit-card.model';

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

  @Put(':document')
  @UseInterceptors(new ValidatorInterceptor(new UpdateCustomerContract()))
  async update(@Param('document') document: string, @Body() model: UpdateCustomerDTO) {
    try {
      await this.customerService.update(document, model);

      return new Result('Cliente atualizado com sucesso!', model, [], true);
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

  @Delete(':document')
  delete() {
    return new Result('Cliente removido com sucesso!', {}, [], true);
  }

  @Post('query')
  async query(@Body() model: QueryDto) {
    const customers = await this.customerService.query(model);

    return new Result(null, customers, null, true);
  }

  @Post(':document/credit-cards')
  @UseInterceptors(new ValidatorInterceptor(new CreateCreditCardContract()))
  async createBilling(@Param('document') document: string, @Body() model: CreditCard) {
    try {
      await this.customerService.saveOrUpdateCreditCard(document, model);

      return new Result(
        'Cartão de crédito cadastrado com sucesso!',
        model,
        [],
        true,
      );
    } catch (error) {
      throw new HttpException(
        new Result(
          'Não foi possível adicionar cartão de crédito',
          null,
          error,
          false,
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
