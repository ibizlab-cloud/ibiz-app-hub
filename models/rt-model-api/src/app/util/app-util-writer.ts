import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../../model-object-writer';

export class AppUtilWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppUtil = src

    _.w(d, 'codeName', s);
    _.x(d, 'sysPFPluginId', s, 'getPSSysPFPlugin');
    _.w(d, 'utilDE10Name', s, 'utilPSDE10Name');
    _.w(d, 'utilDE2Name', s, 'utilPSDE2Name');
    _.w(d, 'utilDE3Name', s, 'utilPSDE3Name');
    _.w(d, 'utilDE4Name', s, 'utilPSDE4Name');
    _.w(d, 'utilDE5Name', s, 'utilPSDE5Name');
    _.w(d, 'utilDE6Name', s, 'utilPSDE6Name');
    _.w(d, 'utilDE7Name', s, 'utilPSDE7Name');
    _.w(d, 'utilDE8Name', s, 'utilPSDE8Name');
    _.w(d, 'utilDE9Name', s, 'utilPSDE9Name');
    _.w(d, 'utilDEName', s, 'utilPSDEName');
    _.w(d, 'utilParams', s);
    _.w(d, 'utilTag', s);
    _.w(d, 'utilType', s);

    super.onFillDSL(c, s, d);
  }
}
