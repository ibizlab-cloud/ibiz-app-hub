import { IModelDSLGenEngineContext } from '../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../model-object-writer';

export class AppMethodDTOWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppMethodDTO = src

    _.w(d, 'codeName', s);
    _.v(
      d,
      'appMethodDTOFields',
      c.m('app.AppMethodDTOField[]', s, 'getPSAppMethodDTOFields'),
    );
    _.w(d, 'sourceType', s);
    _.w(d, 'tag', s);
    _.w(d, 'tag2', s);
    _.w(d, 'type', s);

    super.onFillDSL(c, s, d);
  }
}
