import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { TitleBarWriterBase } from './title-bar-writer-base';

export class AppTitleBarWriter extends TitleBarWriterBase {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppTitleBar = src

    _.v(d, 'sysImage', c.s('res.SysImage[]', s, 'getPSSysImage'));
    _.w(d, 'titleBarStyle', s);
    _.w(d, 'titleBarType', s);

    super.onFillDSL(c, s, d);
  }
}
