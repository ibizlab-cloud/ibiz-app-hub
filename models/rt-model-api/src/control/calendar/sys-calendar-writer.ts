import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { CalendarWriter } from './calendar-writer';

export class SysCalendarWriter extends CalendarWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSSysCalendar = src

    _.w(d, 'calendarStyle', s);
    _.w(d, 'emptyText', s);
    _.v(
      d,
      'emptyTextLanguageRes',
      c.s('res.LanguageRes[]', s, 'getEmptyTextPSLanguageRes'),
    );
    _.w(d, 'groupHeight', s, '', 0);
    _.w(d, 'groupLayout', s);
    _.w(d, 'groupMode', s);
    _.x(d, 'groupAppDEFieldId', s, 'getGroupPSAppDEField');
    _.x(d, 'groupCodeListId', s, 'getGroupPSCodeList');
    _.v(d, 'groupSysCss', c.s('res.SysCss[]', s, 'getGroupPSSysCss'));
    _.x(d, 'groupSysPFPluginId', s, 'getGroupPSSysPFPlugin');
    _.x(d, 'groupTextAppDEFieldId', s, 'getGroupTextPSAppDEField');
    _.w(d, 'groupWidth', s, '', 0);
    _.w(d, 'legendPos', s);
    _.v(
      d,
      'sysCalendarItems',
      c.m('control.calendar.SysCalendarItem[]', s, 'getPSSysCalendarItems'),
    );
    _.w(d, 'enableEdit', s);
    _.w(d, 'enableGroup', s);

    super.onFillDSL(c, s, d);
  }
}
