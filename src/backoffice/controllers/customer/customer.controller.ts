import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';

@Controller('v1/customers')
export class CustomerController {
  @Get()
  get() {
    return 'Return all customers';
  }

  @Get(':document')
  getById(@Param('document') document) {
    return 'Return customer ' + document;
  }
  @Post()
  post(@Body() body) {
    return body;
  }

  // TODO: Melhorar passagem de parametros
  @Put(':document')
  put(@Param('document') document, @Body() body) {
    return {
      customer: document,
      data: body,
    };
  }

  @Delete(':document')
  delete(@Param('document') document) {
    return 'Delete customer' + document;
  }
}
