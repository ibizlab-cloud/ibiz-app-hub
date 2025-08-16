import { ModelListWriterBase } from '../../model-list-writer-base';
import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';

export class AppViewListWriter extends ModelListWriterBase {
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
    switch (src['viewType']) {
      case 'APPDATAUPLOADVIEW':
      case 'APPERRORVIEW':
      case 'APPFILEUPLOADVIEW':
      case 'APPFUNCPICKUPVIEW':
      case 'APPLOGINVIEW':
      case 'APPLOGOUTVIEW':
      case 'APPPICUPLOADVIEW':
      case 'APPREDIRECTVIEW':
      case 'APPSTARTVIEW':
      case 'APPUTILVIEW':
      case 'APPWELCOMEVIEW':
      case 'APPWFADDSTEPBEFOREVIEW':
      case 'APPWFREDIRECTVIEW':
      case 'APPWFSENDBACKVIEW':
      case 'APPWFSTEPACTORVIEW':
      case 'APPWFSTEPDATAVIEW':
      case 'APPWFSTEPTRACEVIEW':
      case 'APPWFSUPPLYINFOVIEW':
      case 'APPWFTAKEADVICEVIEW':
        c.fillDSL('app.view.AppUtilView[]', src, dst);
        return;
      case 'APPDEVIEW':
        c.fillDSL('app.view.AppDEView[]', src, dst);
        return;
      case 'APPINDEXVIEW':
        c.fillDSL('app.view.AppIndexView', src, dst);
        return;
      case 'APPPANELVIEW':
        c.fillDSL('app.view.AppPanelView', src, dst);
        return;
      case 'APPPORTALVIEW':
        c.fillDSL('app.view.AppPortalView', src, dst);
        return;
    }

    c.fillDSL('app.view.AppDEView[]', src, dst);
    //super.onFillDSL(context, src, dst)
  }
}
