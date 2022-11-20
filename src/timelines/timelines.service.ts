import { Injectable } from '@nestjs/common';
import { Neo4jClient } from '../neo4j';
import { Movie } from '../graphql.schema';

@Injectable()
export class TimelinesService {
  constructor(private neo4j: Neo4jClient) {}

  async getTimeline(movieName: string): Promise<Movie[]> {
    const query = `
      MATCH a=(m:Movie)-[:WATCH_NEXT*3]->(:Movie {title: $name})-[:WATCH_NEXT*3{timeline: 'Full'}]->(:Movie)
      RETURN a
      ORDER BY length(a) DESC
      LIMIT 1
    `;

    const result = await this.neo4j.query<{ name: string }>(query, {
      name: movieName,
    });

    const record = result.records[0];

    if (!record) {
      throw new Error('Movie not found');
    }

    const movies: Movie[] = record.get(0).segments.map((segment) => {
      return {
        id: segment.start.elementId,
        name: segment.start.properties.title,
        duration: segment.start.properties.duration,
      };
    });

    return movies;
  }
}
