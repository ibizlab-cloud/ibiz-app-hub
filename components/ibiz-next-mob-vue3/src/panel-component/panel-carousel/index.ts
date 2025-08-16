import { registerPanelItemProvider } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { App } from 'vue';
import PanelCarousel from './panel-carousel';
import { PanelCarouselProvider } from './panel-carousel.provider';

export * from './panel-carousel.provider';
export * from './panel-carousel.controller';

export const IBizPanelCarousel = withInstall(PanelCarousel, function (v: App) {
  v.component(PanelCarousel.name, PanelCarousel);
  registerPanelItemProvider(
    'RAWITEM_STATIC_CAROUSEL',
    () => new PanelCarouselProvider(),
  );
});

export default IBizPanelCarousel;
