import { registerControlProvider, ControlType } from '@ibiz-template/runtime';
import { App, defineAsyncComponent } from 'vue';
import { ControlLoadingPlaceholder } from '@ibiz-template/vue3-util';

import { ChartProvider } from './chart.provider';

export const IBizChartControl = {
  install(v: App): void {
    v.component(
      'IBizChartControl',
      defineAsyncComponent({
        loader: () => import('./chart'),
        loadingComponent: ControlLoadingPlaceholder,
        delay: 0,
      }),
    );
    registerControlProvider(ControlType.CHART, () => new ChartProvider());
  },
};

export default IBizChartControl;
