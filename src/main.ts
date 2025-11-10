import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config as dotenvConfig } from 'dotenv';
import * as express from 'express';

dotenvConfig();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const appVersion = configService.get<string>('APP_VERSION') || '1.0.0';

  app.setGlobalPrefix('api/v1');

  app.enableCzors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Content-Disposition',
      'Accept',
      'Accept-Language',
      'Authorization',
      'Cache-control',
      'If-None-Match',
      'Access-Control-Allow-Origin',
    ],
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: false,
    }),
  );

  app.use(
    express.json({
      verify: (req: any, _res, buf) => {
        req.rawBody = buf;
      },
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('MedMall-V1')
    .setDescription('API description')
    .setVersion(appVersion)
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        in: 'header',
        name: 'Authorization',
        description: 'Firebase ID token (format: Bearer <token>)',
      },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/v1/documentation', app, document);

  const port = process.env.APP_PORT || '3000';
  await app.listen(port);

  console.log(` Server is running locally on: http://localhost:${port}`);
  console.log(` Swagger Docs:http://localhost:${port}/api/v1/documentation`);
  console.log(` API Base URL:http://localhost:${port}/api/v1`);
}

bootstrap();
