import { App } from 'vue';
import BIReportPanel from './bi-report-panel';
import BIReportPanelContent from './bi-report-panel-content';

export default {
  install(app: App) {
    app.use(BIReportPanel);
    app.use(BIReportPanelContent);
  },
};
