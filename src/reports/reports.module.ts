import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsResolver } from './resolvers/report.resolver';

@Module({
  providers: [ReportsService, ReportsResolver]
})
export class ReportsModule {}
