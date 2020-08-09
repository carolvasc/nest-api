import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BackofficeModule } from './backoffice/backoffice.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://carolvasc:carolvasc@petshop.avlcr.mongodb.net/petshop?retryWrites=true&w=majority',
    ),
    BackofficeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
