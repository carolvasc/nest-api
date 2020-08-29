import { Resolver, Args, Query } from '@nestjs/graphql';
import { ReportsService } from '../reports.service';
import { Product } from '../models/product.model';
import { ProductArgs } from '../dtos/product-args.dto';

@Resolver(of => Product)
export class ReportsResolver {
  constructor(private readonly service: ReportsService) {}

  @Query(returns => Product)
  async product(@Args('id') id: string): Promise<Product> {
    return await this.service.findOneById(id);
  }

  @Query(returns => [Product])
  async products(@Args() args: ProductArgs): Promise<Product[]> {
    return await this.service.findAll(args);
  }
}
