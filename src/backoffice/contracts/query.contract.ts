import { Contract } from '../contract';
import { FluntValidator } from 'src/utils/flunt-validator';
import { Injectable } from '@nestjs/common';
import { QueryDto } from '../dtos/query.dto';

@Injectable()
export class QueryContract implements Contract {
  errors: any[];

  validate(model: QueryDto): boolean {
    const flunt = new FluntValidator();

    if (!model.query) {
      model.query = {};
    }

    flunt.isGreaterThan(model.take, 1000, 'Sua query não pode retornar mais que 1000 registros');

    this.errors = flunt.errors;

    return flunt.isValid();
  }
}
