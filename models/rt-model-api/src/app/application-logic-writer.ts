import { IModelDSLGenEngineContext } from '../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../model-object-writer';

export class ApplicationLogicWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSApplicationLogic = src

    _.w(d, 'eventArg', s);
    _.w(d, 'eventArg2', s);
    _.w(d, 'eventNames', s);
    _.w(d, 'logicTag', s);
    _.w(d, 'logicType', s);
    _.x(d, 'appDataEntityId', s, 'getPSAppDataEntity');
    _.x(d, 'appUILogicId', s, 'getPSAppUILogic');
    _.w(d, 'scriptCode', s);
    _.w(d, 'timer', s, '', 0);
    _.w(d, 'triggerType', s, '', 'APPEVENT');

    super.onFillDSL(c, s, d);
  }
}
