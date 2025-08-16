import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { SysPanelItemWriter } from './sys-panel-item-writer';

export class SysPanelTabPanelWriter extends SysPanelItemWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSSysPanelTabPanel = src

    _.w(d, 'dataName', s);
    _.w(d, 'dataRegionType', s, '', 'INHERIT');
    _.w(d, 'dataSourceType', s);
    _.x(d, 'appDELogicId', s, 'getPSAppDELogic');
    _.x(d, 'appDEMethodId', s, 'getPSAppDEMethod');
    _.x(d, 'appDataEntityId', s, 'getPSAppDataEntity');
    _.v(
      d,
      'navigateContexts',
      c.m('control.NavigateContext[]', s, 'getPSNavigateContexts'),
    );
    _.v(
      d,
      'navigateParams',
      c.m('control.NavigateParam[]', s, 'getPSNavigateParams'),
    );
    _.v(
      d,
      'panelTabPages',
      c.m('control.panel.PanelTabPage[]', s, 'getPSPanelTabPages'),
    );
    _.w(d, 'reloadTimer', s);
    _.w(d, 'scriptCode', s);
    _.w(d, 'showBusyIndicator', s);

    super.onFillDSL(c, s, d);
  }
}
