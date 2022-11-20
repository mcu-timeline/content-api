import { Module } from '@nestjs/common';
import { Neo4jClient } from 'src/neo4j';
import { TimelinesResolver } from './timelines.resolver';
import { TimelinesService } from './timelines.service';

@Module({
  imports: [],
  providers: [TimelinesResolver, TimelinesService, Neo4jClient],
})
export class TimelinesModule {}
