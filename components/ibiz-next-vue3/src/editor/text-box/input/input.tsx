/* eslint-disable no-unsafe-finally */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-nested-ternary */
import { computed, defineComponent, onUnmounted, ref, watch } from 'vue';
import { debounce } from 'lodash-es';
import {
  getEditorEmits,
  getInputProps,
  useCodeListListen,
  useNamespace,
  useUIStore,
} from '@ibiz-template/vue3-util';
import {
  CodeListItem,
  SysUIActionTag,
  UIActionUtil,
} from '@ibiz-template/runtime';
import { ITextArea } from '@ibiz/model-core';
import {
  IBizContext,
  IChatMessage,
  IPortalAsyncAction,
  StringUtil,
  base64ToStr,
  isEmoji,
} from '@ibiz-template/core';
import { createUUID } from 'qx-util';
import { AxiosProgressEvent } from 'axios';
import { TextBoxEditorController } from '../text-box-editor.controller';
import { calcAiToolbarItemsByAc } from '../../../util';
import './input.scss';

/**
 * 文本框
 *
 * @description 使用el-input组件，用于数据录入，通过鼠标或键盘输入字符。支持编辑器类型包含：`文本框`、`多行输入框`、`多行输入框（10行）`、`密码框`
 * @primary
 * @editorparams {name:showlimit,parameterType:boolean,defaultvalue:true,description:el-input组件的show-word-limit属性，控制文本域是否显示字数限制，当编辑器类型为多行输入框、多行输入框（10行）时生效}
 * @editorparams {name:isauto,parameterType:boolean,defaultvalue:false,description:el-input组件的autosize属性，控制文本域高度是否自适应，当编辑器类型为多行输入框、多行输入框（10行）时生效}
 * @editorparams {name:autocomplete,parameterType:boolean,defaultvalue:false,description:el-input组件的autocomplete属性，是否允许自动填充}
 * @editorparams {name:ac,parameterType:boolean,defaultvalue:false,description:是否启用ac自填模式}
 * @editorparams {name:srfaiappendcurdata,parameterType:boolean,defaultvalue:false,description:在打开AI功能时，该参数用于判断是否传入对象参数，主要用于在请求历史记录时，附加当前数据对象}
 * @editorparams {name:srfaiappendcurcontent,parameterType:string,description:在打开AI功能时，如果该参数存在值，会将其传入编辑内容作为用户消息，主要用于在请求历史记录后，附加当前编辑内容作为用户消息}
 * @editorparams {"name":"triggermode","parameterType":"'blur' | 'input'","defaultvalue":"'blur'","description":"指定编辑器触发 `change` 值变更事件的模式，input: 输入框输入时触发事件，blur：输入框blur时触发事件"}
 * @editorparams {name:minlength,parameterType:number,description:指定编辑器输入内容的最小字数}
 * @editorparams {name:maxlength,parameterType:number,description:指定编辑器输入内容的最大字数}
 * @editorparams {name:readonly,parameterType:boolean,defaultvalue:false,description:设置编辑器是否为只读态}
 * @ignoreprops overflowMode
 * @ignoreemits infoTextChange
 */
export const IBizInput = defineComponent({
  name: 'IBizInput',
  props: getInputProps<TextBoxEditorController>(),
  emits: getEditorEmits(),
  setup(props, { emit }) {
    const ns = useNamespace('input');
    const c = props.controller;
    const editorModel = c.model;

    // 是否编辑态
    const isEditable = ref(false);

    // 编辑器Ref
    const editorRef = ref();

    // 是否显示限制长度
    const showLimit = ref(true);

    // 文本域是否自适应高度
    const isAuto = ref(false);

    // 文本域默认行数，仅在 textarea 类型下有效
    const rows = ref(2);
    if (editorModel.editorType === 'TEXTAREA_10') {
      rows.value = 10;
    }

    if (c.editorParams) {
      if (
        c.editorParams.SHOWLIMIT === 'false' ||
        c.editorParams.showlimit === 'false'
      ) {
        showLimit.value = false;
      }
      if (
        c.editorParams.ISAUTO === 'true' ||
        c.editorParams.isauto === 'true'
      ) {
        isAuto.value = true;
      }
    }

    // 类型
    const type = computed(() => {
      switch (editorModel.editorType) {
        case 'TEXTBOX':
        case 'MOBTEXT':
          return 'text';
        case 'PASSWORD':
        case 'MOBPASSWORD':
          return 'password';
        case 'TEXTAREA':
        case 'TEXTAREA_10':
        case 'MOBTEXTAREA':
          return 'textarea';
        default:
          return 'string';
      }
    });

    // 是否显示表单默认内容
    const showFormDefaultContent = computed(() => {
      if (
        props.controlParams &&
        props.controlParams.editmode === 'hover' &&
        !props.readonly
      ) {
        return true;
      }
      return false;
    });

    const currentVal = ref<string>('');

    watch(
      () => props.value,
      (newVal, oldVal) => {
        if (newVal !== oldVal) {
          if (newVal == null) {
            currentVal.value = '';
          } else if (isEmoji(`${newVal}`)) {
            currentVal.value = base64ToStr(`${newVal}`);
          } else {
            currentVal.value = newVal.toString();
          }
        }
      },
      { immediate: true },
    );

    // 当前格式化文本值
    const currentFormatVal = computed(() => {
      let text = '';
      const { unitName } = props.controller.parent;
      if (currentVal.value) {
        text = props.controller.formatValue(currentVal.value);
      }

      if (unitName) {
        if (c.emptyHiddenUnit) {
          if (text) {
            text += unitName;
          }
        } else {
          text += unitName;
        }
      }
      return text;
    });

    const onEmit = (
      val: string | number | undefined,
      eventName: string = 'blur',
    ) => {
      if (eventName === c.triggerMode) {
        emit('change', val);
      }
    };

    const setEditable = (flag: boolean) => {
      if (flag) {
        isEditable.value = flag;
      } else {
        setTimeout(() => {
          isEditable.value = flag;
        }, 100);
      }
    };

    let isDebounce = false;
    let awaitSearch: () => void;
    let blurCacheValue: string | undefined;
    // 值变更
    const handleChange = (val: string | number) => {
      // 拦截掉blur触发后change
      if (blurCacheValue !== val) {
        onEmit(val);
      }
      blurCacheValue = undefined;
    };

    const debounceChange = debounce(
      (val: string | number) => {
        // 拦截掉blur触发后change
        if (blurCacheValue !== val) {
          onEmit(val, 'input');
        }
        blurCacheValue = undefined;
        isDebounce = false;
        if (awaitSearch) {
          awaitSearch();
        }
      },
      300,
      { leading: true },
    );

    const handleInput = (val: string | number) => {
      isDebounce = true;
      debounceChange(val);
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e && e.code === 'Enter') {
        emit('enter', e);
        if (isDebounce) {
          awaitSearch = () => {
            editorRef.value.$el.dispatchEvent(e);
          };
        }
      }
    };

    /**
     * blur时马上抛值变更
     * @author lxm
     * @date 2023-03-06 06:36:23
     */
    const onBlur = (event: IData) => {
      blurCacheValue = event.target.value;
      // eslint-disable-next-line eqeqeq
      if (blurCacheValue != props.value) {
        onEmit(blurCacheValue);
      }
      emit('blur', event);
      setEditable(false);
    };

    // 自动聚焦
    watch(editorRef, newVal => {
      if (props.autoFocus && newVal) {
        const inputTag = type.value === 'textarea' ? 'textarea' : 'input';
        const input = newVal.$el.getElementsByTagName(inputTag)[0];
        input.focus();
      }
    });
    const onFocus = (e: IData) => {
      emit('focus', e);
      setEditable(true);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let chatInstance: any;

    const onClick = async () => {
      const appDataEntityId = (c.model as ITextArea).appDataEntityId;
      if (!appDataEntityId || !c.deACMode) return;
      const {
        contentToolbarItems,
        footerToolbarItems,
        questionToolbarItems,
        otherToolbarItems,
      } = calcAiToolbarItemsByAc(c.deACMode);
      const { zIndex } = useUIStore();
      const containerZIndex = zIndex.increment();
      const module = await import('@ibiz-template-plugin/ai-chat');
      chatInstance = module.chat || module.default.chat;
      let id: string = '';
      let abortController: AbortController;
      chatInstance.create({
        containerOptions: {
          zIndex: containerZIndex,
        },
        chatOptions: {
          caption: c.deACMode.logicName,
          context: { ...c.context },
          params: { ...c.params, srfactag: c.deACMode.codeName },
          // 编辑器参数srfaiappendcurdata，是否传入对象参数，用于历史查询传参
          appendCurData:
            c.editorParams.srfaiappendcurdata === 'true'
              ? props.data
              : undefined,
          // 编辑器参数srfaiappendcurcontent，传入编辑内容作为用户消息,获取历史数据后附加
          appendCurContent: c.editorParams.srfaiappendcurcontent
            ? StringUtil.fill(
                c.editorParams.srfaiappendcurcontent,
                c.context,
                c.params,
                props.data,
              )
            : undefined,
          appDataEntityId,
          contentToolbarItems: contentToolbarItems as any,
          footerToolbarItems: footerToolbarItems as any,
          questionToolbarItems: questionToolbarItems as any,
          otherToolbarItems: otherToolbarItems as any,
          question: async (
            aiChat: any,
            ctx: IContext,
            param: IParams,
            other: IParams,
            arr: IChatMessage[],
          ) => {
            id = createUUID();
            abortController = new AbortController();
            const deService = await ibiz.hub
              .getApp(ctx.srfappid)
              .deService.getService(ctx, other.appDataEntityId);
            try {
              await deService.aiChatSse(
                (msg: IPortalAsyncAction) => {
                  // 20: 持续回答中，消息会持续推送。同一个消息 id 会显示在同一个框内
                  if (msg.actionstate === 20 && msg.actionresult) {
                    aiChat.addMessage({
                      messageid: id,
                      state: msg.actionstate,
                      type: 'DEFAULT',
                      role: 'ASSISTANT',
                      content: msg.actionresult as string,
                    });
                  }
                  // 30: 回答完成，包含具体所有消息内容。直接覆盖之前的临时拼接消息
                  else if (msg.actionstate === 30 && msg.actionresult) {
                    const result = JSON.parse(msg.actionresult as string);
                    const choices = result.choices;
                    if (choices && choices.length > 0) {
                      aiChat.replaceMessage({
                        messageid: id,
                        state: msg.actionstate,
                        type: 'DEFAULT',
                        role: 'ASSISTANT',
                        content: choices[0].content || '',
                      });
                    }
                  }
                  // 40: 回答报错，展示错误信息
                  else if (msg.actionstate === 40) {
                    aiChat.replaceMessage({
                      messageid: id,
                      state: msg.actionstate,
                      type: 'ERROR',
                      role: 'ASSISTANT',
                      content: msg.actionresult as string,
                    });
                  }
                },
                abortController,
                ctx,
                param,
                {
                  messages: arr,
                },
              );
            } catch (error) {
              aiChat.replaceMessage({
                messageid: id,
                state: 40,
                type: 'ERROR',
                role: 'ASSISTANT',
                content: (error as IData).message || ibiz.i18n.t('app.aiError'),
              });
              abortController?.abort();
            } finally {
              // 标记当前消息已经交互完成
              aiChat.completeMessage(id, true);
              return true;
            }
          },
          abortQuestion: async (aiChat: any) => {
            abortController?.abort();
            await aiChat.stopMessage({
              messageid: id,
              state: 30,
              type: 'DEFAULT',
              role: 'ASSISTANT',
              content: '',
            });
            // 标记当前消息已经交互完成
            await aiChat.completeMessage(id, true);
          },
          action: ((action: string, message: IChatMessage) => {
            if (action === 'backfill') {
              handleChange(message.realcontent || '');
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          }) as any,
          history: async (ctx: IContext, param: IParams, other: IParams) => {
            const deService = await ibiz.hub
              .getApp(ctx.srfappid)
              .deService.getService(ctx, other.appDataEntityId);
            const historyData = other.appendCurData ? other.appendCurData : {};
            const result = await deService.aiChatHistory(
              ctx,
              param,
              historyData,
            );
            if (result.data && Array.isArray(result.data)) {
              let preMsg: IData | undefined;
              result.data.forEach(item => {
                if (item.role === 'TOOL') {
                  if (preMsg && item.content) {
                    chatInstance.aiChat!.updateRecommendPrompt(
                      preMsg as any,
                      item.content,
                    );
                  }
                } else {
                  const msg = {
                    messageid: createUUID(),
                    state: 30,
                    type: 'DEFAULT',
                    role: item.role,
                    content: item.content,
                    completed: true,
                  } as const;
                  preMsg = msg;
                  chatInstance.aiChat!.addMessage(msg);
                }
              });
            }
            return true;
          },
          recommendPrompt: async (
            ctx: IContext,
            param: IParams,
            other: IParams,
          ) => {
            const deService = await ibiz.hub
              .getApp(ctx.srfappid)
              .deService.getService(ctx, other.appDataEntityId);
            const result = await deService.aiChatRecommendPrompt(
              ctx,
              param,
              other.message,
            );
            if (result.ok && result.data) {
              const choices = result.data.choices;
              if (choices && choices.length > 0) {
                return choices[0];
              }
              return null;
            }
            return null;
          },
          uploader: {
            onUpload: async (
              file: File,
              reportProgress: (progress: number) => void,
              options?: IData,
            ) => {
              const fileMeata = ibiz.util.file.calcFileUpDownUrl(
                options?.context || c.context,
                options?.params || c.params,
                {},
              );
              const uploadHeaders = ibiz.util.file.getUploadHeaders();
              const formData = new FormData();
              formData.append('file', file);
              const res = await ibiz.net.axios({
                url: fileMeata.uploadUrl,
                method: 'post',
                headers: uploadHeaders,
                data: formData,
                onUploadProgress: (progressEvent: AxiosProgressEvent) => {
                  const percent =
                    (progressEvent.loaded / progressEvent.total!) * 100;
                  reportProgress(percent);
                },
              });
              return res.data;
            },
          },
          extendToolbarClick: async (
            event: MouseEvent,
            source: IData,
            context: IData,
            params: IData,
            data: IData,
          ) => {
            const result = await UIActionUtil.exec(
              source.id,
              {
                view: c.view,
                ctrl: c.ctrl,
                context: IBizContext.create(context),
                params,
                data: [data],
                event,
              },
              source.appId,
            );
            if (result.closeView) {
              // 修复编辑器失焦后，调整数据后直接点击关闭按钮导致无法触发自动保存
              // params.view.modal.ignoreDismissCheck = true;
              c.view.closeView({ ok: true });
            } else if (result.refresh) {
              switch (result.refreshMode) {
                case 1:
                  c.view.callUIAction(SysUIActionTag.REFRESH);
                  break;
                case 2:
                  c.view.parentView?.callUIAction(SysUIActionTag.REFRESH);
                  break;
                case 3:
                  c.view.getTopView()?.callUIAction(SysUIActionTag.REFRESH);
                  break;
                default:
              }
            }
            return result;
          },
        },
      });
    };

    onUnmounted(() => {
      if (chatInstance) {
        chatInstance.close();
      }
    });

    // 只读文本计算和事件抛出
    const readonlyText = computed(() => {
      const { unitName } = props.controller.parent;
      // 只读显示
      let text = `${props.controller.formatValue(currentVal.value)}`;
      // 当有值且单位存在时才显示单位
      if (unitName) {
        if (c.emptyHiddenUnit) {
          if (text) {
            text += unitName;
          }
        } else {
          text += unitName;
        }
      }
      return text;
    });

    // 是否允许自动填充
    const shouldAutoComplete = computed(() => {
      // 根据配置的编辑器参数autocomplete来决定
      return c.model.editorParams &&
        c.model.editorParams.autocomplete &&
        c.toBoolean(c.model.editorParams.autocomplete)
        ? 'on'
        : 'new-password';
    });

    // 代码表数据
    const items = ref<readonly CodeListItem[]>([]);
    if (c.codeList) {
      watch(
        () => props.data,
        newVal => {
          c.loadCodeList(newVal).then(_codeList => {
            items.value = _codeList;
          });
        },
        {
          immediate: true,
          deep: true,
        },
      );
    }

    const fn = (data: CodeListItem[] | undefined) => {
      if (data) {
        items.value = data;
      }
    };

    useCodeListListen(c.model.appCodeListId, c.context.srfappid, fn);

    return {
      c,
      ns,
      rows,
      type,
      items,
      currentVal,
      readonlyText,
      handleChange,
      handleInput,
      handleKeyUp,
      onBlur,
      onFocus,
      editorRef,
      onClick,
      shouldAutoComplete,
      isEditable,
      setEditable,
      showLimit,
      isAuto,
      showFormDefaultContent,
      currentFormatVal,
    };
  },
  render() {
    const { unitName } = this.c.parent;
    const { editorWidth, editorHeight, predefinedType } = this.c.model;

    let content = null;
    if (this.readonly) {
      if (this.c.codeList) {
        content = (
          <iBizCodeList
            codeListItems={this.items}
            codeList={this.c.codeList}
            value={this.currentVal}
            convertToCodeItemText={this.c.convertToCodeItemText}
          ></iBizCodeList>
        );
      } else {
        // 只读显示
        content = this.readonlyText;
      }
    } else {
      // 编辑态显示
      const slots: IData = {};
      if (unitName) {
        slots.suffix = () => {
          let unitText = '';
          if (this.c.emptyHiddenUnit) {
            if (this.currentVal) {
              unitText = unitName;
            }
          } else {
            unitText = unitName;
          }
          return <i class={this.ns.e('unit')}>{unitText}</i>;
        };
      }
      if (predefinedType === 'AUTH_USERID') {
        slots.prefix = () => <ion-icon name='person'></ion-icon>;
      } else if (predefinedType === 'AUTH_PASSWORD') {
        slots.prefix = () => <ion-icon name='unlock-alt'></ion-icon>;
      }

      content = (
        <el-input
          ref='editorRef'
          clearable={true}
          v-model={this.currentVal}
          placeholder={this.c.placeHolder}
          type={this.type}
          rows={this.rows}
          resize='none'
          autosize={this.isAuto}
          maxlength={this.c.model.maxLength}
          minlength={this.c.model.minLength}
          show-word-limit={this.showLimit && this.c.model.showMaxLength}
          onChange={this.handleChange}
          onInput={this.handleInput}
          onKeyup={this.handleKeyUp}
          onBlur={this.onBlur}
          onFocus={this.onFocus}
          class={this.ns.b('input')}
          disabled={this.disabled}
          show-password={this.type === 'password'}
          autocomplete={this.shouldAutoComplete}
          {...this.$attrs}
        >
          {slots}
        </el-input>
      );
    }

    // 表单默认内容
    const formDefaultContent = (
      <div class={this.ns.b('form-default-content')}>
        {this.currentVal ? (
          this.type === 'password' ? (
            this.currentVal.split('').map(_item => '•')
          ) : (
            this.currentFormatVal
          )
        ) : (
          <iBizEditorEmptyText
            showPlaceholder={this.c.emptyShowPlaceholder}
            placeHolder={this.c.placeHolder}
          />
        )}
      </div>
    );

    return (
      <div
        class={[
          this.ns.b(),
          this.ns.is('textarea', Object.is(this.type, 'textarea')),
          this.disabled ? this.ns.m('disabled') : '',
          this.readonly ? this.ns.m('readonly') : '',
          this.ns.is('editable', this.isEditable),
          this.ns.is('show-default', this.showFormDefaultContent),
        ]}
        style={{
          width: editorWidth ? `${editorWidth}px` : '',
          height: editorHeight ? `${editorHeight}px` : '',
        }}
      >
        {this.showFormDefaultContent && formDefaultContent}
        {/** autocomplete参数设置为true且类型为密码框时，添加隐藏文本框，解决浏览器不识别autocomplete参数 */}
        {this.type === 'password' &&
        this.shouldAutoComplete === 'new-password' ? (
          <input
            type={'text'}
            style='opacity: 0;position:absolute;width:0;height:0;'
          ></input>
        ) : null}

        {content}
        {this.c.chatCompletion ? (
          <div class={this.ns.e('ai-chat')} onClick={this.onClick}>
            <ion-icon src='./assets/images/svg/chat.svg' />
          </div>
        ) : null}
      </div>
    );
  },
});
