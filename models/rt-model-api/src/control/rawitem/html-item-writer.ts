import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { RawItemWriterBase } from './raw-item-writer-base';

export class HtmlItemWriter extends RawItemWriterBase {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSHtmlItem = src

    _.w(d, 'content', s);

    super.onFillDSL(c, s, d);
  }
}
