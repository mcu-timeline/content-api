import { ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GqlExecutionContext } from '@nestjs/graphql';
import { GetPublicKeyOrSecret, verify } from 'jsonwebtoken';
import * as jwksClient from 'jwks-rsa';

import { Config } from './config';
import { AuthContext, isJWTPayload } from './auth.types';

export class AuthorizationException extends Error {
  constructor() {
    super('User is not authorized to access this resource');
  }
}

@Injectable()
export class JwtAuthGuard {
  constructor(private configService: ConfigService<Config>) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext<AuthContext>();
    const headers = ctx.req?.headers;

    if (!headers) {
      return false;
    }

    const token = headers.authorization?.replace('Bearer', '').trim();

    if (!token) {
      return false;
    }

    const client = jwksClient({
      jwksUri: `${this.configService.get('AUTH0_ISSUER_URL', {
        infer: true,
      })}.well-known/jwks.json`,
    });

    const getKey: GetPublicKeyOrSecret = (header, callback): void => {
      client.getSigningKey(
        header.kid,
        (error: Error, key: jwksClient.RsaSigningKey) => {
          const signingKey = key.getPublicKey() || key.rsaPublicKey;
          callback(null, signingKey);
        },
      );
    };

    try {
      const decodedTokenPromise = new Promise((resolve, reject) => {
        verify(
          token,
          getKey,
          {
            audience: this.configService.get('AUTH0_AUDIENCE', { infer: true }),
            issuer: this.configService.get('AUTH0_ISSUER_URL', { infer: true }),
            algorithms: ['RS256'],
          },
          (error, decoded) => {
            if (error) {
              reject(error);
            }
            if (decoded) {
              resolve(decoded);
            }
          },
        );
      });

      const decodedToken = await decodedTokenPromise;

      if (isJWTPayload(decodedToken)) {
        ctx.userId = decodedToken.sub;
        return true;
      }

      return false;
    } catch (error) {
      throw new AuthorizationException();
    }
  }
}
