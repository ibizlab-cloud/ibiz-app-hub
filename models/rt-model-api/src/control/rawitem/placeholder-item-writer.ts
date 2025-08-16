import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { RawItemWriterBase } from './raw-item-writer-base';

export class PlaceholderItemWriter extends RawItemWriterBase {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSPlaceholderItem = src

    _.w(d, 'caption', s);
    _.w(d, 'content', s);

    super.onFillDSL(c, s, d);
  }
}
