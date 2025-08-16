import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ControlWriter } from '../control-writer';

export class DEToolbarWriter extends ControlWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEToolbar = src

    _.v(
      d,
      'detoolbarItems',
      c.m('control.toolbar.DEToolbarItem[]', s, 'getPSDEToolbarItems'),
    );
    _.w(d, 'toolbarStyle', s);
    _.w(d, 'xdataControlName', s, 'xDataControlName');

    super.onFillDSL(c, s, d);
  }
}
