import { Module } from '@nestjs/common';
import { ProductService } from './services/product/product.service';
import { ProductController } from './controllers/product/product.controller';

@Module({
  providers: [ProductService],
  controllers: [ProductController],
})
export class StoreModule {}
