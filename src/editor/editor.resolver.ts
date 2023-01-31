import { Query, Resolver, ResolveReference } from '@nestjs/graphql';

import { EditorService } from './editor.service';
import { Content } from './editor.types';

@Resolver('editor')
export class EditorResolver {
  constructor(private readonly editorService: EditorService) {}

  @Query('content')
  async getContent(): Promise<Content> {
    return this.editorService.getContent();
  }

  @ResolveReference()
  async resolveReference(): Promise<Content> {
    return this.editorService.getContent();
  }
}
