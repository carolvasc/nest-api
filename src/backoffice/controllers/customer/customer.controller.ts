import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { Customer } from 'src/backoffice/models/customer.model';
import { Result } from 'src/backoffice/models/result.model';

@Controller('v1/customers')
export class CustomerController {
  @Get()
  get() {
    return new Result(null, null, [], true);
  }

  @Get(':document')
  getById(@Param('document') document: string) {
    return new Result(null, {}, null, true);
  }
  @Post()
  post(@Body() body: Customer) {
    return new Result('Cliente criado com sucesso!', body, [], true);
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
