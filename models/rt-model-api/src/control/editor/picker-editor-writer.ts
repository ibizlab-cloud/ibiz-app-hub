import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ValueItemEditorWriter } from './value-item-editor-writer';

export class PickerEditorWriter extends ValueItemEditorWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSPickerEditor = src

    _.w(d, 'contextJOString', s);
    _.w(d, 'itemParamJO', s);
    _.w(d, 'paramJOString', s);
    _.x(d, 'pickupAppViewId', s, 'getPickupPSAppView');

    //let iPSAutoComplete = src

    _.w(d, 'acminChars', s, 'aCMinChars', 0);
    _.w(d, 'handlerType', s);
    _.x(d, 'appDEACModeId', s, 'getPSAppDEACMode');
    _.x(d, 'appDEDataSetId', s, 'getPSAppDEDataSet');
    _.x(d, 'appDataEntityId', s, 'getPSAppDataEntity');
    _.v(
      d,
      'uiactionGroup',
      c.s('view.UIActionGroup[]', s, 'getPSUIActionGroup'),
    );
    _.w(d, 'enableAC', s);
    _.w(d, 'forceSelection', s);
    _.w(d, 'showTrigger', s);

    super.onFillDSL(c, s, d);
  }
}
