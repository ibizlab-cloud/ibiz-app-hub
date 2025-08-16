import { App } from 'vue';
import { registerControlProvider } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { CarouselGrid } from './carousel-grid';
import { CarouselGridProvider } from './carousel-grid.provider';

export const IBizCarouselGrid = withInstall(CarouselGrid, function (v: App) {
  v.component(CarouselGrid.name, CarouselGrid);
  registerControlProvider(
    'GRID_RENDER_CAROUSEL_GRID',
    () => new CarouselGridProvider(),
  );
});
