import { ExecutionContext, Injectable } from '@nestjs/common';

import { verify } from 'jsonwebtoken';
import * as jwksClient from 'jwks-rsa';
import { ConfigService } from '@nestjs/config';

import { Config } from './config';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class JwtAuthGuard {
  constructor(private configService: ConfigService<Config>) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const headers = ctx?.getArgByIndex(2)?.req?.headers;

    if (!headers) {
      return false;
    }

    const token = headers.authorization?.replace('Bearer', '').trim();

    if (!token) {
      return false;
    }

    const client = jwksClient({
      jwksUri: `${this.configService.get(
        'AUTH0_ISSUER_URL',
      )}.well-known/jwks.json`,
    });

    const getKey = (header, callback): void => {
      client.getSigningKey(
        header.kid,
        (error: Error, key: jwksClient.RsaSigningKey) => {
          const signingKey = key.getPublicKey() || key.rsaPublicKey;
          callback(null, signingKey);
        },
      );
    };

    const decodedTokenPromise = new Promise((resolve, reject) => {
      verify(
        token,
        getKey,
        {
          audience: this.configService.get('AUTH0_AUDIENCE'),
          issuer: this.configService.get('AUTH0_ISSUER_URL'),
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

    return !!decodedToken;
  }
}
