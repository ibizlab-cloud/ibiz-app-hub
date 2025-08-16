/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  TargetedEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'preact/compat';
import { useComputed, useSignal } from '@preact/signals';
import autosize from 'autosize';
import { Namespace } from '../../utils';
import {
  AudioSvg,
  PaperclipSvg,
  RecordingSvg,
  SendSvg,
  FileSvg,
  StopCircleSvg,
} from '../../icons';
import { AiChatController, AIMaterialFactory } from '../../controller';
import { ChatInputMaterial } from '../chat-input-material/chat-input-material';
import { Popup } from '../popup/popup';
import { IChatToolbarItem } from '../../interface';
import { isSvg } from '../../utils/util/util';
import './chat-input.scss';

export interface ChatInputProps {
  /**
   * 单实例聊天总控
   *
   * @author chitanda
   * @date 2023-10-13 17:10:43
   * @type {AiChatController}
   */
  controller: AiChatController;

  /**
   * 提问区交互工具栏
   *
   * @author tony001
   * @date 2025-02-28 16:02:58
   * @type {IChatToolbarItem[]}
   */
  questionToolbarItems?: IChatToolbarItem[];
}

const ns = new Namespace('chat-input');

// 语音识别构造器
const SpeechRecognition =
  (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

export const ChatInput = (props: ChatInputProps) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const input = props.controller.input;

  // 是否正在语音输入
  const recording = useSignal(false);

  // 语音识别实例
  const recognition = useRef<any>();

  if (SpeechRecognition && !recognition.current) {
    recognition.current = new SpeechRecognition();

    recognition.current.onstart = () => {
      recording.value = true;
    };

    recognition.current.onend = () => {
      recording.value = false;
    };

    recognition.current.onresult = (e: any) => {
      const transcript = e.results?.[0]?.[0]?.transcript;
      if (transcript) {
        input.value = `${input.value}${transcript}`;
      }
    };
  }

  // 处理语音输入按钮点击事件
  const handleRecordButtonClick = () => {
    if (recognition.current && !recording.value) {
      recognition.current.start();
    }
  };

  const onInput = useCallback(
    (e: TargetedEvent<HTMLTextAreaElement, Event>) => {
      input.value = (e.target as HTMLTextAreaElement).value;
    },
    [input],
  );

  const isDisableSend = useComputed(() => input.value.length <= 0);

  useEffect(() => {
    if (textareaRef.current) {
      autosize(textareaRef.current);
    }
    return () => {
      if (textareaRef.current) {
        autosize.destroy(textareaRef.current);
      }
    };
  }, [textareaRef]);

  const question = useCallback(async () => {
    try {
      const inputTxt = input.value;
      input.value = '';
      await props.controller.question(inputTxt);
    } catch (err) {
      console.error(err);
    } finally {
      textareaRef.current?.focus();
    }
  }, [input]);

  const stopQuestion = useCallback(async () => {
    try {
      props.controller.abortQuestion();
    } catch (error) {
      console.error(error);
    }
  }, [input]);

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.code === 'Enter' && !e.isComposing) {
      e.stopPropagation();
      if (e.shiftKey === false) {
        question();
      }
    }
  };

  /**
   * 文件上传
   *
   * @author tony001
   * @date 2025-02-28 17:02:20
   */
  const uploadFile = async (event: MouseEvent) => {
    const materialHelper = AIMaterialFactory.getMaterialHelper(
      'ossfile',
      props.controller,
    );
    await materialHelper.excuteAction(event);
    setIsPopupOpen(false);
  };

  /**
   * 通用问答
   *
   * @author tony001
   * @date 2025-02-28 17:02:41
   * @param {IChatToolbarItem} item
   */
  const commonQuestion = async (event: MouseEvent, item: IChatToolbarItem) => {
    const materialHelper = AIMaterialFactory.getMaterialHelper(
      'common',
      props.controller,
    );
    await materialHelper.excuteAction(event, item);
    setIsPopupOpen(false);
  };

  return (
    <div className={ns.b('wrapper')}>
      <div className={ns.b('material-wrapper')}>
        <ChatInputMaterial controller={props.controller}></ChatInputMaterial>
      </div>
      <div className={ns.b('main-wrapper')}>
        <textarea
          className={ns.e('textarea')}
          type='text'
          rows={6}
          autoCorrect='off'
          autoCapitalize='off'
          autoComplete='off'
          value={input}
          onInput={onInput}
          onKeyDown={onKeyDown}
          ref={textareaRef}
          disabled={props.controller.isLoading.value}
        />
        <div className={ns.b('action-wrapper')}>
          <div
            className={`${ns.be('action-wrapper', 'action-item')} ${ns.is(
              'disabled',
              props.controller.isLoading.value,
            )}`}
            title={'上传资料'}
          >
            <Popup
              content={
                <div className={ns.b('pop-actions')}>
                  <div
                    className={ns.b('pop-action-item')}
                    onClick={e => {
                      uploadFile(e);
                    }}
                  >
                    <span className={ns.b('pop-action-item-icon')}>
                      <FileSvg />
                    </span>
                    <span className={ns.b('pop-action-item-title')}>
                      文件资料
                    </span>
                  </div>
                  {props.questionToolbarItems?.map(item => {
                    return (
                      <div
                        key={item.id}
                        className={ns.b('pop-action-item')}
                        onClick={e => {
                          commonQuestion(e, item);
                        }}
                      >
                        <span className={ns.b('pop-action-item-icon')}>
                          {typeof item.icon === 'function'
                            ? item.icon()
                            : item.icon?.showIcon && (
                                <>
                                  {item.icon?.cssClass ? (
                                    <i className={item.icon.cssClass} />
                                  ) : item.icon?.imagePath ? (
                                    isSvg(item.icon.imagePath) ? (
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html: item.icon.imagePath,
                                        }}
                                      />
                                    ) : (
                                      <img src={item.icon.imagePath} />
                                    )
                                  ) : null}
                                </>
                              )}
                        </span>
                        <span className={ns.b('pop-action-item-title')}>
                          {item.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              }
              position='top-left'
              isOpen={isPopupOpen}
              onToggleOpen={setIsPopupOpen}
            >
              <PaperclipSvg />
            </Popup>
          </div>
          <div
            title={recording.value ? '语音输入中...' : '语音输入'}
            className={`${ns.be('action-wrapper', 'action-item')} ${ns.is(
              'disabled',
              props.controller.isLoading.value,
            )}`}
            onClick={handleRecordButtonClick}
          >
            {recording.value ? <RecordingSvg /> : <AudioSvg />}
          </div>
          {props.controller.isLoading.value ? (
            <div
              title={'停止生成'}
              className={`${ns.be('action-wrapper', 'action-item')}`}
              onClick={stopQuestion}
            >
              <StopCircleSvg />
            </div>
          ) : (
            <div
              title={'发送消息'}
              className={`${ns.be('action-wrapper', 'action-item')} ${ns.is(
                'disabled',
                isDisableSend.value,
              )}`}
              onClick={question}
            >
              <SendSvg />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
