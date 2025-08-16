import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../../model-object-writer';

export class DEMainStateWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEMainState = src

    _.w(d, 'actionDenyMsg', s);
    _.w(d, 'codeName', s);
    _.w(d, 'enterStateMode', s);
    _.w(d, 'logicName', s);
    _.w(d, 'mstag', s, 'mSTag');
    _.w(d, 'mstype', s, 'mSType', 0);
    _.w(d, 'opprivDenyMsg', s, 'oPPrivDenyMsg');
    _.w(d, 'orderValue', s, '', 99999);
    _.v(
      d,
      'demainStateOPPrivs',
      c.m(
        'dataentity.mainstate.DEMainStateOPPriv[]',
        s,
        'getPSDEMainStateOPPrivs',
      ),
    );
    _.y(d, 'prevDEMainStateIds', s, 'getPrevPSDEMainStates');
    _.w(d, 'state2Value', s);
    _.w(d, 'state3Value', s);
    _.w(d, 'stateValue', s);
    _.w(d, 'viewActions', s);
    _.w(d, 'wfstateMode', s, 'wFStateMode');
    _.w(d, 'actionAllowMode', s);
    _.w(d, 'default', s);
    _.w(d, 'enableViewActions', s);
    _.w(d, 'fieldAllowMode', s);
    _.w(d, 'opprivAllowMode', s, 'oPPrivAllowMode');

    super.onFillDSL(c, s, d);
  }
}
