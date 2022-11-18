import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';

import { Movie } from '../graphql.schema';
import { TimelinesGuard } from './timelines.guard';
import { TimelinesService } from './timelines.service';

@Resolver('timelines')
export class TimelinesResolver {
  constructor(private readonly timelinesService: TimelinesService) {}

  @Query('timeline')
  @UseGuards(TimelinesGuard)
  async getRates(): Promise<Movie[]> {
    return this.timelinesService.getTimeline();
  }
}
