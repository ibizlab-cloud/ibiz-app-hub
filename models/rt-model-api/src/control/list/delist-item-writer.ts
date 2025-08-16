import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ListItemWriter } from './list-item-writer';

export class DEListItemWriter extends ListItemWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEListItem = src

    _.w(d, 'align', s);
    _.w(d, 'clconvertMode', s, 'cLConvertMode');
    _.v(
      d,
      'capLanguageRes',
      c.s('res.LanguageRes[]', s, 'getCapPSLanguageRes'),
    );
    _.w(d, 'caption', s);
    _.w(d, 'dataItemName', s);
    _.w(d, 'groupItem', s);
    _.w(d, 'itemPrivId', s);
    _.w(d, 'itemType', s);
    _.v(
      d,
      'controlAttributes',
      c.m('control.ControlAttribute[]', s, 'getPSControlAttributes'),
    );
    _.v(
      d,
      'controlLogics',
      c.m('control.ControlLogic[]', s, 'getPSControlLogics'),
    );
    _.v(
      d,
      'controlRenders',
      c.m('control.ControlRender[]', s, 'getPSControlRenders'),
    );
    _.v(
      d,
      'deuiactionGroup',
      c.s('dataentity.uiaction.DEUIActionGroup[]', s, 'getPSDEUIActionGroup'),
    );
    _.x(d, 'sysPFPluginId', s, 'getPSSysPFPlugin');
    _.w(d, 'valueFormat', s);
    _.w(d, 'width', s);
    _.w(d, 'widthString', s);
    _.w(d, 'enableItemPriv', s);
    _.w(d, 'enableSort', s);
    _.w(d, 'hiddenDataItem', s);

    super.onFillDSL(c, s, d);
  }
}
