import { ModelListWriterBase } from '../../model-list-writer-base';
import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';

export class LayoutPosListWriter extends ModelListWriterBase {
  onFillDSLList(c: IModelDSLGenEngineContext, src: any[], dst: any[]): void {
    const _ = this;
    src.forEach(item => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
    //super.onFillDSLList(context, src, dst)
  }

  onFillDSL(c: IModelDSLGenEngineContext, src: any, dst: any): void {
    switch (src['layout']) {
      case 'ABSOLUTE':
        c.fillDSL('control.layout.AbsoluteLayoutPos', src, dst);
        return;
      case 'BORDER':
        c.fillDSL('control.layout.BorderLayoutPos', src, dst);
        return;
      case 'FLEX':
      case 'SIMPLEFLEX':
        c.fillDSL('control.layout.FlexLayoutPos', src, dst);
        return;
      case 'TABLE':
        c.fillDSL('control.layout.TableLayoutPos', src, dst);
        return;
      case 'TABLE_12COL':
      case 'TABLE_24COL':
        c.fillDSL('control.layout.GridLayoutPos', src, dst);
        return;
    }

    //super.onFillDSL(context, src, dst)
  }
}
