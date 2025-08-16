import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DEDRCtrlItemWriter } from './dedrctrl-item-writer';

export class DEDRBarItemWriter extends DEDRCtrlItemWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEDRBarItem = src

    _.x(d, 'dedrbarGroupId', s, 'getPSDEDRBarGroup');

    super.onFillDSL(c, s, d);
  }
}
