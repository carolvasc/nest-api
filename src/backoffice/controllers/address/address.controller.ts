import {
  Controller,
  Post,
  UseInterceptors,
  Param,
  Body,
  HttpStatus,
  HttpException,
  Get,
} from '@nestjs/common';
import { ValidatorInterceptor } from 'src/interceptors/validator.interceptor';
import { CreateAddressContract } from 'src/backoffice/contracts/address/create-address.contract';
import { Result } from 'src/backoffice/models/result.model';
import { Address } from 'src/backoffice/models/address.model';
import { AddressType } from 'src/backoffice/enums/address-type.enum';
import { AddressService } from 'src/backoffice/services/address.service';

@Controller('v1/addresses')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post(':document/billing')
  @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
  async addBillingAddress(
    @Param('document') document: string,
    @Body() model: Address,
  ) {
    try {
      await this.addressService.create(document, model, AddressType.Billing);

      return new Result('Endereço cadastrado com sucesso!', model, [], true);
    } catch (error) {
      throw new HttpException(
        new Result('Não foi possível adicionar o endereço', null, error, false),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post(':document/shipping')
  @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
  async addShippingAddress(
    @Param('document') document: string,
    @Body() model: Address,
  ) {
    try {
      await this.addressService.create(document, model, AddressType.Shipping);

      return new Result('Endereço cadastrado com sucesso!', model, [], true);
    } catch (error) {
      throw new HttpException(
        new Result('Não foi possível adicionar o endereço', null, error, false),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('search/:zipcode')
  async search(@Param('zipcode') zipcode) {
    try {
      const response = await this.addressService
        .getAddressByZipCode(zipcode)
        .toPromise();

      return new Result(null, response.data, [], true);
    } catch (error) {
      throw new HttpException(
        new Result(null, null, error, false),
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
