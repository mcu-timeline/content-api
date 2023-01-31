import { Injectable } from '@nestjs/common';
import { Movie } from '../graphql.schema';
import { MoviesNotFoundException } from './timelines.exceptions';
import { TimelinesRepository } from './timelines.repository';

@Injectable()
export class TimelinesService {
  constructor(private timelinesRepository: TimelinesRepository) {}

  private async getFirstItemsOfTimeline(): Promise<Movie[]> {
    const result = await this.timelinesRepository.getFirstItemsOfTimeline(
      'Full',
    );

    if (!result.length) {
      throw new MoviesNotFoundException();
    }

    return result;
  }

  private async getItemsStartingFromGiveName(
    movieId: string,
  ): Promise<Movie[]> {
    const result = await this.timelinesRepository.getItemsStartingFromGivenId(
      'Full',
      movieId,
    );

    if (!result.length) {
      throw new MoviesNotFoundException();
    }

    return result;
  }

  async getTimeline(movieId?: string): Promise<Movie[]> {
    if (!movieId) {
      return this.getFirstItemsOfTimeline();
    }

    return this.getItemsStartingFromGiveName(movieId);
  }
}
