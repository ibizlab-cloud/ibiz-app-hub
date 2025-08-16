import { IModelDSLGenEngineContext } from '../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../model-object-writer';

export class ControlWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSControl = src

    _.w(d, 'codeName', s);
    _.w(d, 'controlStyle', s);
    _.w(d, 'controlType', s);
    _.w(d, 'dynaSysMode', s, '', 0);
    _.w(d, 'height', s, '', 0.0);
    _.w(d, 'logicName', s);
    _.x(d, 'appDataEntityId', s, 'getPSAppDataEntity');
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
      'controlParam',
      c.s('control.ControlParam[]', s, 'getPSControlParam'),
    );
    _.v(
      d,
      'controlRenders',
      c.m('control.ControlRender[]', s, 'getPSControlRenders'),
    );
    _.v(d, 'ctrlMsg', c.s('res.CtrlMsg[]', s, 'getPSCtrlMsg'));
    _.v(d, 'sysCss', c.s('res.SysCss[]', s, 'getPSSysCss'));
    _.x(d, 'sysPFPluginId', s, 'getPSSysPFPlugin');
    _.w(d, 'priority', s);
    _.w(d, 'width', s, '', 0.0);

    super.onFillDSL(c, s, d);
  }
}
