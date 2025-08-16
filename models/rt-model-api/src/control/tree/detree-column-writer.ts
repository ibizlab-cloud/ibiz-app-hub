import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../../model-object-writer';

export class DETreeColumnWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDETreeColumn = src

    _.w(d, 'align', s);
    _.v(
      d,
      'capLanguageRes',
      c.s('res.LanguageRes[]', s, 'getCapPSLanguageRes'),
    );
    _.w(d, 'caption', s);
    _.v(d, 'cellSysCss', c.s('res.SysCss[]', s, 'getCellPSSysCss'));
    _.w(d, 'codeName', s);
    _.w(d, 'columnStyle', s);
    _.w(d, 'columnType', s);
    _.v(d, 'headerSysCss', c.s('res.SysCss[]', s, 'getHeaderPSSysCss'));
    _.w(d, 'hideMode', s, '', 0);
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
    _.v(d, 'sysImage', c.s('res.SysImage[]', s, 'getPSSysImage'));
    _.x(d, 'renderSysPFPluginId', s, 'getRenderPSSysPFPlugin');
    _.w(d, 'width', s);
    _.w(d, 'widthUnit', s);
    _.w(d, 'enableExpand', s);
    _.w(d, 'enableSort', s);
    _.w(d, 'hideDefault', s);

    super.onFillDSL(c, s, d);
  }
}
