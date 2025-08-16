import { VNode } from 'preact';
import { useComputed, useSignal } from '@preact/signals';
import Cherry from 'cherry-markdown';
import { useEffect } from 'preact/hooks';
import { IChatMessage } from '../../../interface';
import { MaterialResourceParser, Namespace, createUUID } from '../../../utils';
import { AiChatController } from '../../../controller';
import { ChatInputMaterialtem } from '../../chat-input-material-item/chat-input-material-item';
import './user-message.scss';

export interface UserMessageProps {
  controller: AiChatController;
  message: IChatMessage;
  /**
   * 内容大小，用于更新绘制
   *
   * @author chitanda
   * @date 2023-10-15 21:10:22
   * @type {number}
   */
  size: number;

  /**
   * 工具栏
   *
   * @type {VNode}
   * @memberof UserMessageProps
   */
  children: VNode;
}

const ns = new Namespace('user-message-question');

export const UserMessage = (props: UserMessageProps) => {
  const uuid = useSignal(createUUID());

  const cherry = useSignal<Cherry | null>(null);

  const content = useComputed(() => props.message.content);

  const materialResult = useComputed(() => {
    return MaterialResourceParser.parseMixedContent(content.value);
  });

  useEffect(() => {
    cherry.value = new Cherry({
      id: uuid,
      value: materialResult.value.remainingText || '',
      editor: {
        defaultModel: 'previewOnly',
      },
      themeSettings: {
        // 目前应用的主题
        mainTheme: 'dark',
        codeBlockTheme: 'dark',
      },
      previewer: {
        // 默认禁用
        enablePreviewerBubble: false,
      },
      engine: {
        syntax: {
          table: {
            enableChart: false,
            externals: ['echarts'],
          },
        },
      },
    });
  }, [materialResult.value.remainingText]);

  return (
    <div className={ns.b()}>
      <div className={ns.e('user-header')}>
        {props.children}
        <div className={ns.e('user')}>我</div>
      </div>
      <div className={ns.e('content')}>
        <div className={ns.em('content', 'body')}>
          {materialResult.value.hasResources && (
            <div className={ns.em('content', 'material')}>
              {materialResult.value.resources.map(resource => {
                return (
                  <ChatInputMaterialtem
                    material={resource}
                    key={resource.id}
                    disabled={true}
                    controller={props.controller}
                  ></ChatInputMaterialtem>
                );
              })}
            </div>
          )}
          <div className={'pre-wrap-container'}>
            <div id={uuid} />
          </div>
        </div>
      </div>
    </div>
  );
};
