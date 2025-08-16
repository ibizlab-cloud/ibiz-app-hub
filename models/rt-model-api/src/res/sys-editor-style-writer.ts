import { IModelDSLGenEngineContext } from '../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../model-object-writer';

export class SysEditorStyleWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSSysEditorStyle = src

    _.w(d, 'ajaxHandlerType', s);
    _.w(d, 'codeName', s);
    _.w(d, 'containerType', s);
    _.w(d, 'editorHeight', s);
    _.w(d, 'editorType', s);
    _.w(d, 'editorWidth', s);
    _.w(d, 'linkViewShowMode', s);
    _.v(d, 'sysCss', c.s('res.SysCss[]', s, 'getPSSysCss'));
    _.x(d, 'sysPFPluginId', s, 'getPSSysPFPlugin');
    _.w(d, 'refViewShowMode', s);
    _.w(d, 'styleCode', s);
    _.w(d, 'extendStyleOnly', s);
    _.w(d, 'replaceDefault', s);

    super.onFillDSL(c, s, d);
  }
}
