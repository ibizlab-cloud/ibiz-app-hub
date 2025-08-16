import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../../model-object-writer';

export class DETreeNodeRSWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDETreeNodeRS = src

    _.x(d, 'childDETreeNodeId', s, 'getChildPSDETreeNode');
    _.v(
      d,
      'detreeNodeRSParams',
      c.m('control.tree.DETreeNodeRSParam[]', s, 'getPSDETreeNodeRSParams'),
    );
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
    _.w(d, 'parentFilter', s);
    _.x(d, 'parentAppDEFieldId', s, 'getParentPSAppDEField');
    _.v(d, 'parentDER1N', c.s('dataentity.der.DER1N[]', s, 'getParentPSDER1N'));
    _.x(d, 'parentDETreeNodeId', s, 'getParentPSDETreeNode');
    _.w(d, 'parentValueLevel', s);
    _.w(d, 'searchMode', s);

    super.onFillDSL(c, s, d);
  }
}
