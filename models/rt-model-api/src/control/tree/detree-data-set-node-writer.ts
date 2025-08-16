import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DETreeNodeWriterBase } from './detree-node-writer-base';

export class DETreeDataSetNodeWriter extends DETreeNodeWriterBase {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDETreeDataSetNode = src

    _.x(d, 'childCntAppDEFieldId', s, 'getChildCntPSAppDEField');
    _.x(d, 'clsAppDEFieldId', s, 'getClsPSAppDEField');
    _.w(d, 'customCond', s);
    _.x(d, 'data2AppDEFieldId', s, 'getData2PSAppDEField');
    _.w(d, 'dataName', s);
    _.x(d, 'dataAppDEFieldId', s, 'getDataPSAppDEField');
    _.w(d, 'dataSourceType', s);
    _.x(d, 'filterAppDEDataSetId', s, 'getFilterPSAppDEDataSet');
    _.x(d, 'iconAppDEFieldId', s, 'getIconPSAppDEField');
    _.x(d, 'idAppDEFieldId', s, 'getIdPSAppDEField');
    _.x(d, 'leafFlagAppDEFieldId', s, 'getLeafFlagPSAppDEField');
    _.x(d, 'linkAppDEFieldId', s, 'getLinkPSAppDEField');
    _.w(d, 'maxSize', s);
    _.w(d, 'moveDataAccessAction', s);
    _.x(d, 'moveAppDEActionId', s, 'getMovePSAppDEAction');
    _.x(d, 'moveDEOPPrivId', s, 'getMovePSDEOPPriv');
    _.x(d, 'appDEActionId', s, 'getPSAppDEAction');
    _.x(d, 'appDEDataSetId', s, 'getPSAppDEDataSet');
    _.x(d, 'appDELogicId', s, 'getPSAppDELogic');
    _.w(d, 'pagingSize', s);
    _.w(d, 'removeDataAccessAction', s);
    _.x(d, 'removeAppDEActionId', s, 'getRemovePSAppDEAction');
    _.x(d, 'removeDEOPPrivId', s, 'getRemovePSDEOPPriv');
    _.w(d, 'scriptCode', s);
    _.x(d, 'shapeClsAppDEFieldId', s, 'getShapeClsPSAppDEField');
    _.w(d, 'sortDir', s);
    _.x(d, 'sortAppDEFieldId', s, 'getSortPSAppDEField');
    _.w(d, 'textFormat', s);
    _.x(d, 'textAppDEFieldId', s, 'getTextPSAppDEField');
    _.x(d, 'tipsAppDEFieldId', s, 'getTipsPSAppDEField');
    _.w(d, 'updateDataAccessAction', s);
    _.x(d, 'updateAppDEActionId', s, 'getUpdatePSAppDEAction');
    _.x(d, 'updateDEOPPrivId', s, 'getUpdatePSDEOPPriv');
    _.w(d, 'appendCaption', s);
    _.w(d, 'distinctMode', s);
    _.w(d, 'enablePaging', s);

    super.onFillDSL(c, s, d);
  }
}
