import { h } from 'vue';
import {
  EditorController,
  IAppDEService,
  IModal,
  IModalData,
  IOverlayPopoverContainer,
  getDeACMode,
} from '@ibiz-template/runtime';
import { NOOP, listenJSEvent } from '@ibiz-template/core';
import { IAppDEACMode, IHtml } from '@ibiz/model-core';
import { Boot, IDomEditor } from '@wangeditor/editor';
import { AIMenu, Emoji, EmojiElem, EmojiModule, Plugin } from './wang-editor';

/**
 * html框编辑器控制器
 *
 * @export
 * @class HtmlEditorController
 * @extends {EditorController}
 */
export class HtmlEditorController extends EditorController<IHtml> {
  /**
   * 上传参数
   */
  public uploadParams?: IParams;

  /**
   * 下载参数
   */
  public exportParams?: IParams;

  /**
   * 应用实体服务
   *
   * @type {IAppDEService}
   * @memberof HtmlEditorController
   */
  deService?: IAppDEService;

  /**
   * 自填模式
   *
   * @author chitanda
   * @date 2023-10-12 10:10:52
   * @type {IAppDEACMode}
   */
  deACMode?: IAppDEACMode;

  /**
   * AI 聊天自填模式
   *
   * @author chitanda
   * @date 2023-10-12 10:10:37
   * @type {boolean}
   */
  chatCompletion: boolean = false;

  /**
   * wangEditor 实例
   *
   * @private
   * @type {IDomEditor}
   * @memberof HtmlEditorController
   */
  private wangEditor!: IDomEditor;

  /**
   * 气泡容器
   *
   * @type {(IOverlayPopoverContainer | null)}
   * @memberof HtmlEditorController
   */
  private overlay: IOverlayPopoverContainer | null = null;

  /**
   * 清除回调
   *
   * @private
   * @memberof HtmlEditorController
   */
  private cleanup = NOOP;

  /**
   * 预定义阻止捕获事件code
   *
   * @private
   * @type {number[]}
   * @memberof HtmlEditorController
   */
  private presetPreventEvents: number[] = [13, 38, 40];

  /**
   * 预定义阻止冒泡事件code
   *
   * @private
   * @type {number[]}
   * @memberof HtmlEditorController
   */
  private presetPreventPropEvents: number[] = [27];

  /**
   * 初始化
   *
   * @protected
   * @return {*}  {Promise<void>}
   * @memberof HtmlEditorController
   */
  protected async onInit(): Promise<void> {
    await super.onInit();
    this.customRegister();
    if (this.editorParams) {
      const { uploadParams, exportParams, uploadparams, exportparams } =
        this.editorParams;

      if (uploadParams) {
        try {
          this.uploadParams = JSON.parse(uploadParams);
        } catch (error) {
          ibiz.log.error(
            `编辑器[${ibiz.log.error(
              error,
            )}]编辑器参数 uploadParams 非 json 格式`,
          );
        }
      }
      if (uploadparams) {
        try {
          this.uploadParams = JSON.parse(uploadparams);
        } catch (error) {
          ibiz.log.error(
            `编辑器[${ibiz.log.error(
              error,
            )}]编辑器参数 uploadparams 非 json 格式`,
          );
        }
      }
      if (exportParams) {
        try {
          this.exportParams = JSON.parse(exportParams);
        } catch (error) {
          ibiz.log.error(
            `编辑器[${ibiz.log.error(
              error,
            )}]编辑器参数 exportParams 非 json 格式`,
          );
        }
      }
      if (exportparams) {
        try {
          this.exportParams = JSON.parse(exportparams);
        } catch (error) {
          ibiz.log.error(
            `编辑器[${ibiz.log.error(
              error,
            )}]编辑器参数 exportparams 非 json 格式`,
          );
        }
      }
    }
    const model = this.model;
    if (model.appDEACModeId) {
      this.deACMode = await getDeACMode(
        model.appDEACModeId,
        model.appDataEntityId!,
        this.context.srfappid,
      );
      if (this.deACMode) {
        if (this.deACMode.actype === 'CHATCOMPLETION') {
          this.deService = await ibiz.hub
            .getApp(model.appId)
            .deService.getService(this.context, model.appDataEntityId!);
          this.chatCompletion = true;
        }
      }
    }
  }

  /**
   * 自定义注册
   *
   * @private
   * @memberof HtmlEditorController
   */
  private customRegister() {
    // 全局只能注册一次，不要重复注册
    // 注册AI
    if (!(window as IData).aichartRegister && ibiz.env.enableAI) {
      Boot.registerMenu(AIMenu);
      (window as IData).aichartRegister = true;
    }
    // 注册表情相关
    if (!window.customElements.get('emoji-elem')) {
      window.customElements.define('emoji-elem', EmojiElem);
    }
    if (!(window as IData).emojiIsRegiter) {
      Boot.registerModule(EmojiModule);
      (window as IData).emojiIsRegiter = true;
    }
    // 插件相关
    if (!(window as IData).wangEditorPlugin) {
      Boot.registerPlugin(Plugin);
      (window as IData).wangEditorPlugin = true;
    }
  }

  /**
   * wangEditor 创建完成
   *
   * @private
   * @param {IDomEditor} editor
   * @memberof HtmlEditorController
   */
  onCreated(editor: IDomEditor): void {
    this.wangEditor = editor;
    this.listenEvent();
  }

  /**
   * 监听事件
   *
   * @private
   * @memberof HtmlEditorController
   */
  private listenEvent() {
    const container = this.wangEditor.getEditableContainer();
    this.wangEditor.on('openEmojiSelect', () => this.openEmojiSelect());
    this.cleanup = listenJSEvent(container, 'keydown', event => {
      if (this.overlay && this.presetPreventEvents.includes(event.keyCode)) {
        event.preventDefault();
      }
      // 监听esc按键，销毁弹框
      if (
        this.overlay &&
        this.presetPreventPropEvents.includes(event.keyCode)
      ) {
        event.stopPropagation();
        this.overlay?.dismiss();
      }
    });
  }

  /**
   * 打开表情选择
   *
   * @memberof HtmlEditorController
   */
  private async openEmojiSelect(): Promise<void> {
    const domSelection = document.getSelection()!;
    const { focusNode } = domSelection;
    if (focusNode) {
      this.overlay = ibiz.overlay.createPopover(
        (modal: IModal) => {
          return h(Emoji, {
            modal,
          });
        },
        undefined,
        {
          width: 'auto',
          noArrow: true,
          autoClose: true,
          placement: 'bottom-start',
        },
      );
      await this.overlay.present(focusNode.parentNode as HTMLElement);
      this.overlay.onWillDismiss().then(result => {
        const _result = result as IModalData;
        const item = _result.data?.[0];
        if (_result.ok && item) {
          this.addEmojiNode(item);
        }
        this.overlay = null;
      });
    }
  }

  /**
   * 添加表情
   *
   * @param {string} data
   * @memberof HtmlEditorController
   */
  private addEmojiNode(data: IData): void {
    const emojiNode = {
      data,
      type: 'emoji',
      children: [{ text: '' }],
    };
    this.wangEditor.restoreSelection();
    this.wangEditor.insertNode(emojiNode);
    this.wangEditor.move(1);
  }

  /**
   * 销毁
   *
   * @private
   * @memberof HtmlEditorController
   */
  onDestroyed(): void {
    if (this.cleanup !== NOOP) {
      this.cleanup();
    }
    if (this.overlay) {
      this.overlay.dismiss();
    }
  }
}
