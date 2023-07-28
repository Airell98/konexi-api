import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { HttpExceptionFilter } from './libs/exceptions/http-exception.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: ['debug', 'log', 'verbose', 'warn', 'error'],
  });
  app.useGlobalFilters(new HttpExceptionFilter());
  app.use('/api/health-check', (_, res) => {
    res.json({
      status: 'OK',
      service: 'konexi-api',
      version: process.env.APP_VERSION,
    });
  });

  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  const config = new DocumentBuilder()
    .setTitle('Konexi Api Docs')
    .setDescription('Api documentation of Konexi API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('swagger', app, document);
  await app.listen(3000);
}
bootstrap();
