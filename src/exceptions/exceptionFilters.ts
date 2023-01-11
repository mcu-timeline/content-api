import {
  AuthorizationException,
  ExternalException,
  ExternalExceptionCode,
  FailedToExecuteQueryException,
  MoviesNotFoundException,
} from './exceptions';

export const mapToGraphql = (exception: Error): Error => {
  switch (true) {
    case exception instanceof MoviesNotFoundException:
      return new ExternalException(exception.message, {
        errorCode: ExternalExceptionCode.NotFound,
      });
    case exception instanceof FailedToExecuteQueryException: {
      return new ExternalException(exception.message, {
        errorCode: ExternalExceptionCode.Default,
      });
    }
    case exception instanceof AuthorizationException: {
      return new ExternalException(exception.message, {
        errorCode: ExternalExceptionCode.NotAuthenticated,
      });
    }
  }
};
