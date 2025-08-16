import { ModelListWriterBase } from '../model-list-writer-base';
import { IModelDSLGenEngineContext } from '../imodel-dslgen-engine-context';

export class RawItemBaseListWriter extends ModelListWriterBase {
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
    switch (src['contentType']) {
      case 'HTML':
        c.fillDSL('control.rawitem.HtmlItem', src, dst);
        return;
      case 'IMAGE':
        c.fillDSL('control.rawitem.ImageItem', src, dst);
        return;
      case 'MARKDOWN':
        c.fillDSL('control.rawitem.MarkdownItem', src, dst);
        return;
      case 'PLACEHOLDER':
        c.fillDSL('control.rawitem.PlaceholderItem', src, dst);
        return;
      case 'RAW':
        c.fillDSL('control.rawitem.TextItem', src, dst);
        return;
      case 'VIDEO':
        c.fillDSL('control.rawitem.VideoItem', src, dst);
        return;
    }
    c.fillDSL('control.RawItem', src, dst);
    //super.onFillDSL(context, src, dst)
  }
}
