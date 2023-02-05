import { Injectable } from '@nestjs/common';
import { Movie, Timeline } from '../graphql.schema';
import {
  MoviesNotFoundException,
  TimelinesNotFoundException,
} from './timelines.exceptions';
import { TimelinesRepository } from './timelines.repository';

@Injectable()
export class TimelinesService {
  constructor(private timelinesRepository: TimelinesRepository) {}

  private async getFirstItemsOfTimeline(timelineId: string): Promise<Movie[]> {
    const result = await this.timelinesRepository.getFirstItemsOfTimeline(
      timelineId,
    );

    if (!result.length) {
      throw new MoviesNotFoundException();
    }

    return result;
  }

  private async getItemsStartingFromGiveName(
    timelineId: string,
    movieId: string,
  ): Promise<Movie[]> {
    const result = await this.timelinesRepository.getItemsStartingFromGivenId(
      timelineId,
      movieId,
    );

    if (!result.length) {
      throw new MoviesNotFoundException();
    }

    return result;
  }

  async getTimeline(timelineId: string, movieId?: string): Promise<Movie[]> {
    if (!movieId) {
      return this.getFirstItemsOfTimeline(timelineId);
    }

    return this.getItemsStartingFromGiveName(timelineId, movieId);
  }

  async getTimelines(): Promise<Timeline[]> {
    const result = await this.timelinesRepository.getTimelines();

    if (!result.length) {
      throw new TimelinesNotFoundException();
    }

    return result;
  }
}
