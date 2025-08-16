import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DESearchFormItemWriter } from './desearch-form-item-writer';

export class DESearchFormItemExWriter extends DESearchFormItemWriter {
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
