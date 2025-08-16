import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DEFormDetailWriter } from './deform-detail-writer';

export class DEFormButtonListWriter extends DEFormDetailWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEFormButtonList = src

    _.w(d, 'actionGroupExtractMode', s);
    _.w(d, 'buttonListType', s, '', 'UIACTIONGROUP');
    _.v(
      d,
      'deformButtons',
      c.m('control.form.DEFormButton[]', s, 'getPSDEFormButtons'),
    );
    _.v(
      d,
      'uiactionGroup',
      c.s('view.UIActionGroup[]', s, 'getPSUIActionGroup'),
    );

    super.onFillDSL(c, s, d);
  }
}
