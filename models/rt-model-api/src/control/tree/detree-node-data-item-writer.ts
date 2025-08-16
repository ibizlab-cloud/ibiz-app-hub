import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DataItemWriter } from '../../data/data-item-writer';

export class DETreeNodeDataItemWriter extends DataItemWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDETreeNodeDataItem = src

    _.w(d, 'clconvertMode', s, 'cLConvertMode');
    _.w(d, 'defaultValue', s);
    _.x(d, 'frontCodeListId', s, 'getFrontPSCodeList');
    _.x(d, 'appDEFieldId', s, 'getPSAppDEField');
    _.x(d, 'detreeColumnId', s, 'getPSDETreeColumn');
    _.w(d, 'scriptCode', s);
    _.w(d, 'valueType', s, '', 'SIMPLE');
    _.w(d, 'customCode', s);
    _.w(d, 'enableItemPriv', s);

    super.onFillDSL(c, s, d);
  }
}
