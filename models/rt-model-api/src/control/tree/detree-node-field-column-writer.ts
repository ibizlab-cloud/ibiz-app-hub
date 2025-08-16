import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DETreeNodeColumnWriter } from './detree-node-column-writer';

export class DETreeNodeFieldColumnWriter extends DETreeNodeColumnWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDETreeNodeFieldColumn = src

    _.w(d, 'clconvertMode', s, 'cLConvertMode');
    _.w(d, 'dataItemName', s);
    _.x(d, 'linkAppViewId', s, 'getLinkPSAppView');
    _.w(d, 'linkValueItem', s);
    _.w(d, 'objectIdField', s);
    _.w(d, 'objectNameField', s);
    _.w(d, 'objectValueField', s);
    _.x(d, 'appCodeListId', s, 'getPSAppCodeList');
    _.x(d, 'appDEFieldId', s, 'getPSAppDEField');
    _.x(d, 'deuiactionId', s, 'getPSDEUIAction');
    _.v(
      d,
      'deuiactionGroup',
      c.s('dataentity.uiaction.DEUIActionGroup[]', s, 'getPSDEUIActionGroup'),
    );
    _.w(d, 'textSeparator', s);
    _.w(d, 'unitName', s);
    _.w(d, 'unitNameWidth', s, '', 0);
    _.w(d, 'valueFormat', s);
    _.w(d, 'valueSeparator', s);
    _.w(d, 'valueType', s, '', 'SIMPLE');
    _.w(d, 'enableItemPriv', s);
    _.w(d, 'enableLinkView', s);
    _.w(d, 'enableRowEdit', s);
    _.w(d, 'enableUnitName', s);

    //let iPSDETreeNodeEditItem = src

    _.w(d, 'createDV', s);
    _.w(d, 'createDVT', s);
    _.w(d, 'enableCond', s);
    _.w(d, 'ignoreInput', s);
    _.w(d, 'outputCodeListConfigMode', s, '', 0);
    _.v(d, 'editor', c.s('control.Editor[]', s, 'getPSEditor'));
    _.w(d, 'resetItemNames', s, 'resetItemNames');
    _.w(d, 'updateDV', s);
    _.w(d, 'updateDVT', s);
    _.w(d, 'allowEmpty', s);
    _.w(d, 'convertToCodeItemText', s);
    _.w(d, 'needCodeListConfig', s);

    super.onFillDSL(c, s, d);
  }
}
