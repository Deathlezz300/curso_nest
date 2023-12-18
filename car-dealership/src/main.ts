import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import type {NestExpressApplication} from '@nestjs/platform-express'
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  app.setGlobalPrefix("api");

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist:true,
      forbidNonWhitelisted:true,
      transform:true
    })
  )

  await app.listen(8000);
}
bootstrap();
