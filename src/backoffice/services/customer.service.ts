import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from '../models/customer.model';
import { QueryDto } from '../dtos/query.dto';
import { UpdateCustomerDTO } from '../dtos/customer/update-customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel('Customer') private readonly model: Model<Customer>,
  ) {}

  async create(data: Customer): Promise<Customer> {
    const customer = new this.model(data);
    return await customer.save();
  }

  async update(document: string, data: UpdateCustomerDTO): Promise<Customer> {
    return await this.model.findOneAndUpdate({ document }, data);
  }

  async findAll(): Promise<Customer[]> {
    return await this.model
      .find({}, 'name email document')
      .sort('name')
      .exec();
  }

  async find(document: string): Promise<Customer> {
    return await this.model
      .find({ document })
      .populate('user', 'username')
      .exec();
  }

  // NOTE: Codigo comentado a fim de estudos (ele foi refatorado em outra classe)
  // async addBillingAddress(document: string, data: Address): Promise<Customer> {
  //   const options = { upsert: true }; // Se não houver endereço ele vai criar um, se existir ele vai atualizar
  //   return await this.model.findOneAndUpdate(
  //     { document },
  //     {
  //       $set: {
  //         billingAddress: data,
  //       },
  //     },
  //     options,
  //   );
  // }

  // async addShippingAddress(document: string, data: Address): Promise<Customer> {
  //   const options = { upsert: true };
  //   return await this.model.findOneAndUpdate(
  //     { document },
  //     {
  //       $set: {
  //         shippingAddress: data,
  //       },
  //     },
  //     options,
  //   );
  // }

  // TODO: Criar um contrato para definir o take como o valor maximo de registros da tabela
  async query(model: QueryDto): Promise<Customer[]> {
    return await this.model
      .find(model.query, model.fields, { skip: model.skip, limit: model.take })
      .sort(model.sort)
      .exec();
  }
}
