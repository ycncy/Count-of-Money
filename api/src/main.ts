import {NestFactory} from '@nestjs/core';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';
import {AppModule} from './app.module';
import {HttpExceptionFilter} from './global-filter/http-exception.filter';
import * as cookieParser from "cookie-parser";
import {TypeormExceptionFilter} from "./global-filter/typeorm-exception.filter";


async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix('api');
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalFilters(new TypeormExceptionFilter());

    app.use(cookieParser());

    const config = new DocumentBuilder()
        .setTitle('Count of Money')
        .setDescription('Keep informed and beat the coins')
        .setVersion('0.1')
        .build();

    app.enableCors(
        {
            credentials: true,
            origin: 'http://localhost:3000',
        }
    );
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);

    await app.listen(5000);
}

bootstrap();
