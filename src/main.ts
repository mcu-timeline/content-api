import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Config } from './config';
import * as Sentry from '@sentry/node';
import { AllExceptionsFilter } from './exceptions/allExceptionsFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionsFilter());

  const configService = app.get(ConfigService<Config>);
  const port = configService.get('PORT', { infer: true });

  if (
    configService.get<string>('SENTRY_DSN') &&
    ['production', 'stage'].includes(
      configService.get<string>('NODE_ENV') || 'empty',
    )
  ) {
    Sentry.init({
      dsn: configService.get<string>('SENTRY_DSN'),
      environment: configService.get<string>('NODE_ENV'),
      tracesSampleRate: 1.0,
    });
  }

  /*
   * TODO: Enable auth guard before going prod.
   * app.useGlobalGuards(new JwtAuthGuard(configService));
   */
  await app.listen(port, async () => {
    console.log(`Server started on ${await app.getUrl()}`);
  });
}
bootstrap();
