import { IModelDSLGenEngineContext } from '../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../model-object-writer';

export class ControlItemParamWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSControlItemParam = src

    _.w(d, 'caption', s);
    _.w(d, 'key', s);
    _.v(d, 'sysImage', c.s('res.SysImage[]', s, 'getPSSysImage'));
    _.x(d, 'uiactionId', s, 'getPSUIAction');
    _.w(d, 'tooltip', s);
    _.w(d, 'value', s);

    super.onFillDSL(c, s, d);
  }
}
