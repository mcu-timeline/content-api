import { Query, Resolver, Args, ResolveReference } from '@nestjs/graphql';

import { Movie, Timeline } from '../graphql.schema';
import { TimelinesService } from './timelines.service';

@Resolver('timelines')
export class TimelinesResolver {
  constructor(private readonly timelinesService: TimelinesService) {}

  @Query('timeline')
  async getTimeline(
    @Args('timeline') timeline: string,
    @Args('currentlyWatching') currentlyWatching: string,
  ): Promise<Movie[]> {
    return this.timelinesService.getTimeline(timeline, currentlyWatching);
  }

  @ResolveReference()
  resolveGetTimelineReference(reference: {
    __typename: string;
    timeline: string;
    currentlyWatching: string;
  }) {
    return this.timelinesService.getTimeline(
      reference.timeline,
      reference.currentlyWatching,
    );
  }

  @Query('timelines')
  async getTimelines(): Promise<Timeline[]> {
    return this.timelinesService.getTimelines();
  }

  @ResolveReference()
  resolveGetTimelinesReference() {
    return this.timelinesService.getTimelines();
  }
}
