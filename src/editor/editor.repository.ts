import { Injectable } from '@nestjs/common';

import { Neo4jClient } from '../neo4j';
import { Character, DBCharacter } from './editor.types';
import { GET_CHARACTERS } from './editor.queries';

@Injectable()
export class EditorRepository {
  constructor(private neo4j: Neo4jClient) {}

  private mapResults = (characters: DBCharacter[]): Character[] =>
    characters.map((character) => ({
      id: character.id,
    }));

  async getCharacters(): Promise<Character[]> {
    const result = await this.neo4j.query<undefined, DBCharacter>(
      GET_CHARACTERS,
      undefined,
    );

    return this.mapResults(result);
  }
}
