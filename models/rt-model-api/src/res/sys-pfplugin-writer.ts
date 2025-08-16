import { IModelDSLGenEngineContext } from '../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../model-object-writer';

export class SysPFPluginWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSSysPFPlugin = src

    _.w(d, 'codeName', s);
    _.w(d, 'pluginCode', s);
    _.w(d, 'pluginModel', s);
    _.w(d, 'pluginParams', s);
    _.w(d, 'pluginTag', s);
    _.w(d, 'pluginType', s);
    _.w(d, 'rtobjectName', s, 'rTObjectName');
    _.w(d, 'rtobjectSource', s, 'rTObjectSource', 0);
    _.w(d, 'extendStyleOnly', s);
    _.w(d, 'replaceDefault', s);
    _.w(d, 'runtimeObject', s);

    super.onFillDSL(c, s, d);
  }
}
