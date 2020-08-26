import { Model } from 'mongoose';
import { Injectable, HttpService } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Address } from '../models/address.model';
import { Customer } from '../models/customer.model';
import { AddressType } from '../enums/address-type.enum';

@Injectable()
export class AddressService {
  constructor(
    @InjectModel('Customer') private readonly model: Model<Customer>,
    private readonly httpService: HttpService,
  ) {}

  async create(
    document: string,
    data: Address,
    type: AddressType,
  ): Promise<Customer> {
    // Se não houver endereço ele vai criar um, se existir ele vai atualizar
    const options = { upsert: true };

    // Verifica se é endereço de cobrança ou de destino
    if (type == AddressType.Billing) {
      return await this.model.findOneAndUpdate(
        { document },
        {
          $set: {
            billingAddress: data,
          },
        },
        options,
      );
    } else {
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
  }

  getAddressByZipCode(zipCode: string) {
    const url = `https://viacep.com.br/ws/${zipCode}/json/`;

    return this.httpService.get(url);
  }
}
