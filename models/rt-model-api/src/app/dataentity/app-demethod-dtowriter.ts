import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../../model-object-writer';

export class AppDEMethodDTOWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppDEMethodDTO = src

    _.w(d, 'codeName', s);
    _.v(
      d,
      'appDEMethodDTOFields',
      c.m(
        'app.dataentity.AppDEMethodDTOField[]',
        s,
        'getPSAppDEMethodDTOFields',
      ),
    );
    _.x(d, 'refAppDEMethodDTOId', s, 'getRefPSAppDEMethodDTO');
    _.x(d, 'refAppDataEntityId', s, 'getRefPSAppDataEntity');
    _.w(d, 'sourceType', s);
    _.x(d, 'srcAppMethodDTOId', s, 'getSrcPSAppMethodDTO');
    _.w(d, 'type', s);

    super.onFillDSL(c, s, d);
  }
}
