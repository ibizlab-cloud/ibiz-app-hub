import { IModelDSLGenEngineContext } from '../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../model-object-writer';

export class EditorWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSEditor = src

    _.w(d, 'cssStyle', s);
    _.w(d, 'dynaClass', s);
    _.w(d, 'editorHeight', s, '', 0.0);
    _.w(d, 'editorParams', s);
    _.w(d, 'editorStyle', s);
    _.w(d, 'editorType', s);
    _.w(d, 'editorWidth', s, '', 0.0);
    _.w(d, 'objectIdField', s);
    _.w(d, 'objectNameField', s);
    _.w(d, 'objectValueField', s);
    _.v(
      d,
      'controlAttributes',
      c.m('control.ControlAttribute[]', s, 'getPSControlAttributes'),
    );
    _.v(
      d,
      'controlLogics',
      c.m('control.ControlLogic[]', s, 'getPSControlLogics'),
    );
    _.v(
      d,
      'controlRenders',
      c.m('control.ControlRender[]', s, 'getPSControlRenders'),
    );
    _.v(d, 'editorItems', c.m('control.EditorItem[]', s, 'getPSEditorItems'));
    _.v(d, 'sysCss', c.s('res.SysCss[]', s, 'getPSSysCss'));
    _.v(d, 'sysDictCat', c.s('res.SysDictCat[]', s, 'getPSSysDictCat'));
    _.x(d, 'sysPFPluginId', s, 'getPSSysPFPlugin');
    _.w(d, 'placeHolder', s);
    _.w(d, 'predefinedType', s);
    _.w(d, 'textSeparator', s);
    _.w(d, 'valueSeparator', s);
    _.w(d, 'valueType', s, '', 'SIMPLE');
    _.w(d, 'disabled', s);
    _.w(d, 'editable', s, '', true);
    _.w(d, 'readOnly', s);

    //let iPSNavigateParamContainer = src

    _.v(
      d,
      'navigateContexts',
      c.m('control.NavigateContext[]', s, 'getPSNavigateContexts'),
    );
    _.v(
      d,
      'navigateParams',
      c.m('control.NavigateParam[]', s, 'getPSNavigateParams'),
    );

    super.onFillDSL(c, s, d);
  }
}
