import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { SysPanelItemWriter } from './sys-panel-item-writer';

export class SysPanelFieldWriter extends SysPanelItemWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSSysPanelField = src

    _.w(d, 'fieldStates', s, '', 0);
    _.w(d, 'outputCodeListConfigMode', s, '', 0);
    _.v(d, 'editor', c.s('control.Editor[]', s, 'getPSEditor'));
    _.w(d, 'resetItemNames', s, 'resetItemNames');
    _.w(d, 'valueFormat', s);
    _.w(d, 'viewFieldName', s);
    _.w(d, 'allowEmpty', s, '', true);
    _.w(d, 'convertToCodeItemText', s);
    _.w(d, 'hidden', s);
    _.w(d, 'needCodeListConfig', s);

    super.onFillDSL(c, s, d);
  }
}
