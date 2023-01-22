import { Injectable } from '@nestjs/common';

import { Neo4jClient } from '../neo4j';
import { Movie } from '../graphql.schema';
import { DBMovie } from './timelines.types';
import { MoviesNotFoundException } from './timelines.exceptions';
import { GET_FIRST_MOVIES, GET_MOVIES_BY_ID } from './timelines.queries';

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
      description: movie.description,
      note: movie.note,
      characters: movie.characters.map((character, index) => ({
        name: character,
        image: movie.charactersImages[index],
      })),
    }));

  async getFirstItemsOfTimeline(timeline: string): Promise<Movie[]> {
    const result = await this.neo4j.query<{ timeline: string }, DBMovie>(
      GET_FIRST_MOVIES,
      { timeline },
    );

    if (!result) {
      throw new MoviesNotFoundException();
    }

    return this.mapResults(result);
  }

  async getItemsStartingFromGivenId(
    timeline: string,
    movieId: string,
  ): Promise<Movie[]> {
    const result = await this.neo4j.query<
      { timeline: string; id: string },
      DBMovie
    >(GET_MOVIES_BY_ID, { timeline, id: movieId });

    if (!result) {
      throw new MoviesNotFoundException();
    }

    return this.mapResults(result);
  }
}
