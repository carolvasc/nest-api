import {
  Controller,
  Get,
  Param,
  HttpException,
  HttpStatus,
  Post,
  Body,
} from '@nestjs/common';
import { OrderService } from 'src/store/services/order/order.service';
import { OrderItemService } from 'src/store/services/order-item/order-item.service';
import { ProductService } from 'src/store/services/product/product.service';
import { Result } from 'src/backoffice/models/result.model';
import { OrderItemDTO } from 'src/store/dtos/order-item.dto';
import { Order } from 'src/store/entities/order.entity';
import { OrderItem } from 'src/store/entities/order-item.entity';

@Controller('v1/order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly orderItemService: OrderItemService,
    private readonly productService: ProductService,
  ) {}

  @Get(':order')
  async get(@Param('order') order: string) {
    try {
      const orders = await this.orderService.getByNumber(order);

      return new Result('Pedido retornado com sucesso!', orders, [], true);
    } catch (error) {
      throw new HttpException(
        new Result('Não foi possível retornar o pedido', null, error, false),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get(':customer')
  async getByCustomer(@Param('customer') customer: string) {
    try {
      const orders = await this.orderService.getByCustomer(customer);

      return new Result('Pedido retornado com sucesso!', orders, [], true);
    } catch (error) {
      throw new HttpException(
        new Result('Não foi possível retornar o pedido', null, error, false),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post()
  async create(@Body() model: OrderItemDTO[]) {
    try {
      let order = new Order();
      order.customer = '12345678974';
      order.date = new Date();
      order.number = '1B2D3F6';
      order.items = [];
      await this.orderService.create(order);

      for (const item of model) {
        let product = await this.productService.getById(item.product);
        let orderItem = new OrderItem();
        orderItem.order = order;
        orderItem.product = product;
        orderItem.price = product.price;
        orderItem.quantity = item.quantity;
        await this.orderItemService.create(orderItem);
      }

      return new Result('Pedido efetuado com sucesso!', model, [], true);
    } catch (error) {
      throw new HttpException(
        new Result('Não foi possível efetuar o pedido', null, error, false),
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
