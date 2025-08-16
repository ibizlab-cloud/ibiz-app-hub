import { registerPanelItemProvider } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { App } from 'vue';
import WFStepTrace from './wf-step-trace';
import { WFStepTraceProvider } from './wf-step-trace.provider';

export * from './wf-step-trace.provider';
export * from './wf-step-trace.controller';

export const IBizWFStepTrace = withInstall(WFStepTrace, function (v: App) {
  v.component(WFStepTrace.name, WFStepTrace);
  registerPanelItemProvider(
    'RAWITEM_WF_WFStepTrace',
    () => new WFStepTraceProvider(),
  );
});

export default IBizWFStepTrace;
