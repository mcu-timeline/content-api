import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Config } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get(ConfigService<Config>);
  const port = configService.get('PORT', { infer: true });

  /*
   * TODO: Enable auth guard before going prod.
   * app.useGlobalGuards(new JwtAuthGuard(configService));
   */
  await app.listen(port, async () => {
    console.log(`Server started on ${await app.getUrl()}`);
  });
}
bootstrap();
