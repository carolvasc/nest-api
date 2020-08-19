import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductService } from 'src/store/services/product/product.service';
import { Result } from 'src/backoffice/models/result.model';
import { Product } from 'src/store/entities/product.entity';

@Controller('v1/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async get() {
    try {
      const products = await this.productService.get();

      return new Result(
        'Todos os produtos listados com sucesso.',
        products,
        [],
        true,
      );
    } catch (error) {
      throw new HttpException(
        new Result(
          'Não foi possível buscar todos os produtos.',
          null,
          error,
          false,
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post()
  async post(@Body() model: Product) {
    try {
      await this.productService.post(model);

      return new Result('Produto criado com sucesso.', model, [], true);
    } catch (error) {
      throw new HttpException(
        new Result('Não foi possível criar o produto', null, error, false),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put(':id')
  async put(@Param('id') id: number, @Body() model: Product) {
    try {
      await this.productService.put(id, model);

      return new Result('Produto atualizado com sucesso.', model, [], true);
    } catch (error) {
      throw new HttpException(
        new Result('Não foi possível atualizar o produto', null, error, false),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    try {
      await this.productService.delete(id);

      return new Result('Produto removido com sucesso.', null, [], true);
    } catch (error) {
      throw new HttpException(
        new Result('Não foi possível remover o produto', null, error, false),
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
