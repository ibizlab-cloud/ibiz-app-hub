/* eslint-disable no-bitwise */
/* eslint-disable no-unsafe-finally */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable object-shorthand */
import {
  ref,
  watch,
  nextTick,
  onMounted,
  onUnmounted,
  defineComponent,
} from 'vue';
import {
  useUIStore,
  useNamespace,
  getCodeProps,
  getEditorEmits,
} from '@ibiz-template/vue3-util';
import { createUUID } from 'qx-util';
import { ElMessageBox } from 'element-plus';
import * as monaco from 'monaco-editor';
import { AxiosProgressEvent } from 'axios';
import loader from '@monaco-editor/loader';
import { SysUIActionTag, UIActionUtil } from '@ibiz-template/runtime';
import {
  StringUtil,
  IBizContext,
  IChatMessage,
  IPortalAsyncAction,
} from '@ibiz-template/core';
import { CodeEditorController } from '../code-editor.controller';
import { calcAiToolbarItemsByAc } from '../../../util';
import './monaco-editor.scss';

/**
 * 代码编辑
 *
 * @description 使用monacoEditor组件封装，用于编辑代码内容。支持编辑器类型包含：`代码编辑器`
 * @primary
 * @editorparams {"name":"language","parameterType":"string","defaultvalue":"'typescript'","description":"设置代码编辑器所使用的编程语言类型，比如JavaScript或TypeScript等，会影响代码的语法高亮、智能提示等功能"}
 * @editorparams {"name":"enableedit","parameterType":"boolean","defaultvalue":true,"description":"当该值为true时，会显示代码编辑器顶部的工具栏，并且只有点击编辑按钮后才能开启代码编辑功能，否则编辑框默认处于不可编辑状态，常用于需要控制编辑权限的场景"}
 * @editorparams {"name":"enablefullscreen","parameterType":"boolean","defaultvalue":false,"description":"若该值为true，会显示代码编辑器顶部的工具栏，并且点击工具栏中的全屏按钮后，编辑框将全屏显示，方便在较大的视野下进行代码编辑工作"}
 * @editorparams {"name":"srfaiappendcurdata","parameterType":"boolean","defaultvalue":false,"description":"在打开AI功能时，该参数用于判断是否传入对象参数，主要用于在请求历史记录时，附加当前参数"}
 * @editorparams {"name":"srfaiappendcurcontent","parameterType":"string","description":"在打开AI功能时，如果该参数存在值，会将其传入编辑内容作为用户消息，主要用于在请求历史记录后，附加当前编辑内容作为用户消息"}
 * @editorparams {name:ac,parameterType:boolean,defaultvalue:false,description:是否启用ac自填模式}
 * @editorparams {"name":"readonly","parameterType":"boolean","defaultvalue":false,"description":"设置编辑器是否为只读态"}
 * @ignoreprops autoFocus | overflowMode
 * @ignoreemits blur | focus | enter | infoTextChange
 */
export const IBizCode = defineComponent({
  name: 'IBizCode',
  props: getCodeProps<CodeEditorController>(),
  emits: getEditorEmits(),
  setup(props, { emit }) {
    const codeEditBox = ref();
    const ns = useNamespace('code');
    const c = props.controller!;
    const UUID = createUUID();
    const currentVal = ref<string>('');

    // 允许编辑
    const enableEdit = ref(true);

    // 是否存在编辑器参数enableEdit
    const hasEnableEdit = ref(false);

    // 只读状态
    const readonlyState = ref(false);

    // 允许全屏打开
    const enableFullScreen = ref(false);

    // 是否全屏
    const isFullScreen = ref(false);

    // 是否加载中
    const isLoading = ref(false);

    const editorModel = c.model;
    if (editorModel.editorParams) {
      if (editorModel.editorParams.enableEdit) {
        hasEnableEdit.value = true;
        readonlyState.value = true;
        enableEdit.value =
          c.toBoolean(editorModel.editorParams.enableEdit) &&
          !props.readonly &&
          !props.disabled;
      }
      if (editorModel.editorParams.enableedit) {
        hasEnableEdit.value = true;
        readonlyState.value = true;
        enableEdit.value =
          c.toBoolean(editorModel.editorParams.enableedit) &&
          !props.readonly &&
          !props.disabled;
      }
      if (editorModel.editorParams.enableFullScreen) {
        enableFullScreen.value = c.toBoolean(
          editorModel.editorParams.enableFullScreen,
        );
      }
      if (editorModel.editorParams.enablefullscreen) {
        enableFullScreen.value = c.toBoolean(
          editorModel.editorParams.enablefullscreen,
        );
      }
    }

    let editor: monaco.editor.IStandaloneCodeEditor | null;
    let monacoEditor: typeof monaco.editor;
    let codeLensProviderDisposable: monaco.IDisposable | null;
    let inlineCompletionsProviderDisposable: monaco.IDisposable | null;
    let decorationsCollection: monaco.editor.IEditorDecorationsCollection | null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let chatInstance: any;
    const { UIStore, zIndex } = useUIStore();

    // 编辑器主题
    const getMonacoTheme = (name: string): string => {
      // customTheme参数已弃用，后续请使用全局参数codeEditorTheme
      const customTheme = c?.editorParams?.customTheme;
      if (customTheme) {
        return customTheme === 'dark' ? 'vs-dark' : 'vs';
      }
      if (ibiz.config.codeEditorTheme) {
        return ibiz.config.codeEditorTheme === 'dark' ? 'vs-dark' : 'vs';
      }
      return name === 'dark' ? `vs-${UIStore.theme}` : 'vs'; // 官方自带三种主题vs, hc-black, or vs-dark
    };

    watch(
      () => UIStore.theme,
      newVal => {
        monacoEditor.setTheme(getMonacoTheme(newVal));
      },
    );

    watch(
      () => props.value,
      newVal => {
        if (newVal !== currentVal.value) {
          currentVal.value = newVal || '';
          editor?.setValue(currentVal.value);
        }
      },
      { immediate: true },
    );

    // 更新编辑器配置
    const updateEditorOptions = () => {
      if (!editor) {
        return;
      }
      if (props.readonly || props.disabled) {
        hasEnableEdit.value = false;
        readonlyState.value = true;
      }
      editor.updateOptions({
        readOnly: hasEnableEdit.value
          ? readonlyState.value
          : props.readonly || props.disabled,
      });
    };

    watch(() => props.readonly, updateEditorOptions, { immediate: true });

    watch(() => props.disabled, updateEditorOptions, { immediate: true });

    /**
     * 卸载代码编辑器
     */
    const unload = () => {
      editor?.dispose();
      editor = null;
      decorationsCollection?.clear();
      decorationsCollection = null;
      codeLensProviderDisposable?.dispose();
      codeLensProviderDisposable = null;
      inlineCompletionsProviderDisposable?.dispose();
      inlineCompletionsProviderDisposable = null;
      chatInstance?.close();
    };

    /**
     * 打开AI
     *
     */
    const openAIChat = async () => {
      if (!c.deACMode || !c.model.appDataEntityId) return;
      const {
        contentToolbarItems,
        footerToolbarItems,
        questionToolbarItems,
        otherToolbarItems,
      } = calcAiToolbarItemsByAc(c.deACMode);
      const module = await import('@ibiz-template-plugin/ai-chat');
      chatInstance = module.chat || module.default.chat;
      let id: string = '';
      let abortController: AbortController;
      chatInstance.create({
        containerOptions: {
          zIndex: zIndex.increment(),
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
          appDataEntityId: c.model.appDataEntityId,
          contentToolbarItems,
          footerToolbarItems,
          questionToolbarItems,
          otherToolbarItems,
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
            if (action === 'backfill') emit('change', message.realcontent);
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

    /**
     * 检查模型是否属于当前编辑器实例
     *
     * @param {monaco.editor.ITextModel} model
     * @return {*}  {boolean}
     */
    const validate = (model: monaco.editor.ITextModel): boolean => {
      const currentEditor = monacoEditor
        .getEditors()
        .find(e => e.getModel() === model);

      if (!currentEditor || (currentEditor as any).__instanceId !== UUID)
        return false;
      return true;
    };

    const editorInit = (): void => {
      nextTick(() => {
        isLoading.value = true;
        loader.config({
          paths: {
            vs: `${ibiz.env.pluginBaseUrl}/monaco-editor@0.45.0/min/vs`,
          },
        });
        loader
          .init()
          .then(loaderMonaco => {
            isLoading.value = false;
            // 初始化编辑器
            if (!editor) {
              monacoEditor = loaderMonaco.editor;
              editor = monacoEditor.create(codeEditBox.value, {
                language: props.language || props.controller.language, // 语言支持自行查阅demo
                theme: getMonacoTheme(UIStore.theme),
                foldingStrategy: 'indentation',
                renderLineHighlight: 'all', // 行亮
                selectOnLineNumbers: true, // 显示行号
                minimap: {
                  enabled: true,
                },
                readOnly: hasEnableEdit.value
                  ? readonlyState.value
                  : props.readonly || props.disabled, // 只读
                readOnlyMessage: {
                  value: ibiz.i18n.t('editor.code.readOnlyPrompt'),
                },
                fontSize: 16, // 字体大小
                fixedOverflowWidgets: true, // 确保悬浮提示不会被裁剪
                scrollBeyondLastLine: false, // 取消代码后面一大段空白
                overviewRulerBorder: false, // 不要滚动条的边框
              });
              // 为当前编辑器实例添加自定义属性
              (editor as any).__instanceId = UUID;
              if (c.deACMode && ibiz.env.enableAI) {
                codeLensProviderDisposable =
                  loaderMonaco.languages.registerCodeLensProvider(
                    props.language || props.controller.language,
                    {
                      provideCodeLenses: function (model, _token) {
                        if (!validate(model))
                          return { lenses: [], dispose: () => {} };
                        return {
                          lenses: [
                            {
                              id: 'AI',
                              range: new loaderMonaco.Range(1, 1, 1, 1),
                              command: {
                                title: `${c.deACMode!.logicName}`,
                                id: editor!.addCommand(0, () => openAIChat())!,
                              },
                            },
                          ],
                          dispose: () => {},
                        };
                      },
                      resolveCodeLens: (_model, codeLens, _token) => codeLens,
                    },
                  );
              }
            }
            setTimeout(() => {
              editor!.layout();
              editor!.setValue(currentVal.value);
            });

            // 创建空白提示
            const createDecorationsCollection = (): void => {
              if (decorationsCollection) decorationsCollection.clear();
              if (c.placeHolder && !editor?.getValue()) {
                decorationsCollection = editor!.createDecorationsCollection([
                  {
                    range: new loaderMonaco.Range(1, 1, 1, 1), // 影响第1行的开始位置
                    options: {
                      isWholeLine: true, // 是否作用于整行
                      beforeContentClassName: `${ns.e(
                        'first-prompt',
                      )} ghost-text-decoration`, // 在内容前加修饰 mtk8为注释样式类名
                    },
                  },
                ]);
              }
            };

            // 保存原始的 setValue 方法
            const originalSetValue = editor.setValue.bind(editor);
            // 重写 setValue 方法
            editor.setValue = (newValue: string): void => {
              // 调用原始的 setValue 方法
              originalSetValue(newValue);
              createDecorationsCollection();
            };

            // 获取焦点
            editor.onDidFocusEditorText(() => {
              decorationsCollection?.clear();
            });

            // 失去焦点
            editor.onDidBlurEditorText(() => {
              createDecorationsCollection();
            });

            // 监听值的变化
            editor.onDidChangeModelContent(() => {
              if (!hasEnableEdit.value) {
                currentVal.value = editor!.getValue();
                emit('change', currentVal.value);
              }
            });

            window.addEventListener('resize', () => {
              editor!.layout();
            });
          })
          .catch(() => {
            isLoading.value = false;
          });
      });
    };

    // 更改编辑状态
    const changeEditState = () => {
      readonlyState.value = !readonlyState.value;
      if (!editor) return;
      if (!readonlyState.value) {
        editor.updateOptions({
          readOnly: false,
        });
      } else {
        editor.updateOptions({
          readOnly: true,
        });
      }
    };

    // 更新全屏状态
    const changeFullScreenState = async () => {
      currentVal.value = String(editor?.getValue());
      unload();
      isFullScreen.value = !isFullScreen.value;
      editorInit();
    };

    // 绘制全屏图标
    const isAllowRenderFullScreen = () => {
      if (enableFullScreen.value)
        return (
          <span
            class={ns.be('toolbar', 'fullscreen')}
            title={ibiz.i18n.t(
              `editor.common.${isFullScreen.value ? 'minimize' : 'fullscreen'}`,
            )}
            onClick={() => changeFullScreenState()}
          >
            {isFullScreen.value ? (
              <i class='ch-icon ch-icon-minscreen' />
            ) : (
              <i class='ch-icon ch-icon-fullscreen'></i>
            )}
          </span>
        );
      return null;
    };

    // 绘制取消消息盒子
    const renderCancelMessage = () => {
      return (
        <div class={ns.be('message', 'message-content')}>
          <p>{ibiz.i18n.t('editor.common.confirmCancelPrompt')}</p>
          <p class={ns.bem('message', 'message-content', 'message-tip')}>
            {ibiz.i18n.t('editor.common.cancelEditPrompt')}
          </p>
        </div>
      );
    };

    // 取消编辑
    const cancelEdit = () => {
      if (props.value !== editor?.getValue()) {
        ElMessageBox({
          title: ibiz.i18n.t('editor.common.confirmCancel'),
          type: 'warning',
          customClass: ns.b('message'),
          message: renderCancelMessage(),
          showCancelButton: true,
          cancelButtonClass: ns.be('message', 'message-cancel'),
          confirmButtonClass: ns.be('message', 'message-comfire'),
        })
          .then(() => {
            editor?.setValue(String(props.value || ''));
            changeEditState();
          })
          .catch(() => {
            // 重新聚焦
            editor?.focus();
          });
      } else {
        changeEditState();
      }
    };

    // 确认保存
    const save = () => {
      changeEditState();
      if (editor) {
        currentVal.value = editor!.getValue();
        emit('change', currentVal.value);
      }
      if (isFullScreen.value) {
        changeFullScreenState();
      }
    };

    // 绘制底部取消确认按钮
    const renderFooter = () => {
      if (hasEnableEdit.value) {
        return (
          <div
            class={[
              ns.b('footer'),
              { [ns.b('footer-dialog')]: isFullScreen.value },
            ]}
          >
            <div class={ns.be('footer', 'cancel')} onClick={() => cancelEdit()}>
              {ibiz.i18n.t('app.cancel')}
            </div>
            <div class={ns.be('footer', 'save')} onClick={() => save()}>
              {ibiz.i18n.t('app.save')}
            </div>
          </div>
        );
      }
      return null;
    };

    // 绘制头部工具栏
    const renderHeaderToolbar = () => {
      if (hasEnableEdit.value || enableFullScreen.value) {
        return (
          <div class={ns.b('toolbar')}>
            {hasEnableEdit.value && enableEdit.value && readonlyState.value ? (
              <i
                class='fa fa-edit'
                aria-hidden='true'
                onClick={() => changeEditState()}
              ></i>
            ) : null}
            {isAllowRenderFullScreen()}
          </div>
        );
      }
      return null;
    };

    // 绘制代码框内容
    const renderCodeContent = () => {
      return (
        <div
          ref={codeEditBox}
          class={ns.e('box')}
          style={{ [ns.cssVarBlockName('placeholder')]: `"${c.placeHolder}"` }}
        ></div>
      );
    };

    onMounted(() => {
      editorInit();
    });

    onUnmounted(() => {
      unload();
    });

    return {
      ns,
      currentVal,
      codeEditBox,
      isFullScreen,
      hasEnableEdit,
      readonlyState,
      isLoading,
      renderFooter,
      renderHeaderToolbar,
      renderCodeContent,
      changeFullScreenState,
    };
  },
  render() {
    const isLoading = !this.controller.view?.state?.isLoading && this.isLoading;
    return !this.isFullScreen ? (
      <div
        class={[
          this.ns.b(),
          { [this.ns.b('editor-readonly')]: this.readonlyState },
          { [this.ns.b('editor-enable')]: !this.readonlyState },
          this.ns.is('enable', this.hasEnableEdit),
        ]}
        v-loading={isLoading}
      >
        {this.renderHeaderToolbar()}
        {this.renderCodeContent()}
        {this.hasEnableEdit && !this.readonlyState ? this.renderFooter() : null}
      </div>
    ) : (
      <el-dialog
        v-model={this.isFullScreen}
        class={this.ns.b('dialog-full-screen')}
        onClose={() => this.changeFullScreenState()}
      >
        <div
          class={[
            this.ns.b(),
            { [this.ns.b('editor-readonly')]: this.readonlyState },
            { [this.ns.b('editor-enable')]: !this.readonlyState },
          ]}
          v-loading={isLoading}
        >
          {this.renderHeaderToolbar()}
          {this.renderCodeContent()}
          {this.hasEnableEdit && !this.readonlyState
            ? this.renderFooter()
            : null}
        </div>
      </el-dialog>
    );
  },
});
