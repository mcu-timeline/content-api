import { Module } from '@nestjs/common';
import { join } from 'path';

import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { TimelinesModule } from './timelines/timelines.module';
import { ConfigModule } from '@nestjs/config';
import { config } from './config';

@Module({
  imports: [
    TimelinesModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.schema.ts'),
      },
    }),
    ConfigModule.forRoot({
      load: [config],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
