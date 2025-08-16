import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { AppViewWriter } from './app-view-writer';

export class AppIndexViewWriter extends AppViewWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppIndexView = src

    _.w(d, 'appIconPath', s);
    _.w(d, 'appIconPath2', s);
    _.w(d, 'appSwitchMode', s);
    _.w(d, 'bottomInfo', s);
    _.x(d, 'defAppViewId', s, 'getDefPSAppView');
    _.w(d, 'headerInfo', s);
    _.w(d, 'mainMenuAlign', s);
    _.x(d, 'portalAppCounterRefId', s, 'getPortalPSAppCounterRef');
    _.w(d, 'blankMode', s);
    _.w(d, 'defaultPage', s);
    _.w(d, 'enableAppSwitch', s);

    super.onFillDSL(c, s, d);
  }
}
