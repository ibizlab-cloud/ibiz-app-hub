import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../../model-object-writer';

export class DEReportItemWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppDEReportItem = src

    _.v(
      d,
      'minorAppDEReport',
      c.s('app.dataentity.AppDEReport[]', s, 'getMinorPSAppDEReport'),
    );

    super.onFillDSL(c, s, d);
  }
}
