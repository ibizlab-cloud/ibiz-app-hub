import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DETreeNodeWriterBase } from './detree-node-writer-base';

export class DETreeStaticNodeWriter extends DETreeNodeWriterBase {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDETreeStaticNode = src

    _.w(d, 'nodeValue', s);
    _.w(d, 'text', s);
    _.w(d, 'tooltip', s);
    _.v(
      d,
      'tooltipLanguageRes',
      c.s('res.LanguageRes[]', s, 'getTooltipPSLanguageRes'),
    );

    super.onFillDSL(c, s, d);
  }
}
