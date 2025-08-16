import { App } from 'vue';
import { registerPanelItemProvider } from '@ibiz-template/runtime';
import BIReportPanel from './bi-report-panel';
import { BIReportPanelProvider } from './bi-report-panel.provider';

export default {
  install(app: App) {
    app.component(BIReportPanel.name!, BIReportPanel);
    registerPanelItemProvider(
      'CUSTOM_BI_REPORT_PANEL',
      () => new BIReportPanelProvider(),
    );
  },
};
