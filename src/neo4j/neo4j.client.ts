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

  async find() {
    const session = this.client.session({ database: 'neo4j' });

    try {
      const readQuery = `
        MATCH a=(m:Movie)-[:WATCH_NEXT*3]->(:Movie {title: 'Iron Man 3'})-[:WATCH_NEXT*3{timeline: 'Full'}]->(:Movie)
        RETURN a
        ORDER BY length(a) DESC
        LIMIT 1
      `;

      const readResult = await session.executeRead((tx) => tx.run(readQuery));

      readResult.records.forEach((record) => {
        console.log(`Found person: ${record.get('name')}`);
      });
    } catch (error) {
      console.error(`Something went wrong: ${error}`);
    } finally {
      await session.close();
    }
  }
}
