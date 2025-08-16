import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { MDAjaxControlContainerWriter2 } from '../mdajax-control-container-writer2';

export class DETreeWriter extends MDAjaxControlContainerWriter2 {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDETree = src

    _.w(d, 'emptyText', s);
    _.v(
      d,
      'emptyTextLanguageRes',
      c.s('res.LanguageRes[]', s, 'getEmptyTextPSLanguageRes'),
    );
    _.w(d, 'frozenFirstColumn', s, '', 0);
    _.w(d, 'frozenLastColumn', s, '', 0);
    _.x(d, 'appCounterRefId', s, 'getPSAppCounterRef');
    _.v(
      d,
      'detreeColumns',
      c.m('control.tree.DETreeColumn[]', s, 'getPSDETreeColumns'),
    );
    _.v(
      d,
      'detreeNodeRSs',
      c.m('control.tree.DETreeNodeRS[]', s, 'getPSDETreeNodeRSs'),
    );
    _.v(
      d,
      'detreeNodes',
      c.m('control.tree.DETreeNode[]', s, 'getPSDETreeNodes'),
    );
    _.w(d, 'treeGridMode', s);
    _.w(d, 'treeStyle', s);
    _.w(d, 'enableEdit', s);
    _.w(d, 'enableRootSelect', s);
    _.w(d, 'outputIconDefault', s);
    _.w(d, 'rootVisible', s);

    super.onFillDSL(c, s, d);
  }
}
