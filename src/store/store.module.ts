import { Module } from '@nestjs/common';
import { ProductService } from './services/product/product.service';
import { ProductController } from './controllers/product/product.controller';
import { OrderService } from './services/order/order.service';
import { OrderItemService } from './services/order-item/order-item.service';
import { OrderController } from './controllers/order/order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Product } from './entities/product.entity';
import { OrderItem } from './entities/order-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Order, OrderItem])],
  providers: [ProductService, OrderService, OrderItemService],
  controllers: [ProductController, OrderController],
})
export class StoreModule {}
