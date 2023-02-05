import { Injectable } from '@nestjs/common';

import { Neo4jClient } from '../neo4j';
import { Movie, Timeline } from '../graphql.schema';
import { DBMovie, DBTimeline } from './timelines.types';
import { MoviesNotFoundException } from './timelines.exceptions';
import {
  GET_FIRST_MOVIES,
  GET_MOVIES_BY_ID,
  GET_TIMELINES,
} from './timelines.queries';

@Injectable()
export class TimelinesRepository {
  constructor(private neo4j: Neo4jClient) {}

  private mapResults = (movies: DBMovie[]): Movie[] =>
    movies.map((movie) => ({
      id: movie.id,
      title: movie.title,
      duration: movie.duration,
      tags: movie.tags.split(', '),
      image: movie.image,
      imageHero: movie.imageHero,
      imageCenter: movie.imageCenter,
      description: movie.description,
      note: movie.note,
      characters: movie.characters.map((character, index) => ({
        name: character,
        image: movie.charactersImages[index],
      })),
    }));

  async getFirstItemsOfTimeline(timelineId: string): Promise<Movie[]> {
    const result = await this.neo4j.query<{ timelineId: string }, DBMovie>(
      GET_FIRST_MOVIES,
      { timelineId },
    );

    if (!result) {
      throw new MoviesNotFoundException();
    }

    return this.mapResults(result);
  }

  async getItemsStartingFromGivenId(
    timelineId: string,
    movieId: string,
  ): Promise<Movie[]> {
    const result = await this.neo4j.query<
      { timelineId: string; id: string },
      DBMovie
    >(GET_MOVIES_BY_ID, { timelineId, id: movieId });

    if (!result) {
      throw new MoviesNotFoundException();
    }

    return this.mapResults(result);
  }

  async getTimelines(): Promise<Timeline[]> {
    const result = await this.neo4j.query<null, DBTimeline>(
      GET_TIMELINES,
      null,
    );

    if (!result) {
      throw new MoviesNotFoundException();
    }

    return result;
  }
}
