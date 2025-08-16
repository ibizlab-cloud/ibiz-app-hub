import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../../model-object-writer';

export class AppSubViewTypeRefWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppSubViewTypeRef = src

    _.x(d, 'sysPFPluginId', s, 'getPSSysPFPlugin');
    _.v(
      d,
      'viewLayoutPanel',
      c.s('control.panel.ViewLayoutPanel[]', s, 'getPSViewLayoutPanel'),
    );
    _.w(d, 'pluginCode', s);
    _.w(d, 'refTag', s);
    _.w(d, 'typeCode', s);
    _.w(d, 'viewModel', s);
    _.w(d, 'viewType', s);
    _.w(d, 'extendStyleOnly', s);
    _.w(d, 'replaceDefault', s);

    super.onFillDSL(c, s, d);
  }
}
