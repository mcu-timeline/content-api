import { Query, Resolver, Args, ResolveReference } from '@nestjs/graphql';

import { Movie } from '../graphql.schema';
import { TimelinesService } from './timelines.service';

@Resolver('timelines')
export class TimelinesResolver {
  constructor(private readonly timelinesService: TimelinesService) {}

  @Query('timeline')
  async getTimeline(
    @Args('currentlyWatching') currentlyWatching: string,
  ): Promise<Movie[]> {
    return this.timelinesService.getTimeline(currentlyWatching);
  }

  @ResolveReference()
  resolveReference(reference: {
    __typename: string;
    currentlyWatching: string;
  }) {
    return this.timelinesService.getTimeline(reference.currentlyWatching);
  }
}
