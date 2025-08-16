import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { RawItemWriterBase } from './raw-item-writer-base';

export class MarkdownItemWriter extends RawItemWriterBase {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSMarkdownItem = src

    _.w(d, 'content', s);

    super.onFillDSL(c, s, d);
  }
}
