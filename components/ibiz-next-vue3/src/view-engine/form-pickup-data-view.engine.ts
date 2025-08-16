import {
  ViewController,
  IFormPickupDataViewState,
  IFormPickupDataViewEvent,
} from '@ibiz-template/runtime';
import { IAppDEDataView } from '@ibiz/model-core';
import { PickupDataViewEngine } from './pickup-data-view.engine';

export class FormPickupDataViewEngine extends PickupDataViewEngine {
  protected declare view: ViewController<
    IAppDEDataView,
    IFormPickupDataViewState,
    IFormPickupDataViewEvent
  >;
}
