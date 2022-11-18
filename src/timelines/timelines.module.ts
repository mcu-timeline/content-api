import { Module } from '@nestjs/common';
import { TimelinesResolver } from './timelines.resolver';
import { TimelinesService } from './timelines.service';

@Module({
  imports: [],
  providers: [TimelinesResolver, TimelinesService],
})
export class TimelinesModule {}
