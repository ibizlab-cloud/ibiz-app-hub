import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../../model-object-writer';

export class DEUILogicNodeWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEUILogicNode = src

    _.w(d, 'codeName', s);
    _.x(d, 'dstDEUILogicParamId', s, 'getDstPSDEUILogicParam');
    _.w(d, 'height', s, '', 0);
    _.w(d, 'leftPos', s, '', 0);
    _.w(d, 'logicNodeType', s);
    _.v(
      d,
      'deuilogicLinks',
      c.m('dataentity.logic.DEUILogicLink[]', s, 'getPSDEUILogicLinks'),
    );
    _.v(
      d,
      'deuilogicNodeParams',
      c.m(
        'dataentity.logic.DEUILogicNodeParam[]',
        s,
        'getPSDEUILogicNodeParams',
      ),
    );
    _.x(d, 'srcDEUILogicParamId', s, 'getSrcPSDEUILogicParam');
    _.w(d, 'topPos', s, '', 0);
    _.w(d, 'width', s, '', 0);
    _.w(d, 'parallelOutput', s);

    //let iPSAppDEUILogicNode = src

    _.x(d, 'sysPFPluginId', s, 'getPSSysPFPlugin');

    super.onFillDSL(c, s, d);
  }
}
