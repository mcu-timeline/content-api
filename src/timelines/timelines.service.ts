import { Injectable } from '@nestjs/common';
import { Neo4jClient } from '../neo4j';
import { Movie } from '../graphql.schema';
import { PathSegment } from 'neo4j-driver';
import { isValidPathSegment } from './timelines.types';
import { MoviesNotFoundException } from './timelines.exceptions';

@Injectable()
export class TimelinesService {
  constructor(private neo4j: Neo4jClient) {}

  private mapResults = (segments: PathSegment[]): Movie[] => {
    return segments.map((segment) => {
      if (isValidPathSegment(segment)) {
        return {
          id: segment.start.properties.id,
          name: segment.start.properties.title,
          duration: segment.start.properties.duration,
        };
      }
    });
  };

  private async getFirstItemsOfTimeline(): Promise<Movie[]> {
    const getFirstItemsQuery = `
      MATCH a=(m:Movie)-[:WATCH_NEXT{timeline: 'Full'}]->(:Movie)-[:WATCH_NEXT*2{timeline: 'Full'}]->(:Movie)
      WHERE NOT ()-[:WATCH_NEXT]->(m)
      RETURN a
      ORDER BY length(a) DESC
      LIMIT 1
    `;

    const result = await this.neo4j.query(getFirstItemsQuery, {});

    if (!result) {
      throw new MoviesNotFoundException();
    }

    return this.mapResults(result);
  }

  private async getItemsStartingFromGiveName(
    movieId: string,
  ): Promise<Movie[]> {
    const getItemsStartingFormGivenName = `
      MATCH a=(m:Movie)-[:WATCH_NEXT*0..3]->(:Movie {id: $name})-[:WATCH_NEXT*0..3{timeline: 'Full'}]->(:Movie)
      RETURN a
      ORDER BY length(a) DESC
      LIMIT 1
    `;

    const result = await this.neo4j.query<{ id: string }>(
      getItemsStartingFormGivenName,
      { id: movieId },
    );

    if (!result) {
      throw new MoviesNotFoundException();
    }

    return this.mapResults(result);
  }

  async getTimeline(movieId?: string): Promise<Movie[]> {
    if (!movieId) {
      return this.getFirstItemsOfTimeline();
    }

    return this.getItemsStartingFromGiveName(movieId);
  }
}
