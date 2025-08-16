import { App } from 'vue';
import { registerControlProvider } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { CarouselList } from './carousel-list';
import { CarouselListProvider } from './carousel-list.provider';

export const IBizCarouselList = withInstall(CarouselList, function (v: App) {
  v.component(CarouselList.name, CarouselList);
  registerControlProvider(
    'LIST_RENDER_CAROUSEL_LIST',
    () => new CarouselListProvider(),
  );
});
