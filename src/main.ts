import { NestFactory } from '@nestjs/core';
import * as compression from 'compression';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { CustomLoggerService } from './shared/services/custom-logger/custom-logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new CustomLoggerService(),
  });
  app.use(compression());

  // Open API (Swagger)
  const options = new DocumentBuilder()
    .setTitle('Petshop API')
    .setDescription('API do curso 7180 do Balta.io')
    .setVersion('1.0.0')
    .addTag('petshop')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);
  
  await app.listen(3000);
}
bootstrap();
