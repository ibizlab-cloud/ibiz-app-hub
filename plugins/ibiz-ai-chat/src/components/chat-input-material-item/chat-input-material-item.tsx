import { h } from 'preact';
import { AiChatController } from '../../controller';
import { Namespace } from '../../utils';
import { IMaterial } from '../../interface';
import { OssfileMaterial } from './ossfile-material/ossfile-material';
import { CommonMaterial } from './common-material/common-material';
import { MaterialRemoveSvg } from '../../icons';
import './chat-input-material-item.scss';

const ns = new Namespace('chat-input-material-item');

export interface ChatInputMaterialtemProps {
  /**
   * 聊天控制器
   *
   * @author tony001
   * @date 2025-02-28 15:02:04
   * @type {AiChatController}
   */
  controller: AiChatController;

  /**
   * 素材对象
   *
   * @author tony001
   * @date 2025-02-28 15:02:45
   * @type {IMaterial}
   */
  material: IMaterial;

  /**
   * 禁用状态
   *
   * @author tony001
   * @date 2025-03-03 14:03:26
   * @type {boolean}
   */
  disabled: boolean;
}

export const ChatInputMaterialtem = (props: ChatInputMaterialtemProps) => {
  const { material } = props;

  let com = null;

  switch (material.type) {
    case 'ossfile':
      com = OssfileMaterial;
      break;
    default:
      com = CommonMaterial;
  }

  const removeMaterialtem = () => {
    props.controller.deleteMaterial(material);
  };

  return (
    <div className={`${ns.b()} ${ns.is('disabled', props.disabled)}`}>
      <div className={ns.e('icon')} onClick={removeMaterialtem}>
        <MaterialRemoveSvg></MaterialRemoveSvg>
      </div>
      {h(com, {
        material,
        controller: props.controller,
      })}
    </div>
  );
};
