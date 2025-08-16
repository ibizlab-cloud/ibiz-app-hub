import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { MDAjaxControlContainerWriter2 } from '../mdajax-control-container-writer2';

export class DEGridWriter extends MDAjaxControlContainerWriter2 {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEGrid = src

    _.w(d, 'aggMode', s);
    _.x(d, 'aggAppDEDataSetId', s, 'getAggPSAppDEDataSet');
    _.x(d, 'aggAppDataEntityId', s, 'getAggPSAppDataEntity');
    _.v(
      d,
      'aggLayoutPanel',
      c.s('control.panel.LayoutPanel[]', s, 'getAggPSLayoutPanel'),
    );
    _.w(d, 'columnEnableFilter', s);
    _.w(d, 'columnEnableLink', s);
    _.w(d, 'emptyText', s);
    _.v(
      d,
      'emptyTextLanguageRes',
      c.s('res.LanguageRes[]', s, 'getEmptyTextPSLanguageRes'),
    );
    _.w(d, 'frozenFirstColumn', s, '', 0);
    _.w(d, 'frozenLastColumn', s, '', 0);
    _.w(d, 'gridStyle', s);
    _.w(d, 'groupMode', s);
    _.x(d, 'groupAppDEFieldId', s, 'getGroupPSAppDEField');
    _.x(d, 'groupCodeListId', s, 'getGroupPSCodeList');
    _.w(d, 'groupStyle', s, '', 'DEFAULT');
    _.x(d, 'groupTextAppDEFieldId', s, 'getGroupTextPSAppDEField');
    _.w(d, 'minorSortDir', s);
    _.x(d, 'minorSortAppDEFieldId', s, 'getMinorSortPSAppDEField');
    _.x(d, 'orderValueAppDEFieldId', s, 'getOrderValuePSAppDEField');
    _.v(
      d,
      'degridColumns',
      c.m('control.grid.DEGridColumn[]', s, 'getPSDEGridColumns'),
    );
    _.v(
      d,
      'degridDataItems',
      c.m('control.grid.DEGridDataItem[]', s, 'getPSDEGridDataItems'),
    );
    _.v(
      d,
      'degridEditItemUpdates',
      c.m(
        'control.grid.DEGridEditItemUpdate[]',
        s,
        'getPSDEGridEditItemUpdates',
      ),
    );
    _.v(
      d,
      'degridEditItemVRs',
      c.m('control.grid.DEGridEditItemVR[]', s, 'getPSDEGridEditItemVRs'),
    );
    _.v(
      d,
      'degridEditItems',
      c.m('control.grid.DEGridEditItem[]', s, 'getPSDEGridEditItems'),
    );
    _.w(d, 'pagingMode', s, '', 0);
    _.w(d, 'pagingSize', s);
    _.w(d, 'sortMode', s);
    _.w(d, 'hasWFDataItems', s);
    _.w(d, 'enableColFilter', s);
    _.w(d, 'enableCustomized', s);
    _.w(d, 'enableGroup', s);
    _.w(d, 'enablePagingBar', s);
    _.w(d, 'enableRowEdit', s);
    _.w(d, 'enableRowEditChangedOnly', s);
    _.w(d, 'enableRowEditOrder', s);
    _.w(d, 'enableRowNew', s);
    _.w(d, 'forceFit', s);
    _.w(d, 'hideHeader', s);
    _.w(d, 'noSort', s);
    _.w(d, 'singleSelect', s);

    super.onFillDSL(c, s, d);
  }
}
