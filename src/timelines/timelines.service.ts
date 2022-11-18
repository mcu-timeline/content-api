import { Injectable } from '@nestjs/common';
import { Movie } from '../graphql.schema';

@Injectable()
export class TimelinesService {
  async getTimeline(): Promise<Movie[]> {
    return [
      {
        id: 'some id',
        name: 'Avengers',
        duration: '2:21:31',
      },
    ];
  }
}
