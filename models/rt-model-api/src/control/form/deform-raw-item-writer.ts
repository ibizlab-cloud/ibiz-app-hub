import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DEFormDetailWriter } from './deform-detail-writer';

export class DEFormRawItemWriter extends DEFormDetailWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEFormRawItem = src

    _.v(d, 'rawItem', c.s('control.RawItemBase[]', s, 'getPSRawItem'));

    super.onFillDSL(c, s, d);
  }
}
