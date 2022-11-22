import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import neo4j, {
  Driver,
  QueryResult,
  ResultSummary,
  Result,
} from 'neo4j-driver';
import { Config } from 'src/config';

@Injectable()
export class Neo4jClient {
  public client: Driver;

  constructor(private configService: ConfigService<Config>) {
    const uri = this.configService.get('NEO4J_URI');
    const user = this.configService.get('NEO4J_USER');
    const password = this.configService.get('NEO4J_PASSWORD');

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
