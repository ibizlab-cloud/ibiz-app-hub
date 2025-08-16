import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../../model-object-writer';

export class HiddenDETreeNodeEditItemWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDETreeNodeEditItem = src

    _.w(d, 'createDV', s);
    _.w(d, 'createDVT', s);
    _.w(d, 'enableCond', s);
    _.w(d, 'ignoreInput', s);
    _.w(d, 'outputCodeListConfigMode', s, '', 0);
    _.x(d, 'appDEFieldId', s, 'getPSAppDEField');
    _.v(d, 'editor', c.s('control.Editor[]', s, 'getPSEditor'));
    _.w(d, 'resetItemNames', s, 'resetItemNames');
    _.w(d, 'unitName', s);
    _.w(d, 'unitNameWidth', s, '', 0);
    _.w(d, 'updateDV', s);
    _.w(d, 'updateDVT', s);
    _.w(d, 'allowEmpty', s);
    _.w(d, 'convertToCodeItemText', s);
    _.w(d, 'enableUnitName', s);
    _.w(d, 'needCodeListConfig', s);

    super.onFillDSL(c, s, d);
  }
}
