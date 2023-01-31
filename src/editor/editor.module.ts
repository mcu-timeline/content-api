import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Neo4jClient } from 'src/neo4j';
import { EditorService } from './editor.service';
import { EditorResolver } from './editor.resolver';
import { EditorRepository } from './editor.repository';

@Module({
  imports: [],
  providers: [
    EditorResolver,
    EditorService,
    EditorRepository,
    Neo4jClient,
    ConfigService,
  ],
})
export class EditorModule {}
