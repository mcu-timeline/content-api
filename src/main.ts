import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Config } from './config';
import { JwtAuthGuard } from './auth.guard'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get(ConfigService<Config>);
  const port = configService.get('PORT');

  app.useGlobalGuards(new JwtAuthGuard(configService));

  await app.listen(port, async () => {
    console.log(`Server started on ${await app.getUrl()}`);
  });
}
bootstrap();
