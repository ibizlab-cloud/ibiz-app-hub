import { IModelDSLGenEngineContext } from '../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../model-object-writer';

export class SysImageWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSSysImage = src

    _.w(d, 'codeName', s);
    _.w(d, 'cssClass', s);
    _.w(d, 'cssClassX', s);
    _.w(d, 'glyph', s);
    _.w(d, 'height', s, '', 0);
    _.w(d, 'imagePath', s);
    _.w(d, 'imagePathX', s);
    _.w(d, 'rawContent', s);
    _.w(d, 'width', s, '', 0);

    super.onFillDSL(c, s, d);
  }
}
