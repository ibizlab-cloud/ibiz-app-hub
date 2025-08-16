import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { EditorWriter } from '../editor-writer';

export class RawWriter extends EditorWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSRaw = src

    _.w(d, 'contentType', s, '', 'RAW');
    _.w(d, 'template', s);

    super.onFillDSL(c, s, d);
  }
}
