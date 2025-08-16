import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DEFormDetailWriter } from './deform-detail-writer';

export class DEFormItemWriter extends DEFormDetailWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEFormItem = src

    _.w(d, 'captionItemName', s);
    _.w(d, 'createDV', s);
    _.w(d, 'createDVT', s);
    _.w(d, 'dataType', s);
    _.w(d, 'enableCond', s);
    _.w(d, 'fieldName', s);
    _.w(d, 'ignoreInput', s);
    _.w(d, 'inputTip', s);
    _.w(d, 'inputTipLanResTag', s);
    _.w(d, 'inputTipUniqueTag', s);
    _.w(d, 'inputTipUrl', s);
    _.w(d, 'itemHeight', s, '', 0.0);
    _.w(d, 'itemWidth', s, '', 0.0);
    _.w(d, 'labelPos', s);
    _.w(d, 'labelWidth', s);
    _.w(d, 'noPrivDisplayMode', s);
    _.w(d, 'outputCodeListConfigMode', s, '', 0);
    _.v(d, 'phlanguageRes', c.s('res.LanguageRes[]', s, 'getPHPSLanguageRes'));
    _.x(d, 'appDEFieldId', s, 'getPSAppDEField');
    _.x(d, 'deformItemUpdateId', s, 'getPSDEFormItemUpdate');
    _.v(d, 'editor', c.s('control.Editor[]', s, 'getPSEditor'));
    _.w(d, 'resetItemNames', s, 'resetItemNames');
    _.w(d, 'unitName', s);
    _.w(d, 'unitNameWidth', s, '', 0);
    _.w(d, 'updateDV', s);
    _.w(d, 'updateDVT', s);
    _.w(d, 'valueFormat', s);
    _.w(d, 'allowEmpty', s);
    _.w(d, 'compositeItem', s);
    _.w(d, 'convertToCodeItemText', s);
    _.w(d, 'emptyCaption', s);
    _.w(d, 'enableAnchor', s);
    _.w(d, 'enableInputTip', s);
    _.w(d, 'enableItemPriv', s);
    _.w(d, 'enableUnitName', s);
    _.w(d, 'hidden', s);
    _.w(d, 'inputTipClosable', s);
    _.w(d, 'needCodeListConfig', s);

    super.onFillDSL(c, s, d);
  }
}
