import { Contract } from '../contract';
import { FluntValidator } from 'src/utils/flunt-validator';
import { Injectable } from '@nestjs/common';
import { UpdateCustomerDTO } from 'src/backoffice/dtos/customer/update-customer.dto';

@Injectable()
export class UpdateCustomerContract implements Contract {
  errors: any[];

  validate(model: UpdateCustomerDTO): boolean {
    const flunt = new FluntValidator();

    flunt.hasMinLen(model.name, 5, 'Nome inválido');

    this.errors = flunt.errors;

    return flunt.isValid();
  }
}
