import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../../model-object-writer';

export class DETreeNodeColumnWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDETreeNodeColumn = src

    _.v(d, 'cellSysCss', c.s('res.SysCss[]', s, 'getCellPSSysCss'));
    _.w(d, 'codeName', s);
    _.w(d, 'columnStyle', s);
    _.w(d, 'columnType', s);
    _.w(d, 'noPrivDisplayMode', s, '', 1);
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
    _.x(d, 'detreeColumnId', s, 'getPSDETreeColumn');
    _.x(d, 'sysPFPluginId', s, 'getPSSysPFPlugin');

    super.onFillDSL(c, s, d);
  }
}
