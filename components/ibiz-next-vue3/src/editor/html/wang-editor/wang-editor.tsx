/* eslint-disable no-unsafe-finally */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Ref,
  ref,
  watch,
  nextTick,
  onMounted,
  shallowRef,
  onUnmounted,
  defineComponent,
  onBeforeUnmount,
} from 'vue';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
import { IEditorConfig, IToolbarConfig } from '@wangeditor/editor';
import type { IDomEditor } from '@wangeditor/editor';
import { createUUID } from 'qx-util';
import { isNil } from 'ramda';
import {
  getEditorEmits,
  getHtmlProps,
  useNamespace,
  useUIStore,
} from '@ibiz-template/vue3-util';
import {
  IBizContext,
  IChatMessage,
  IPortalAsyncAction,
  StringUtil,
  awaitTimeout,
} from '@ibiz-template/core';
import { SysUIActionTag, UIActionUtil } from '@ibiz-template/runtime';
import { ElMessageBox } from 'element-plus';
import { AxiosProgressEvent } from 'axios';
import { HtmlEditorController } from '../html-editor.controller';
import { calcAiToolbarItemsByAc } from '../../../util';
import './wang-editor.scss';

type InsertFnType = (_url: string, _alt: string, _href: string) => void;

/**
 * HTML编辑框
 *
 * @description 使用wangEditor组件封装，用于富文本编辑。支持编辑器类型包含：`HTML编辑框`
 * @primary
 * @editorparams {"name":"enableedit","parameterType":"boolean","defaultvalue":true,"description":"当该值为 true 时，会显示代码编辑器顶部的工具栏，并且只有点击编辑按钮后才能开启代码编辑功能，否则编辑框默认处于不可编辑状态，常用于需要控制编辑权限的场景"}
 * @editorparams {"name":"enablefullscreen","parameterType":"boolean","defaultvalue":false,"description":"若该值为 true ，会显示代码编辑器顶部的工具栏，并且点击工具栏中的全屏按钮后，编辑框将全屏显示，方便在较大的视野下进行代码编辑工作"}
 * @editorparams {"name":"srfaiappendcurdata","parameterType":"boolean","defaultvalue":false,"description":"在打开AI功能时，该参数用于判断是否传入对象参数，主要用于在请求历史记录时，附加当前参数"}
 * @editorparams {"name":"srfaiappendcurcontent","parameterType":"string","description":"在打开AI功能时，如果该参数存在值，会将其传入编辑内容作为用户消息，主要用于在请求历史记录后，附加当前编辑内容作为用户消息"}
 * @editorparams {"name":"uploadparams","parameterType":"string","description":"上传参数，图片或文件上传时，用于计算上传路径"}
 * @editorparams {"name":"exportparams","parameterType":"string","description":"下载参数，图片或文件下载时，用于计算下载路径"}
 * @editorparams {"name":"osscat","parameterType":"string","description":"用于计算上传和下载路径的OSS参数"}
 * @editorparams {name:ac,parameterType:boolean,defaultvalue:false,description:是否启用ac自填模式}
 * @editorparams {"name":"readonly","parameterType":"boolean","defaultvalue":false,"description":"设置编辑器是否为只读态"}
 * @ignoreprops autoFocus | overflowMode
 * @ignoreemits enter | infoTextChange
 */
const IBizHtml = defineComponent({
  name: 'IBizHtml',
  props: getHtmlProps<HtmlEditorController>(),
  emits: getEditorEmits(),
  setup(props, { emit }) {
    const ns = useNamespace('html');

    const c = props.controller!;

    // HTML ref
    const htmlContent = ref();

    // 样式变量
    const cssVars = ref({});

    // 浏览器ResizeObserver对象
    let resizeObserver: ResizeObserver | null = null;

    // 上次工具栏高度
    let lastToolbarHeight = 0;

    // 工具栏ref
    const toolbarRef = ref();

    // 编辑器实例，必须用 shallowRef，重要！
    const editorRef = shallowRef();

    // 内容 HTML
    const valueHtml = ref('');

    // 请求头
    const uploadHeaders = ibiz.util.file.getUploadHeaders();
    const headers: Ref<IData> = ref({ ...uploadHeaders });

    // 上传文件路径
    const uploadUrl: Ref<string> = ref('');

    // 下载文件路径
    const downloadUrl: Ref<string> = ref('');

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

    if (props.readonly) {
      hasEnableEdit.value = false;
      readonlyState.value = true;
    }

    // data响应式变更基础路径
    watch(
      () => props.data,
      newVal => {
        if (newVal) {
          const editorParams = { ...c.editorParams };
          if (editorParams.uploadparams) {
            editorParams.uploadParams = JSON.parse(editorParams.uploadparams);
          }
          if (editorParams.exportparams) {
            editorParams.exportParams = JSON.parse(editorParams.exportparams);
          }
          const urls = ibiz.util.file.calcFileUpDownUrl(
            c.context,
            c.params,
            newVal,
            editorParams,
          );
          uploadUrl.value = urls.uploadUrl;
          downloadUrl.value = urls.downloadUrl;
        }
      },
      { immediate: true, deep: true },
    );

    // 自定义校验链接
    const customCheckLinkFn = (
      text: string,
      url: string,
    ): string | boolean | undefined => {
      if (!url) {
        return;
      }
      // if (url.indexOf('http') !== 0) {
      //   return '链接必须以 http/https 开头';
      // }
      return true;

      // 返回值有三种选择：
      // 1. 返回 true ，说明检查通过，编辑器将正常插入链接
      // 2. 返回一个字符串，说明检查未通过，编辑器会阻止插入。会 alert 出错误信息（即返回的字符串）
      // 3. 返回 undefined（即没有任何返回），说明检查未通过，编辑器会阻止插入。但不会提示任何信息
    };

    // 自定义转换链接 url
    const customParseLinkUrl = (url: string): string => {
      // if (url.indexOf('http') !== 0) {
      //   return `http://${url}`;
      // }
      return url;
    };

    // 工具栏配置
    const toolbarConfig: Partial<IToolbarConfig> = {
      excludeKeys: ['group-video', 'emotion'],
      insertKeys: {
        index: 60,
        keys: c.chatCompletion ? ['emoji', '|', 'aichart'] : ['emoji'],
      },
    };

    // 编辑器配置
    const editorConfig: Partial<IEditorConfig> = {
      placeholder: c.placeHolder,
      readOnly: hasEnableEdit.value ? readonlyState.value : props.readonly,
      MENU_CONF: {
        // 图片上传
        uploadImage: {
          // 上传地址
          server: uploadUrl.value,

          // form-data fieldName ，默认值 'wangeditor-uploaded-image'
          fieldName: 'file',

          // 单个文件的最大体积限制，默认为 2M
          maxFileSize: 10 * 1024 * 1024, // 10M

          // 最多可上传几个文件，默认为 100
          maxNumberOfFiles: 10,

          // 选择文件时的类型限制，默认为 ['image/*'] 。如不想限制，则设置为 []
          allowedFileTypes: [],

          // 自定义增加 http  header
          headers: headers.value,

          // 跨域是否传递 cookie ，默认为 false
          withCredentials: true,

          // 上传之前触发
          onBeforeUpload(file: File) {
            // TS 语法
            // onBeforeUpload(file) {    // JS 语法
            // file 选中的文件，格式如 { key: file }
            return file;

            // 可以 return
            // 1. return file 或者 new 一个 file ，接下来将上传
            // 2. return false ，不上传这个 file
          },

          // 上传进度的回调函数
          onProgress(progress: number) {
            console.log('progress', progress);
          },

          // 单个文件上传成功之后
          onSuccess(file: File, res: IData) {
            console.log(`${file.name} 上传成功`, res);
          },

          // 单个文件上传失败
          onFailed(file: File, res: IData) {
            console.log(`${file.name} 上传失败`, res);
          },

          // 上传错误，或者触发 timeout 超时
          onError(file: File, err: IData, res: IData) {
            console.log(`${file.name} 上传出错`, err, res);
          },

          // 自定义插入图片
          async customInsert(res: IData, insertFn: InsertFnType) {
            const url = downloadUrl.value.replace('%fileId%', res.id);
            const alt = res.filename;
            // 从 res 中找到 url alt href ，然后插入图片
            insertFn(url, alt, '');
          },
        },
        // 插入链接
        insertLink: {
          checkLink: customCheckLinkFn, // 也支持 async 函数
          parseLinkUrl: customParseLinkUrl, // 也支持 async 函数
        },
        // 更新链接
        editLink: {
          checkLink: customCheckLinkFn, // 也支持 async 函数
          parseLinkUrl: customParseLinkUrl, // 也支持 async 函数
        },
      },
    };

    // 组件销毁时，也及时销毁编辑器，重要！
    onBeforeUnmount(() => {
      const editor = editorRef.value;
      if (editor == null) return;

      editor.destroy();
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let chatInstance: any;

    const onClickAI = async () => {
      const appDataEntityId = c.model.appDataEntityId;
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
          appDataEntityId,
          contentToolbarItems: contentToolbarItems as any,
          footerToolbarItems: footerToolbarItems as any,
          questionToolbarItems: questionToolbarItems as any,
          otherToolbarItems: otherToolbarItems as any,
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
              if (hasEnableEdit.value) {
                valueHtml.value = message.realcontent || '';
              } else {
                emit('change', message.realcontent);
              }
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
              const fielUploadHeaders = ibiz.util.file.getUploadHeaders();
              const formData = new FormData();
              formData.append('file', file);
              const res = await ibiz.net.axios({
                url: fileMeata.uploadUrl,
                method: 'post',
                headers: fielUploadHeaders,
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

    // 编辑器回调函数
    // 编辑器创建完毕时的回调函数
    const handleCreated = (editor: IDomEditor) => {
      editorRef.value = editor; // 记录 editor 实例，重要！
      c.onCreated(editorRef.value);
      editor.setHtml(valueHtml.value);
      // 配置菜单
      // setTimeout(() => {
      //   const toolbar = DomEditor.getToolbar(editor);
      //   const curToolbarConfig = toolbar?.getConfig();
      //   console.log(curToolbarConfig?.toolbarKeys); // 当前菜单排序和分组
      // }, 3000);

      editor.on('aiClick', () => {
        onClickAI();
      });
    };
    // 编辑器内容、选区变化时的回调函数
    const handleChange = (editor: IDomEditor) => {
      // console.log('change:', editor.getHtml());
      const html = editor.getHtml();
      // wangEditor初始值抛空字符串给后台
      const emitValue = html === '<p><br></p>' ? '' : html;
      if (
        emitValue === props.value ||
        (emitValue === '' && isNil(props.value))
      ) {
        return;
      }
      // 修复初始化有值编辑器也会抛值导致表单脏值检查异常问题
      if (!hasEnableEdit.value && editor.isFocused()) {
        emit('change', emitValue);
      }
    };
    // 编辑器销毁时的回调函数。调用 editor.destroy() 即可销毁编辑器
    const handleDestroyed = (_editor: IDomEditor) => {
      // console.log('destroyed', _editor);
    };
    // 编辑器 focus 时的回调函数
    const handleFocus = (_editor: IDomEditor) => {
      // console.log('focus', _editor);
      emit('focus');
    };
    // 编辑器 blur 时的回调函数。
    const handleBlur = (_editor: IDomEditor) => {
      // console.log('blur', _editor);
      emit('blur');
    };
    // 自定义编辑器 alert
    const customAlert = (info: string, type: string) => {
      // eslint-disable-next-line no-alert
      alert(
        `【${ibiz.i18n.t(
          'editor.html.wangEditor.customTips',
        )}】${type} - ${info}`,
      );
    };
    // 自定义粘贴。可阻止编辑器的默认粘贴，实现自己的粘贴逻辑
    const customPaste = (
      editor: IDomEditor,
      event: ClipboardEvent,
      callback: (_n: boolean) => void,
    ) => {
      // 返回值（注意，vue 事件的返回值，不能用 return）
      // callback(false); // 返回 false ，阻止默认粘贴行为
      callback(true); // 返回 true ，继续默认的粘贴行为
    };

    // 插入文本
    const insertText = (str: string) => {
      const editor = editorRef.value;
      if (editor == null) return;

      editor.insertText(str);
    };

    // 获取非格式化的 html
    const printHtml = () => {
      const editor = editorRef.value;
      if (editor == null) return;
      console.log(editor.getHtml());
    };

    // 禁用编辑器
    const disable = () => {
      const editor = editorRef.value;
      if (editor == null) return;
      editor.disable();
    };

    // 取消禁用编辑器
    const enable = () => {
      const editor = editorRef.value;
      if (editor == null) return;
      editor.enable();
    };

    onMounted(() => {
      // 监听值变化赋值
      watch(
        () => props.value,
        (newVal, oldVal) => {
          if (
            newVal !== oldVal &&
            (typeof props.value === 'string' || newVal == null)
          ) {
            if (newVal == null) {
              nextTick(() => {
                valueHtml.value = '';
              });
            } else {
              nextTick(() => {
                valueHtml.value = newVal as string;
              });
            }
          }
        },
        { immediate: true },
      );

      // 监听disabled禁用
      watch(
        () => props.disabled,
        (newVal, oldVal) => {
          if (newVal !== oldVal) {
            if (newVal === true) {
              disable();
            } else {
              enable();
            }
          }
        },
        { immediate: true },
      );
    });

    const calcHtmlStyle = () => {
      awaitTimeout(0, () => {
        if (htmlContent.value && toolbarRef.value) {
          const htmlContentHeight = htmlContent.value.offsetHeight;

          // 监听工具栏高度变化动态去算
          resizeObserver = new ResizeObserver(entries => {
            // 处理组件高度变化
            const height = entries[0].contentRect.height;
            if (height !== lastToolbarHeight) {
              const tempCssVars = {
                height: `${
                  htmlContentHeight -
                  entries[0].contentRect.height +
                  (height !== 0 ? 300 : 0)
                }px`,
              };
              cssVars.value = ns.cssVarBlock(tempCssVars);
              lastToolbarHeight = height;
            }
          });
          resizeObserver.observe(toolbarRef.value.selector);
        }
      });
    };

    // 光标移动到第一行末尾
    const moveToLastStr = () => {
      if (props.value) {
        const index = props.value.indexOf('</p>');
        if (index >= 0) {
          const offset = editorRef.value.selection.anchor?.offset;
          const path = editorRef.value.selection.anchor?.path;
          if (offset === 0 && path.length > 0 && path[0] === 0) {
            editorRef.value.move(index - 3);
          }
        }
      }
    };

    // 更改编辑状态
    const changeEditState = () => {
      readonlyState.value = !readonlyState.value;
      if (!readonlyState.value) {
        enable();
        editorRef.value.focus();
        moveToLastStr();
      } else {
        disable();
      }
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
      if (props.value !== valueHtml.value) {
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
            valueHtml.value = props.value || '';
            changeEditState();
          })
          .catch(() => {
            // 重新聚焦
            editorRef.value.focus();
          });
      } else {
        changeEditState();
      }
    };

    // 确认保存
    const save = () => {
      readonlyState.value = true;
      editorRef.value.disable();
      const value = valueHtml.value;
      emit('change', value);
      if (isFullScreen.value) {
        isFullScreen.value = false;
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

    // 更新全屏状态
    const changeFullScreenState = () => {
      isFullScreen.value = !isFullScreen.value;
      nextTick(() => {
        if (readonlyState.value) {
          disable();
        } else {
          enable();
          editorRef.value.focus();
        }
      });
    };

    // 绘制全屏图标
    const isAllowRenderFullScreen = () => {
      if (enableFullScreen.value) {
        if (isFullScreen.value) {
          return (
            <i
              class='fa fa-compress'
              aria-hidden='true'
              title={ibiz.i18n.t('editor.html.reduce')}
              onClick={() => changeFullScreenState()}
            ></i>
          );
        }
        return (
          <i
            class='fa fa-expand'
            aria-hidden='true'
            title={ibiz.i18n.t('editor.html.expand')}
            onClick={() => changeFullScreenState()}
          ></i>
        );
      }
      return null;
    };

    // 绘制头部工具栏
    const renderHeaserToolbar = () => {
      if (hasEnableEdit.value || enableFullScreen.value) {
        return (
          <div class={ns.b('custom-toolbar')}>
            {hasEnableEdit.value && enableEdit.value && readonlyState.value ? (
              <i
                class='fa fa-edit'
                aria-hidden='true'
                title={ibiz.i18n.t('editor.html.enableedit')}
                onClick={() => changeEditState()}
              ></i>
            ) : null}
            {isAllowRenderFullScreen()}
          </div>
        );
      }
      return null;
    };

    // 绘制编辑器内容
    const renderEditorContent = () => {
      return (
        <div class={ns.b('content')} ref='htmlContent' style={cssVars.value}>
          <Toolbar
            ref='toolbarRef'
            editor={editorRef.value}
            default-config={toolbarConfig}
            mode='default'
            class={ns.b('toolbar')}
          />
          <Editor
            class={[ns.b('editor'), ns.is('readonly', readonlyState.value)]}
            v-model={valueHtml.value}
            default-config={editorConfig}
            mode='default'
            onOnCreated={handleCreated}
            onOnChange={handleChange}
            onOnDestroyed={handleDestroyed}
            onOnFocus={handleFocus}
            onOnBlur={handleBlur}
            oncustomAlert={customAlert}
            oncustomPaste={customPaste}
          />
        </div>
      );
    };

    onMounted(() => {
      calcHtmlStyle();
    });

    onUnmounted(() => {
      c.onDestroyed();
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      if (chatInstance) {
        chatInstance.close();
      }
    });

    return {
      ns,
      editorRef,
      mode: 'default',
      valueHtml,
      toolbarConfig,
      editorConfig,
      handleCreated,
      handleChange,
      handleDestroyed,
      handleFocus,
      handleBlur,
      customAlert,
      customPaste,
      insertText,
      printHtml,
      disable,
      enable,
      renderHeaserToolbar,
      renderEditorContent,
      renderFooter,
      htmlContent,
      hasEnableEdit,
      cssVars,
      toolbarRef,
      isFullScreen,
      readonlyState,
      changeFullScreenState,
    };
  },
  render() {
    return !this.isFullScreen ? (
      <div
        class={[
          this.ns.b(),
          { [this.ns.b('editor-readonly')]: this.readonlyState },
          this.ns.is('show-ai', true),
        ]}
      >
        {this.renderHeaserToolbar()}
        {this.renderEditorContent()}
        {this.hasEnableEdit && !this.readonlyState ? this.renderFooter() : null}
      </div>
    ) : (
      <el-dialog
        v-model={this.isFullScreen}
        width='80%'
        top='10vh'
        class={this.ns.b('dialog-full-screen')}
        onClose={() => this.changeFullScreenState()}
      >
        <div
          class={[
            this.ns.b(),
            { [this.ns.b('editor-readonly')]: this.readonlyState },
          ]}
        >
          {this.renderHeaserToolbar()}
          {this.renderEditorContent()}
          {this.hasEnableEdit && !this.readonlyState
            ? this.renderFooter()
            : null}
        </div>
      </el-dialog>
    );
  },
});

export default IBizHtml;
