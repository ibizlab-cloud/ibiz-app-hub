import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../../model-object-writer';

export class DETreeNodeRVWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDETreeNodeRV = src

    _.v(
      d,
      'navigateContexts',
      c.m('control.NavigateContext[]', s, 'getPSNavigateContexts'),
    );
    _.v(
      d,
      'navigateParams',
      c.m('control.NavigateParam[]', s, 'getPSNavigateParams'),
    );
    _.x(d, 'refAppViewId', s, 'getRefPSAppView');

    super.onFillDSL(c, s, d);
  }
}
