import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { AppMenuItemWriterBase } from './app-menu-item-writer-base';

export class AppMenuRawItemWriter extends AppMenuItemWriterBase {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppMenuRawItem = src

    _.v(d, 'rawItem', c.s('control.RawItemBase[]', s, 'getPSRawItem'));

    super.onFillDSL(c, s, d);
  }
}
