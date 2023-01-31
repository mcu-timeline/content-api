import { Injectable } from '@nestjs/common';
import { Content } from './editor.types';
import { EditorRepository } from './editor.repository';

@Injectable()
export class EditorService {
  constructor(private editorRepository: EditorRepository) {}

  async getContent(): Promise<Content> {
    const characters = await this.editorRepository.getCharacters();
    return {
      characters,
    };
  }
}
