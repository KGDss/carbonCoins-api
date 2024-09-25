import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip unrecognized properties
      forbidNonWhitelisted: true, // Throw an error if unrecognized properties are included
      transform: true, // Automatically transform payloads to DTO instances
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Carbon Coins API')
    .setDescription('Carbon Coins system api documentation')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
