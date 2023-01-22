import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Neo4jClient } from 'src/neo4j';
import { TimelinesRepository } from './timelines.repository';
import { TimelinesResolver } from './timelines.resolver';
import { TimelinesService } from './timelines.service';

@Module({
  imports: [],
  providers: [
    TimelinesResolver,
    TimelinesService,
    TimelinesRepository,
    Neo4jClient,
    ConfigService,
  ],
})
export class TimelinesModule {}
