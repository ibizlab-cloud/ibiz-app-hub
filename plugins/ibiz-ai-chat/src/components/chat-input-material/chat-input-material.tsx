/* eslint-disable @typescript-eslint/no-explicit-any */
import { AiChatController } from '../../controller';
import { Namespace } from '../../utils';
import { ChatInputMaterialtem } from '../chat-input-material-item/chat-input-material-item';
import './chat-input-material.scss';

export interface ChatInputMaterialProps {
  /**
   * 聊天实例
   *
   * @author tony001
   * @date 2025-02-27 17:02:50
   * @type {AiChatController}
   */
  controller: AiChatController;
}

const ns = new Namespace('chat-input-material');
export const ChatInputMaterial = (props: ChatInputMaterialProps) => {
  const materials = props.controller.materials;
  return (
    <div className={ns.b()}>
      {materials.value.map(material => {
        return (
          <ChatInputMaterialtem
            material={material}
            key={material.id}
            disabled={false}
            controller={props.controller}
          ></ChatInputMaterialtem>
        );
      })}
    </div>
  );
};
