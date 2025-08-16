import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DEToolbarItemWriter } from './detoolbar-item-writer';

export class DETBGroupItemWriter extends DEToolbarItemWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDETBGroupItem = src

    _.w(d, 'actionLevel', s, '', 100);
    _.w(d, 'borderStyle', s);
    _.w(d, 'buttonStyle', s);
    _.w(d, 'groupExtractMode', s);
    _.v(
      d,
      'detoolbarItems',
      c.m('control.toolbar.DEToolbarItem[]', s, 'getPSDEToolbarItems'),
    );
    _.v(
      d,
      'uiactionGroup',
      c.s('view.UIActionGroup[]', s, 'getPSUIActionGroup'),
    );
    _.w(d, 'valid', s, '', true);

    //let iPSDECMGroupItem = src

    _.v(
      d,
      'decontextMenuItems',
      c.m('control.toolbar.DEContextMenuItem[]', s, 'getPSDEContextMenuItems'),
    );

    super.onFillDSL(c, s, d);
  }
}
