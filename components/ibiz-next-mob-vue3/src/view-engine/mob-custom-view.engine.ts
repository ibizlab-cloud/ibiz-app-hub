import {
  IViewController,
  ViewEngineBase,
  IViewEvent,
  IViewState,
} from '@ibiz-template/runtime';
import { IAppDECustomView } from '@ibiz/model-core';

export class MobCustomViewEngine extends ViewEngineBase {
  protected declare view: IViewController<
    IAppDECustomView,
    IViewState,
    IViewEvent
  >;
}
