import { Controller, Get, Post, Put, Delete } from '@nestjs/common';

@Controller('v1/customers')
export class CustomerController {
  @Get()
  get(){
    return 'Return all customers';
  }

  @Post()
  post() {
    return 'Create a customer';
  }

  @Put()
  put() {
    return 'Update a customer';
  }

  @Delete()
  delete() {
    return 'Delete a customer';
  }
}
