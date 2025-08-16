import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DBPortletPartWriter } from './dbportlet-part-writer';

export class DBAppMenuPortletPartWriter extends DBPortletPartWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDBAppMenuPortletPart = src

    _.w(d, 'amlistStyle', s, 'aMListStyle');
    _.x(d, 'amsysPFPluginId', s, 'getAMPSSysPFPlugin');

    super.onFillDSL(c, s, d);
  }
}
