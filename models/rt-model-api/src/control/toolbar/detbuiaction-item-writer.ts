import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DEToolbarItemWriter } from './detoolbar-item-writer';

export class DETBUIActionItemWriter extends DEToolbarItemWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDETBUIActionItem = src

    _.w(d, 'actionLevel', s, '', 100);
    _.w(d, 'borderStyle', s);
    _.w(d, 'buttonStyle', s);
    _.w(d, 'noPrivDisplayMode', s);
    _.v(
      d,
      'detoolbarItems',
      c.m('control.toolbar.DEToolbarItem[]', s, 'getPSDEToolbarItems'),
    );
    _.x(d, 'uiactionId', s, 'getPSUIAction');
    _.w(d, 'uiactionTarget', s, 'uIActionTarget');
    _.w(d, 'enableToggleMode', s);
    _.w(d, 'hiddenItem', s);
    _.w(d, 'valid', s, '', true);

    super.onFillDSL(c, s, d);
  }
}
