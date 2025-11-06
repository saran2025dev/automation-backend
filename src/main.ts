import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.setGlobalPrefix('api/v1');

  const config = new DocumentBuilder()
    .setTitle('Automation API')
    .setDescription('API for managing automation processes')
    .setVersion('1.0')
    .addServer('/api/v1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1/documentation', app, document);

  const port = Number(process.env.APP_PORT) || 3001;

  await app.listen(port, '0.0.0.0');

  const baseUrl = `http://localhost:${port}`;
  console.log(`Swagger: ${baseUrl}/api/v1/documentation`);
  console.log(`API Base: ${baseUrl}/api/v1`);
}
bootstrap();
