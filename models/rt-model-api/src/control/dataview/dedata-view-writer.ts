import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { MDAjaxControlContainerWriter2 } from '../mdajax-control-container-writer2';

export class DEDataViewWriter extends MDAjaxControlContainerWriter2 {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEDataView = src

    _.w(d, 'cardColLG', s);
    _.w(d, 'cardColMD', s);
    _.w(d, 'cardColSM', s);
    _.w(d, 'cardColXS', s);
    _.w(d, 'cardHeight', s, '', 0);
    _.w(d, 'cardWidth', s, '', 0);
    _.w(d, 'emptyText', s);
    _.v(
      d,
      'emptyTextLanguageRes',
      c.s('res.LanguageRes[]', s, 'getEmptyTextPSLanguageRes'),
    );
    _.w(d, 'groupColLG', s);
    _.w(d, 'groupColMD', s);
    _.w(d, 'groupColSM', s);
    _.w(d, 'groupColXS', s);
    _.w(d, 'groupHeight', s, '', 0);
    _.w(d, 'groupLayout', s);
    _.w(d, 'groupMode', s);
    _.v(
      d,
      'groupMoveControlAction',
      c.s('control.ControlAction[]', s, 'getGroupMovePSControlAction'),
    );
    _.x(d, 'groupAppDEFieldId', s, 'getGroupPSAppDEField');
    _.x(d, 'groupAppDataEntityId', s, 'getGroupPSAppDataEntity');
    _.x(d, 'groupCodeListId', s, 'getGroupPSCodeList');
    _.v(d, 'groupSysCss', c.s('res.SysCss[]', s, 'getGroupPSSysCss'));
    _.x(d, 'groupSysPFPluginId', s, 'getGroupPSSysPFPlugin');
    _.v(
      d,
      'groupUIActionGroup',
      c.s('view.UIActionGroup[]', s, 'getGroupPSUIActionGroup'),
    );
    _.w(d, 'groupStyle', s, '', 'DEFAULT');
    _.x(d, 'groupTextAppDEFieldId', s, 'getGroupTextPSAppDEField');
    _.w(d, 'groupWidth', s, '', 0);
    _.v(
      d,
      'itemLayoutPanel',
      c.s('control.panel.LayoutPanel[]', s, 'getItemPSLayoutPanel'),
    );
    _.v(d, 'itemSysCss', c.s('res.SysCss[]', s, 'getItemPSSysCss'));
    _.x(d, 'itemSysPFPluginId', s, 'getItemPSSysPFPlugin');
    _.w(d, 'minorSortDir', s);
    _.x(d, 'minorSortAppDEFieldId', s, 'getMinorSortPSAppDEField');
    _.x(d, 'orderValueAppDEFieldId', s, 'getOrderValuePSAppDEField');
    _.v(
      d,
      'dedataViewDataItems',
      c.m(
        'control.dataview.DEDataViewDataItem[]',
        s,
        'getPSDEDataViewDataItems',
      ),
    );
    _.v(
      d,
      'dedataViewItems',
      c.m('control.dataview.DEDataViewItem[]', s, 'getPSDEDataViewItems'),
    );
    _.w(d, 'pagingMode', s, '', 0);
    _.w(d, 'pagingSize', s);
    _.x(d, 'swimlaneAppDEFieldId', s, 'getSwimlanePSAppDEField');
    _.x(d, 'swimlaneCodeListId', s, 'getSwimlanePSCodeList');
    _.w(d, 'hasWFDataItems', s);
    _.w(d, 'appendDEItems', s);
    _.w(d, 'enableCardEdit', s);
    _.w(d, 'enableCardEditGroup', s);
    _.w(d, 'enableCardEditOrder', s);
    _.w(d, 'enableCardNew', s);
    _.w(d, 'enableGroup', s);
    _.w(d, 'enablePagingBar', s);
    _.w(d, 'noSort', s);
    _.w(d, 'singleSelect', s);

    super.onFillDSL(c, s, d);
  }
}
