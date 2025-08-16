import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { AjaxControlContainerWriter } from '../ajax-control-container-writer';

export class DashboardWriter extends AjaxControlContainerWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDashboard = src

    _.w(d, 'customizeMode', s, '', 0);
    _.w(d, 'dashboardStyle', s);
    _.v(d, 'navBarSysCss', c.s('res.SysCss[]', s, 'getNavBarPSSysCss'));
    _.w(d, 'navBarPos', s);
    _.w(d, 'navBarStyle', s);
    _.w(d, 'navBarWidth', s, '', 0.0);
    _.w(d, 'navbarHeight', s, '', 0.0);
    _.x(d, 'appDynaDashboardUtilId', s, 'getPSAppDynaDashboardUtil');
    _.v(d, 'layout', c.s('control.layout.Layout[]', s, 'getPSLayout'));
    _.w(d, 'enableCustomized', s);
    _.w(d, 'showDashboardNavBar', s);

    super.onFillDSL(c, s, d);
  }
}
