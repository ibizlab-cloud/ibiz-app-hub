import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../../model-object-writer';

export class LayoutPosWriterBase extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSLayoutPos = src

    _.w(d, 'halignSelf', s, 'hAlignSelf');
    _.w(d, 'height', s);
    _.w(d, 'heightMode', s);
    _.w(d, 'layout', s);
    _.w(d, 'spacingBottom', s);
    _.w(d, 'spacingLeft', s);
    _.w(d, 'spacingRight', s);
    _.w(d, 'spacingTop', s);
    _.w(d, 'valignSelf', s, 'vAlignSelf');
    _.w(d, 'width', s);
    _.w(d, 'widthMode', s);

    super.onFillDSL(c, s, d);
  }
}
