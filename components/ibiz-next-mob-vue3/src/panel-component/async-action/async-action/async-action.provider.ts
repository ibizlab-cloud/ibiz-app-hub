import { IPortalAsyncAction } from '@ibiz-template/core';
import { IAsyncActionProvider, IModal } from '@ibiz-template/runtime';
import { VNode, h } from 'vue';
import { isNil, isObject } from 'lodash-es';
import { AsyncActionPreview } from '../async-action-preview/async-action-preview';
import { AsyncActionResult } from '../async-action-result/async-action-result';
import { AsyncAction } from './async-action';

export class AsyncActionProvider implements IAsyncActionProvider {
  component = AsyncAction;

  render(props: IData & { action: IPortalAsyncAction }): VNode {
    return h(this.component, {
      provider: this,
      ...props,
    });
  }

  async onClick(
    asyncAction: IPortalAsyncAction,
    _event: MouseEvent,
  ): Promise<boolean> {
    if (isNil(asyncAction.actiontype)) {
      // 打开模态展示，由于是动态路由，添加其他路由，会导致模版出现问题
      ibiz.overlay.modal(
        (modal: IModal) => {
          return h(AsyncActionResult, {
            asyncAction,
            modal,
          });
        },
        {},
        { width: '100%', height: '100%' },
      );
      return true;
    }
    // actionresult有值且是对象时才能打开详情页面
    if (isObject(asyncAction.actionresult)) {
      // 打开模态展示，由于是动态路由，添加其他路由，会导致模版出现问题
      ibiz.overlay.modal(
        (modal: IModal) => {
          return h(AsyncActionPreview, {
            asyncAction,
            modal,
          });
        },
        {},
        { width: '100%', height: '100%' },
      );
      return true;
    }
    return false;
  }
}
