import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Automation API')
    .setDescription('API for managing automation processes')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1/documentation', app, document);

  await app.listen(process.env.PORT ?? 3000);
  console.log(`http://localhost:${process.env.PORT}`);
  console.log(`http://localhost:${process.env.PORT}/api/v1/documentation`);
}
bootstrap();
