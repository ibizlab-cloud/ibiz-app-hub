import {
  IViewController,
  IIndexViewState,
  IViewEvent,
  IAppMenuController,
  ViewEngineBase,
} from '@ibiz-template/runtime';
import { IAppIndexView } from '@ibiz/model-core';

export class IndexViewEngine extends ViewEngineBase {
  protected declare view: IViewController<
    IAppIndexView,
    IIndexViewState,
    IViewEvent
  >;

  get appmenu(): IAppMenuController {
    return this.view.getController('appmenu') as IAppMenuController;
  }
}
