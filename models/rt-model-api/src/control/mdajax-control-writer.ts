import { IModelDSLGenEngineContext } from '../imodel-dslgen-engine-context';
import { AjaxControlWriter } from './ajax-control-writer';

export class MDAjaxControlWriter extends AjaxControlWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSMDAjaxControl = src

    _.w(d, 'activeDataField', s);
    _.v(
      d,
      'createControlAction',
      c.s('control.ControlAction[]', s, 'getCreatePSControlAction'),
    );
    _.v(
      d,
      'fetchControlAction',
      c.s('control.ControlAction[]', s, 'getFetchPSControlAction'),
    );
    _.v(
      d,
      'getDraftFromControlAction',
      c.s('control.ControlAction[]', s, 'getGetDraftFromPSControlAction'),
    );
    _.v(
      d,
      'getDraftControlAction',
      c.s('control.ControlAction[]', s, 'getGetDraftPSControlAction'),
    );
    _.v(
      d,
      'getControlAction',
      c.s('control.ControlAction[]', s, 'getGetPSControlAction'),
    );
    _.v(
      d,
      'moveControlAction',
      c.s('control.ControlAction[]', s, 'getMovePSControlAction'),
    );
    _.v(
      d,
      'controlNavContexts',
      c.m('control.ControlNavContext[]', s, 'getPSControlNavContexts'),
    );
    _.v(
      d,
      'controlNavParams',
      c.m('control.ControlNavParam[]', s, 'getPSControlNavParams'),
    );
    _.x(d, 'dedataExportId', s, 'getPSDEDataExport');
    _.x(d, 'dedataImportId', s, 'getPSDEDataImport');
    _.v(
      d,
      'removeControlAction',
      c.s('control.ControlAction[]', s, 'getRemovePSControlAction'),
    );
    _.v(
      d,
      'updateControlAction',
      c.s('control.ControlAction[]', s, 'getUpdatePSControlAction'),
    );
    _.w(d, 'activeDataMode', s);
    _.w(d, 'readOnly', s);

    super.onFillDSL(c, s, d);
  }
}
