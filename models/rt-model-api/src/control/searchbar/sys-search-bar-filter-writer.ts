import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { SysSearchBarItemWriterBase } from './sys-search-bar-item-writer-base';

export class SysSearchBarFilterWriter extends SysSearchBarItemWriterBase {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSSearchBarFilter = src

    _.w(d, 'createDV', s);
    _.w(d, 'createDVT', s);
    _.w(d, 'dataType', s);
    _.w(d, 'itemHeight', s, '', 0.0);
    _.w(d, 'itemWidth', s, '', 0.0);
    _.w(d, 'labelPos', s);
    _.w(d, 'labelWidth', s);
    _.w(d, 'outputCodeListConfigMode', s, '', 0);
    _.v(d, 'phlanguageRes', c.s('res.LanguageRes[]', s, 'getPHPSLanguageRes'));
    _.v(
      d,
      'defsearchMode',
      c.s('dataentity.defield.DEFSearchMode[]', s, 'getPSDEFSearchMode'),
    );
    _.v(d, 'editor', c.s('control.Editor[]', s, 'getPSEditor'));
    _.w(d, 'resetItemNames', s, 'resetItemNames');
    _.w(d, 'unitName', s);
    _.w(d, 'unitNameWidth', s, '', 0);
    _.w(d, 'width', s, '', 0.0);
    _.w(d, 'addSeparator', s);
    _.w(d, 'allowEmpty', s);
    _.w(d, 'convertToCodeItemText', s);
    _.w(d, 'emptyCaption', s);
    _.w(d, 'enableItemPriv', s);
    _.w(d, 'enableUnitName', s);
    _.w(d, 'hidden', s);
    _.w(d, 'needCodeListConfig', s);
    _.w(d, 'showCaption', s);

    super.onFillDSL(c, s, d);
  }
}
