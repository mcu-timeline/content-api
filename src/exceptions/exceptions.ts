import { ApolloError } from 'apollo-server-express';

export enum ExternalExceptionCode {
  'Default' = 500,
  'ValidationError' = 400,
  'NotAuthenticated' = 401,
  'InvalidCredentials' = 402,
  'Unauthorized' = 403,
  'NotFound' = 404,
}

export class ExternalException extends ApolloError {
  constructor(
    message: string,
    extensions: { errorCode: ExternalExceptionCode },
  ) {
    super(message, 'INTERNAL_SERVER_ERROR', extensions);
  }
}

export { MoviesNotFoundException } from '../timelines/timelines.exceptions';
export { FailedToExecuteQueryException } from '../neo4j/neo4j.exceptions';
export { AuthorizationException } from '../auth.guard';
