import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import {HttpExceptionFilter} from "./globalFilters/http-exception.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalFilters(new HttpExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('Count of Money')
    .setDescription('Keep informed and beat the coins')
    .setVersion('0.1')
    .build();

  app.enableCors(); // Active CORS pour toutes les origines
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(5000);
}
bootstrap();
