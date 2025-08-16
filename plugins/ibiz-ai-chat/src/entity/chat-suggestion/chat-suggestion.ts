import { IChatSuggestion } from '../../interface';

export class ChatSuggestion implements IChatSuggestion {
  get type(): IChatSuggestion['type'] {
    return this.suggestion.type;
  }

  get metadata(): IChatSuggestion['metadata'] {
    return this.suggestion.metadata;
  }

  get data(): IChatSuggestion['data'] {
    return this.suggestion.data;
  }

  constructor(public suggestion: IChatSuggestion) {}
}
