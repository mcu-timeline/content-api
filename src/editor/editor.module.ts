import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Neo4jClient } from 'src/neo4j';
import { EditorService } from './editor.service';
import { EditorResolver } from './editor.resolver';

@Module({
  imports: [],
  providers: [EditorResolver, EditorService, Neo4jClient, ConfigService],
})
export class EditorModule {}
