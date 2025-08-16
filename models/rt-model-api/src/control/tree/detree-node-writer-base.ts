import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ControlItemWriter } from '../control-item-writer';

export class DETreeNodeWriterBase extends ControlItemWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDETreeNode = src

    _.w(d, 'accUserMode', s, '', 0);
    _.w(d, 'accessKey', s);
    _.w(d, 'counterId', s);
    _.w(d, 'counterMode', s);
    _.w(d, 'dynaClass', s);
    _.w(d, 'modelObj', s);
    _.v(
      d,
      'nameLanguageRes',
      c.s('res.LanguageRes[]', s, 'getNamePSLanguageRes'),
    );
    _.w(d, 'navFilter', s);
    _.x(d, 'navAppViewId', s, 'getNavPSAppView');
    _.v(d, 'navDER', c.s('dataentity.der.DERBase[]', s, 'getNavPSDER'));
    _.w(d, 'navViewParamJO', s);
    _.w(d, 'nodeType', s);
    _.x(d, 'appDataEntityId', s, 'getPSAppDataEntity');
    _.v(
      d,
      'decontextMenu',
      c.s('control.toolbar.DEContextMenu[]', s, 'getPSDEContextMenu'),
    );
    _.v(
      d,
      'detreeNodeColumns',
      c.m('control.tree.DETreeNodeColumn[]', s, 'getPSDETreeNodeColumns'),
    );
    _.v(
      d,
      'detreeNodeDataItems',
      c.m('control.tree.DETreeNodeDataItem[]', s, 'getPSDETreeNodeDataItems'),
    );
    _.v(
      d,
      'detreeNodeEditItems',
      c.m('control.tree.DETreeNodeEditItem[]', s, 'getPSDETreeNodeEditItems'),
    );
    _.v(
      d,
      'detreeNodeRVs',
      c.m('control.tree.DETreeNodeRV[]', s, 'getPSDETreeNodeRVs'),
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
    _.v(d, 'sysCss', c.s('res.SysCss[]', s, 'getPSSysCss'));
    _.v(d, 'sysImage', c.s('res.SysImage[]', s, 'getPSSysImage'));
    _.x(d, 'sysPFPluginId', s, 'getPSSysPFPlugin');
    _.w(d, 'shapeDynaClass', s);
    _.v(d, 'shapeSysCss', c.s('res.SysCss[]', s, 'getShapePSSysCss'));
    _.w(d, 'treeNodeType', s);
    _.w(d, 'hasDETreeNodeRSs', s, 'hasPSDETreeNodeRSs');
    _.w(d, 'allowDrag', s);
    _.w(d, 'allowDrop', s);
    _.w(d, 'allowEditText', s);
    _.w(d, 'allowOrder', s);
    _.w(d, 'appendPNodeId', s);
    _.w(d, 'disableSelect', s);
    _.w(d, 'enableCheck', s);
    _.w(d, 'enableEditData', s);
    _.w(d, 'enableNewData', s);
    _.w(d, 'enableQuickCreate', s);
    _.w(d, 'enableQuickSearch', s);
    _.w(d, 'enableRemoveData', s);
    _.w(d, 'enableRowEdit', s);
    _.w(d, 'enableRowEditChangedOnly', s);
    _.w(d, 'enableViewData', s);
    _.w(d, 'expandFirstOnly', s);
    _.w(d, 'expanded', s);
    _.w(d, 'rootNode', s);
    _.w(d, 'selectFirstOnly', s);
    _.w(d, 'selected', s);

    super.onFillDSL(c, s, d);
  }
}
