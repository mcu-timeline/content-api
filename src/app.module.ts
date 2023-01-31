import { join } from 'path';

import { Module } from '@nestjs/common';

import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';

import { TimelinesModule } from './timelines/timelines.module';
import { config } from './config';
import { EditorModule } from './editor';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(__dirname, 'graphql.schema.ts'),
      },
    }),
    ConfigModule.forRoot({
      load: [config],
    }),
    TimelinesModule,
    EditorModule,
  ],
  controllers: [],
})
export class AppModule {}
