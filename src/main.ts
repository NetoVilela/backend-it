import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { resolve } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: process.env.ORIGIN_CORS,
    credentials: true,
  });
  app.useStaticAssets(
    resolve(__dirname, '..', 'public', 'attachments', 'users'),
    {
      prefix: '/attachments/users',
      index: false,
      setHeaders: (res) => {
        res.setHeader('Cache-Control', 'public, max-age=31536000');
      },
    },
  );
  await app.listen(3000);
}
bootstrap();
