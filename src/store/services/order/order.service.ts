import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItem } from 'src/store/entities/order-item.entity';
import { Order } from 'src/store/entities/order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private readonly repository: Repository<Order>,
  ) {}

  async getByNumber(number: string): Promise<Order> {
    return await this.repository.findOne({ number });
  }

  async getByCustomer(customer: string): Promise<Order[]> {
    return await this.repository.find({ customer });
  }

  async create(order: Order) {
    await this.repository.save(order);
  }
}
