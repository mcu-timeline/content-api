import { ArgumentsHost, Catch } from '@nestjs/common';
import * as Sentry from '@sentry/node';
import { BaseExceptionFilter } from '@nestjs/core';
import { GqlContextType } from '@nestjs/graphql';

import { Logger } from '../logger';

import { mapToGraphql } from './exceptionFilters';

const logger = new Logger();

function onError(exception: Error): void {
  logger.error(exception, exception.stack);

  Sentry.captureException(exception);
}

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  catch(exception: Error, host: ArgumentsHost): void {
    onError(exception);

    if (host.getType<GqlContextType>() === 'graphql') {
      throw mapToGraphql(exception);
    }
  }
}
