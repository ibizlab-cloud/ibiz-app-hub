import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { MapWriter } from './map-writer';

export class SysMapWriter extends MapWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSSysMap = src

    _.w(d, 'emptyText', s);
    _.v(
      d,
      'emptyTextLanguageRes',
      c.s('res.LanguageRes[]', s, 'getEmptyTextPSLanguageRes'),
    );
    _.w(d, 'legendPos', s);
    _.w(d, 'mapStyle', s);
    _.v(
      d,
      'sysMapItems',
      c.m('control.map.SysMapItem[]', s, 'getPSSysMapItems'),
    );

    super.onFillDSL(c, s, d);
  }
}
