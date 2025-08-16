import { ModelListWriterBase } from '../model-list-writer-base';
import { IModelDSLGenEngineContext } from '../imodel-dslgen-engine-context';

export class EditorListWriter extends ModelListWriterBase {
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
    switch (src['editorType']) {
      case 'AC':
      case 'AC_FS':
      case 'AC_FS_NOBUTTON':
      case 'AC_NOBUTTON':
        c.fillDSL('control.editor.AutoComplete', src, dst);
        return;
      case 'ADDRESSPICKUP':
      case 'ADDRESSPICKUP_AC':
        c.fillDSL('control.editor.MailAddress', src, dst);
        return;
      case 'ARRAY':
      case 'MOBARRAY':
        c.fillDSL('control.editor.Array', src, dst);
        return;
      case 'CHECKBOX':
      case 'MOBSWITCH':
      case 'SWITCH':
        c.fillDSL('control.editor.CheckBox', src, dst);
        return;
      case 'CHECKBOXLIST':
      case 'MOBCHECKLIST':
        c.fillDSL('control.editor.CheckBoxList', src, dst);
        return;
      case 'CODE':
      case 'MOBCODE':
        c.fillDSL('control.editor.Code', src, dst);
        return;
      case 'COLORPICKER':
      case 'MOBCOLORPICKER':
        c.fillDSL('control.editor.ColorPicker', src, dst);
        return;
      case 'DATEPICKER':
      case 'DATEPICKEREX':
      case 'DATEPICKEREX_HOUR':
      case 'DATEPICKEREX_MINUTE':
      case 'DATEPICKEREX_NODAY':
      case 'DATEPICKEREX_NODAY_NOSECOND':
      case 'DATEPICKEREX_NOTIME':
      case 'DATEPICKEREX_SECOND':
      case 'MOBDATE':
        c.fillDSL('control.editor.DatePicker', src, dst);
        return;
      case 'DATERANGE':
      case 'MOBDATERANGE':
        c.fillDSL('control.editor.DateRange', src, dst);
        return;
      case 'DROPDOWNLIST':
      case 'DROPDOWNLIST_100':
      case 'MOBDROPDOWNLIST':
        c.fillDSL('control.editor.DropDownList', src, dst);
        return;
      case 'FILEUPLOADER':
      case 'FILEUPLOADERONE':
      case 'MOBMULTIFILEUPLOAD':
      case 'MOBSINGLEFILEUPLOAD':
        c.fillDSL('control.editor.FileUploader', src, dst);
        return;
      case 'HIDDEN':
        c.fillDSL('control.editor.Hidden', src, dst);
        return;
      case 'HTMLEDITOR':
      case 'MOBHTMLTEXT':
        c.fillDSL('control.editor.Html', src, dst);
        return;
      case 'IPADDRESSTEXTBOX':
        c.fillDSL('control.editor.IPAddress', src, dst);
        return;
      case 'LISTBOX':
        c.fillDSL('control.editor.ListBox', src, dst);
        return;
      case 'LISTBOXPICKUP':
        c.fillDSL('control.editor.ListBoxPicker', src, dst);
        return;
      case 'MAPPICKER':
      case 'MOBMAPPICKER':
        c.fillDSL('control.editor.MapPicker', src, dst);
        return;
      case 'MARKDOWN':
      case 'MOBMARKDOWN':
        c.fillDSL('control.editor.Markdown', src, dst);
        return;
      case 'MDROPDOWNLIST':
        c.fillDSL('control.editor.MDropDownList', src, dst);
        return;
      case 'MOBMPICKER':
        c.fillDSL('control.editor.MPicker', src, dst);
        return;
      case 'MOBNUMBER':
      case 'NUMBER':
        c.fillDSL('control.editor.NumberEditor', src, dst);
        return;
      case 'MOBNUMBERRANGE':
      case 'NUMBERRANGE':
        c.fillDSL('control.editor.NumberRange', src, dst);
        return;
      case 'MOBPASSWORD':
      case 'PASSWORD':
        c.fillDSL('control.editor.Password', src, dst);
        return;
      case 'MOBPICKER':
      case 'MOBPICKER_DROPDOWNVIEW':
      case 'PICKER':
      case 'PICKEREX_DROPDOWNVIEW':
      case 'PICKEREX_DROPDOWNVIEW_LINK':
      case 'PICKEREX_LINK':
      case 'PICKEREX_LINKONLY':
      case 'PICKEREX_NOAC':
      case 'PICKEREX_NOAC_LINK':
      case 'PICKEREX_NOBUTTON':
      case 'PICKEREX_TRIGGER':
      case 'PICKEREX_TRIGGER_LINK':
        c.fillDSL('control.editor.Picker', src, dst);
        return;
      case 'MOBPICTURE':
      case 'MOBPICTURELIST':
      case 'PICTURE':
      case 'PICTURE_ONE':
        c.fillDSL('control.editor.Picture', src, dst);
        return;
      case 'MOBRADIOLIST':
      case 'RADIOBUTTONLIST':
        c.fillDSL('control.editor.RadioButtonList', src, dst);
        return;
      case 'MOBRATING':
      case 'RATING':
        c.fillDSL('control.editor.Rating', src, dst);
        return;
      case 'MOBSLIDER':
      case 'SLIDER':
        c.fillDSL('control.editor.Slider', src, dst);
        return;
      case 'MOBSTEPPER':
      case 'STEPPER':
        c.fillDSL('control.editor.Stepper', src, dst);
        return;
      case 'MOBTEXT':
      case 'TEXTBOX':
        c.fillDSL('control.editor.TextBox', src, dst);
        return;
      case 'MOBTEXTAREA':
      case 'TEXTAREA':
      case 'TEXTAREA_10':
        c.fillDSL('control.editor.TextArea', src, dst);
        return;
      case 'OFFICEEDITOR':
        c.fillDSL('control.editor.Office', src, dst);
        return;
      case 'OFFICEEDITOR2':
        c.fillDSL('control.editor.Office2', src, dst);
        return;
      case 'PICKUPVIEW':
        c.fillDSL('control.editor.PickupView', src, dst);
        return;
      case 'PREDEFINED':
        c.fillDSL('control.editor.Predefined', src, dst);
        return;
      case 'RAW':
        c.fillDSL('control.editor.Raw', src, dst);
        return;
      case 'SPAN':
      case 'SPANEX':
      case 'SPAN_LINK':
        c.fillDSL('control.editor.Span', src, dst);
        return;
    }
    c.fillDSL('control.Editor', src, dst);
    //super.onFillDSL(context, src, dst)
  }
}
