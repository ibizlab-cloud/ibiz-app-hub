import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DEFormDetailWriter } from './deform-detail-writer';

export class DEFormBaseGroupPanelWriter extends DEFormDetailWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSLayoutContainer = src

    _.v(d, 'layout', c.s('control.layout.Layout[]', s, 'getPSLayout'));

    //let iPSDEFormGroupBase = src

    _.w(d, 'captionItemName', s);
    _.w(d, 'itemIgnoreInput', s, '', 0);
    _.v(
      d,
      'deformDetails',
      c.m('control.form.DEFormDetail[]', s, 'getPSDEFormDetails'),
    );
    _.w(d, 'enableAnchor', s);

    super.onFillDSL(c, s, d);
  }
}
