import { Injectable } from '@nestjs/common';
import neo4j, { Driver } from 'neo4j-driver';

@Injectable()
export class Neo4jClient {
  public client: Driver;

  constructor() {
    const uri = '';
    const user = 'neo4j';
    const password = '';

    this.client = neo4j.driver(uri, neo4j.auth.basic(user, password));
  }

  public async query<TParameters>(query: string, parameters: TParameters) {
    const session = this.client.session({ database: 'neo4j' });

    try {
      const result = await session.executeRead((tx) =>
        tx.run(query, parameters),
      );

      return result;
    } catch (error) {
      console.error(`Something went wrong: ${error}`);
    } finally {
      await session.close();
    }
  }
}
