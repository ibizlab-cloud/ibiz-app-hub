import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../../model-object-writer';

export class DEGridEditItemUpdateWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEGridEditItemUpdate = src

    _.w(d, 'codeName', s);
    _.x(d, 'appDEMethodId', s, 'getPSAppDEMethod');
    _.v(
      d,
      'degeiupdateDetails',
      c.m('control.grid.DEGEIUpdateDetail[]', s, 'getPSDEGEIUpdateDetails'),
    );
    _.w(d, 'scriptCode', s);
    _.w(d, 'customCode', s);
    _.w(d, 'showBusyIndicator', s, '', true);

    super.onFillDSL(c, s, d);
  }
}
