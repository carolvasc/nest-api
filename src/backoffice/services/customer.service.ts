import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from '../models/customer.model';
import { Address } from '../models/address.model';
import { Pet } from '../models/pet.model';
import { QueryDto } from '../dtos/query.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel('Customer') private readonly model: Model<Customer>,
  ) {}

  async create(data: Customer): Promise<Customer> {
    const customer = new this.model(data);
    return await customer.save();
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

  async addBillingAddress(document: string, data: Address): Promise<Customer> {
    const options = { upsert: true }; // Se não houver endereço ele vai criar um, se existir ele vai atualizar
    return await this.model.findOneAndUpdate(
      { document },
      {
        $set: {
          billingAddress: data,
        },
      },
      options,
    );
  }

  async addShippingAddress(document: string, data: Address): Promise<Customer> {
    const options = { upsert: true };
    return await this.model.findOneAndUpdate(
      { document },
      {
        $set: {
          shippingAddress: data,
        },
      },
      options,
    );
  }

  async createPet(document: string, data: Pet): Promise<Customer> {
    const options = { upsert: true, new: true };
    return await this.model.findOneAndUpdate(
      { document },
      {
        $push: {
          pets: data,
        },
      },
      options,
    );
  }

  async updatePet(document: string, id: string, data: Pet): Promise<Customer> {
    return await this.model.findOneAndUpdate(
      { document, 'pets._id': id },
      {
        $set: {
          'pets.$': data,
        },
      },
    );
  }

  // TODO: Criar um contrato para definir o take como o valor maximo de registros da tabela
  async query(model: QueryDto): Promise<Customer[]> {
    return await this.model
      .find(model.query, model.fields, { skip: model.skip, limit: model.take })
      .sort(model.sort)
      .exec();
  }
}
