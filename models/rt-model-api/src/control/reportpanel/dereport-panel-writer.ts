import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ControlWriter } from '../control-writer';

export class DEReportPanelWriter extends ControlWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEReportPanel = src

    _.v(
      d,
      'appDEReport',
      c.s('app.dataentity.AppDEReport[]', s, 'getPSAppDEReport'),
    );

    super.onFillDSL(c, s, d);
  }
}
