import { Contract } from '../contract';
import { FluntValidator } from 'src/utils/flunt-validator';
import { Injectable } from '@nestjs/common';
import { CreditCard } from 'src/backoffice/models/credit-card.model';

@Injectable()
export class CreateCreditCardContract implements Contract {
  errors: any[];

  validate(model: CreditCard): boolean {
    const flunt = new FluntValidator();

    flunt.hasMinLen(model.holder, 5, 'Nome no cartão está inválido');
    flunt.isEmail(model.number, 'Número do cartão está inválido');
    flunt.isFixedLen(model.expiration, 4, 'Data de expiração do cartão inválida');

    this.errors = flunt.errors;

    return flunt.isValid();
  }
}
