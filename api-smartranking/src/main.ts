import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NotFoundExceptionFilter } from './exception-filters/not-found-exception-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: 422,
    }),
  );
  app.useGlobalFilters(new NotFoundExceptionFilter());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
