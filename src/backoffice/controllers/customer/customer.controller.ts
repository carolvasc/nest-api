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

@Controller('v1/customers')
export class CustomerController {
  @Get()
  get() {
    return 'Return all customers';
  }

  @Get(':document')
  getById(@Param('document') document: string) {
    return 'Return customer ' + document;
  }
  @Post()
  post(@Body() body: Customer) {
    return body;
  }

  @Put(':document')
  put(@Param('document') document: string, @Body() body: Customer) {
    return {
      customer: document,
      data: body,
    };
  }

  @Delete(':document')
  delete(@Param('document') document: string) {
    return 'Delete customer' + document;
  }
}
