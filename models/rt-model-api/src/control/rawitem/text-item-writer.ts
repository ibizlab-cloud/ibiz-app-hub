import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { RawItemWriterBase } from './raw-item-writer-base';

export class TextItemWriter extends RawItemWriterBase {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSTextItem = src

    _.w(d, 'caption', s);
    _.w(d, 'halign', s, 'hAlign', 'LEFT');
    _.w(d, 'renderMode', s);
    _.w(d, 'valign', s, 'vAlign', 'MIDDLE');
    _.w(d, 'wrapMode', s, '', 'NOWRAP');

    super.onFillDSL(c, s, d);
  }
}
