import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../../model-object-writer';

export class AppPFPluginRefWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppPFPluginRef = src

    _.w(d, 'pluginCode', s);
    _.w(d, 'pluginModel', s);
    _.w(d, 'pluginParams', s);
    _.w(d, 'pluginType', s);
    _.w(d, 'rtobjectName', s, 'rTObjectName');
    _.w(d, 'rtobjectRepo', s, 'rTObjectRepo');
    _.w(d, 'refMode', s);
    _.w(d, 'refTag', s);
    _.w(d, 'refTag2', s);
    _.w(d, 'templCode', s);
    _.w(d, 'templCode2', s);
    _.w(d, 'templCode3', s);
    _.w(d, 'templCode4', s);
    _.w(d, 'extendStyleOnly', s);
    _.w(d, 'replaceDefault', s);
    _.w(d, 'runtimeObject', s);

    super.onFillDSL(c, s, d);
  }
}
