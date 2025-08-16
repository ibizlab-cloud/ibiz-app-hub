import { App } from 'vue';
import { registerPanelItemProvider } from '@ibiz-template/runtime';
import BIReportPanelContent from './bi-report-panel-content';
import { BIReportPanelContentProvider } from './bi-report-panel-content.provider';

export default {
  install(app: App) {
    app.component(BIReportPanelContent.name!, BIReportPanelContent);
    registerPanelItemProvider(
      'CUSTOM_BI_REPORT_PANEL_CONTENT',
      () => new BIReportPanelContentProvider(),
    );
  },
};
