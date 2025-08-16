import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../../model-object-writer';

export class DEUIActionGroupWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEUIActionGroup = src

    _.w(d, 'groupTag', s);
    _.w(d, 'groupTag2', s);
    _.w(d, 'groupTag3', s);
    _.w(d, 'groupTag4', s);
    _.v(
      d,
      'uiactionGroupDetails',
      c.m('view.UIActionGroupDetail[]', s, 'getPSUIActionGroupDetails'),
    );

    //let iPSAppDEUIActionGroup = src

    _.x(d, 'appDataEntityId', s, 'getPSAppDataEntity');
    _.w(d, 'uniqueTag', s);

    super.onFillDSL(c, s, d);
  }
}
