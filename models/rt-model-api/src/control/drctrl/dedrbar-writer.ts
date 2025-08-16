import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DEDRCtrlWriter } from './dedrctrl-writer';

export class DEDRBarWriter extends DEDRCtrlWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEDRBar = src

    _.v(
      d,
      'dedrbarGroups',
      c.m('control.drctrl.DEDRBarGroup[]', s, 'getPSDEDRBarGroups'),
    );
    _.w(d, 'title', s);
    _.v(
      d,
      'titleLanguageRes',
      c.s('res.LanguageRes[]', s, 'getTitlePSLanguageRes'),
    );
    _.w(d, 'showTitle', s);

    super.onFillDSL(c, s, d);
  }
}
