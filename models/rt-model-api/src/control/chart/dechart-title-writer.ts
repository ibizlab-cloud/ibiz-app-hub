import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DEChartObjectWriterBase } from './dechart-object-writer-base';

export class DEChartTitleWriter extends DEChartObjectWriterBase {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEChartTitle = src

    _.w(d, 'subTitle', s);
    _.v(
      d,
      'subTitleLanguageRes',
      c.s('res.LanguageRes[]', s, 'getSubTitlePSLanguageRes'),
    );
    _.w(d, 'title', s);
    _.v(
      d,
      'titleLanguageRes',
      c.s('res.LanguageRes[]', s, 'getTitlePSLanguageRes'),
    );
    _.w(d, 'titlePos', s);
    _.w(d, 'showTitle', s);

    super.onFillDSL(c, s, d);
  }
}
