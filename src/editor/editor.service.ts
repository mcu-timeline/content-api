import { Injectable } from '@nestjs/common';
import { Neo4jClient } from '../neo4j';
import { Content } from './editor.types';

@Injectable()
export class EditorService {
  constructor(private neo4j: Neo4jClient) {}

  async getContent(): Promise<Content> {
    return {
      characters: [
        {
          id: '1',
        },
      ],
    };
  }
}
