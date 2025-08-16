import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../../model-object-writer';

export class DEFormDetailWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEFormDetail = src

    _.v(
      d,
      'capLanguageRes',
      c.s('res.LanguageRes[]', s, 'getCapPSLanguageRes'),
    );
    _.w(d, 'caption', s);
    _.w(d, 'codeName', s);
    _.w(d, 'columnAlign', s);
    _.w(d, 'contentHeight', s, '', 0.0);
    _.w(d, 'contentWidth', s, '', 0.0);
    _.w(d, 'counterId', s);
    _.w(d, 'counterMode', s, '', 0);
    _.w(d, 'cssStyle', s);
    _.w(d, 'detailStyle', s);
    _.w(d, 'detailType', s);
    _.w(d, 'dynaClass', s);
    _.w(d, 'height', s, '', 0.0);
    _.w(d, 'labelCssStyle', s);
    _.w(d, 'labelDynaClass', s);
    _.v(d, 'labelSysCss', c.s('res.SysCss[]', s, 'getLabelPSSysCss'));
    _.x(d, 'appCounterRefId', s, 'getPSAppCounterRef');
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
      'defdgroupLogics',
      c.m('control.form.DEFDCatGroupLogic[]', s, 'getPSDEFDGroupLogics'),
    );
    _.v(d, 'layoutPos', c.s('control.layout.LayoutPos[]', s, 'getPSLayoutPos'));
    _.v(d, 'sysCss', c.s('res.SysCss[]', s, 'getPSSysCss'));
    _.v(d, 'sysImage', c.s('res.SysImage[]', s, 'getPSSysImage'));
    _.x(d, 'sysPFPluginId', s, 'getPSSysPFPlugin');
    _.x(d, 'showMoreMgrDEFormDetailId', s, 'getShowMoreMgrPSDEFormDetail');
    _.w(d, 'showMoreMode', s, '', 0);
    _.w(d, 'width', s, '', 0.0);
    _.w(d, 'repeatContent', s);
    _.w(d, 'showCaption', s);

    super.onFillDSL(c, s, d);
  }
}
