import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { RawItemWriterBase } from './raw-item-writer-base';

export class ImageItemWriter extends RawItemWriterBase {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSImageItem = src

    _.w(d, 'alternativeText', s);
    _.w(d, 'fitMode', s);
    _.v(d, 'sysImage', c.s('res.SysImage[]', s, 'getPSSysImage'));
    _.w(d, 'placeCenter', s);

    super.onFillDSL(c, s, d);
  }
}
