import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import neo4j, { Driver, QueryResult } from 'neo4j-driver';
import { Config } from 'src/config';
import { FailedToExecuteQueryException } from './neo4j.exceptions';

@Injectable()
export class Neo4jClient {
  public client: Driver;

  constructor(private configService: ConfigService<Config>) {
    const uri = this.configService.get('NEO4J_URI', { infer: true });
    const user = this.configService.get('NEO4J_USER', { infer: true });
    const password = this.configService.get('NEO4J_PASSWORD', { infer: true });

    this.client = neo4j.driver(uri, neo4j.auth.basic(user, password));
  }

  private parseResult<TResult>(result: QueryResult<TResult>): TResult[] {
    if (!result) {
      return [];
    }

    return result.records.map((record) =>
      record.keys.reduce<TResult>((result, key) => {
        result[key] = record.get(key);
        return result;
      }, {} as TResult),
    );
  }

  public async query<TParameters, TResult>(
    query: string,
    parameters: TParameters,
  ): Promise<TResult[]> {
    const session = this.client.session({ database: 'neo4j' });

    try {
      const result = await session.executeRead<QueryResult<TResult>>((tx) =>
        tx.run(query, parameters),
      );

      return this.parseResult<TResult>(result);
    } catch (error) {
      throw new FailedToExecuteQueryException();
    } finally {
      await session.close();
    }
  }
}
