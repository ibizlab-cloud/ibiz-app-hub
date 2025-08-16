import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DEEditFormItemWriter } from './deedit-form-item-writer';

export class DEEditFormItemExWriter extends DEEditFormItemWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEFormItemEx = src

    _.v(
      d,
      'deformItems',
      c.m('control.form.DEFormItem[]', s, 'getPSDEFormItems'),
    );

    super.onFillDSL(c, s, d);
  }
}
