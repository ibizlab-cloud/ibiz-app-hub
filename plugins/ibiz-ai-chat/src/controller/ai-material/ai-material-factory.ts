import { AiChatController } from '../ai-chat/ai-chat.controller';
import { CommonHelper } from './common-helper';
import { FileHelper } from './file-helper';

export class AIMaterialFactory {
  static getMaterialHelper(type: string, aiChat: AiChatController) {
    switch (type) {
      case 'ossfile':
        return new FileHelper(aiChat);
      default:
        return new CommonHelper(aiChat);
    }
  }
}
