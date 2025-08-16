import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DEFormDetailWriter } from './deform-detail-writer';

export class DEFormIFrameWriter extends DEFormDetailWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEFormIFrame = src

    _.w(d, 'iframeUrl', s, 'iFrameUrl');
    _.x(d, 'linkAppViewId', s, 'getLinkPSAppView');
    _.w(d, 'refreshItems', s);

    super.onFillDSL(c, s, d);
  }
}
