import { ModelListWriterBase } from '../../model-list-writer-base';
import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';

export class DEFormDetailListWriter extends ModelListWriterBase {
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
    switch (src['detailType']) {
      case 'BUTTON':
        c.fillDSL('control.form.DEFormButton', src, dst);
        return;
      case 'BUTTONLIST':
        c.fillDSL('control.form.DEFormButtonList', src, dst);
        return;
      case 'DRUIPART':
        c.fillDSL('control.form.DEFormDRUIPart', src, dst);
        return;
      case 'FORMITEM':
        c.fillDSL('control.form.DEFormItem', src, dst);
        return;
      case 'FORMITEMEX':
        c.fillDSL('control.form.DEEditFormItemEx', src, dst);
        return;
      case 'FORMPAGE':
        c.fillDSL('control.form.DEFormPage', src, dst);
        return;
      case 'GROUPPANEL':
        c.fillDSL('control.form.DEFormGroupPanel', src, dst);
        return;
      case 'IFRAME':
        c.fillDSL('control.form.DEFormIFrame', src, dst);
        return;
      case 'MDCTRL':
        c.fillDSL('control.form.DEFormMDCtrl', src, dst);
        return;
      case 'RAWITEM':
        c.fillDSL('control.form.DEFormRawItem', src, dst);
        return;
      case 'TABPAGE':
        c.fillDSL('control.form.DEFormTabPage', src, dst);
        return;
      case 'TABPANEL':
        c.fillDSL('control.form.DEFormTabPanel', src, dst);
        return;
      case 'USERCONTROL':
        c.fillDSL('control.form.DEFormUserControl', src, dst);
        return;
    }

    //super.onFillDSL(context, src, dst)
  }
}
