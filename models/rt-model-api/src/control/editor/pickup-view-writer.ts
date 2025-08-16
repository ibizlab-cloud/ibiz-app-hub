import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ValueItemEditorWriter } from './value-item-editor-writer';

export class PickupViewWriter extends ValueItemEditorWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSPickupView = src

    _.w(d, 'contextJOString', s);
    _.w(d, 'itemParamJO', s);
    _.w(d, 'paramJOString', s);
    _.x(d, 'pickupAppViewId', s, 'getPickupPSAppView');

    super.onFillDSL(c, s, d);
  }
}
