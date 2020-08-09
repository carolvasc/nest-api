import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseInterceptors,
} from '@nestjs/common';
import { Customer } from 'src/backoffice/models/customer.model';
import { Result } from 'src/backoffice/models/result.model';
import { ValidatorInterceptor } from 'src/interceptors/validator.interceptor';
import { CreateCustomerContract } from 'src/backoffice/contracts/customer.contracts';
import { CreateCustomerDTO } from 'src/backoffice/dtos/create-customer-dto';
import { AccountService } from 'src/backoffice/services/account.service';
import { User } from 'src/backoffice/models/user.model';
import { CustomerService } from 'src/backoffice/services/customer.service';

@Controller('v1/customers')
export class CustomerController {
  constructor(
    private readonly accountService: AccountService,
    private readonly customerService: CustomerService,
  ) {}

  @Get()
  get() {
    return new Result(null, null, [], true);
  }

  @Get(':document')
  getById(@Param('document') document: string) {
    return new Result(null, {}, null, true);
  }
  @Post()
  @UseInterceptors(new ValidatorInterceptor(new CreateCustomerContract()))
  async post(@Body() model: CreateCustomerDTO) {
    // Criação do usuário
    const user = await this.accountService.create(
      new User(model.document, model.password, true),
    );

    // Criação do cliente
    const customer = new Customer(
      model.name,
      model.document,
      model.email,
      null,
      null,
      null,
      null,
      user,
    );
    const response = await this.customerService.create(customer);

    return new Result('Cliente criado com sucesso!', response, [], true);
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
