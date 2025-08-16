import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ListWriter } from './list-writer';

export class DEListWriter extends ListWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEList = src

    _.w(d, 'emptyText', s);
    _.v(
      d,
      'emptyTextLanguageRes',
      c.s('res.LanguageRes[]', s, 'getEmptyTextPSLanguageRes'),
    );
    _.w(d, 'groupMode', s);
    _.x(d, 'groupAppDEFieldId', s, 'getGroupPSAppDEField');
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
    _.v(
      d,
      'itemLayoutPanel',
      c.s('control.panel.LayoutPanel[]', s, 'getItemPSLayoutPanel'),
    );
    _.w(d, 'minorSortDir', s);
    _.x(d, 'minorSortAppDEFieldId', s, 'getMinorSortPSAppDEField');
    _.w(d, 'mobListStyle', s);
    _.x(d, 'orderValueAppDEFieldId', s, 'getOrderValuePSAppDEField');
    _.v(
      d,
      'delistDataItems',
      c.m('control.list.DEListDataItem[]', s, 'getPSDEListDataItems'),
    );
    _.v(
      d,
      'delistItems',
      c.m('control.list.DEListItem[]', s, 'getPSDEListItems'),
    );
    _.w(d, 'pagingMode', s, '', 0);
    _.w(d, 'pagingSize', s);
    _.x(d, 'swimlaneAppDEFieldId', s, 'getSwimlanePSAppDEField');
    _.x(d, 'swimlaneCodeListId', s, 'getSwimlanePSCodeList');
    _.w(d, 'hasWFDataItems', s);
    _.w(d, 'enableGroup', s);
    _.w(d, 'enablePagingBar', s);
    _.w(d, 'enableRowEdit', s);
    _.w(d, 'enableRowEditGroup', s);
    _.w(d, 'enableRowEditOrder', s);
    _.w(d, 'enableRowNew', s);
    _.w(d, 'noSort', s);
    _.w(d, 'showHeader', s);
    _.w(d, 'singleSelect', s);

    super.onFillDSL(c, s, d);
  }
}
