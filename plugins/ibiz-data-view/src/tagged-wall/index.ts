import { App } from 'vue';
import { withInstall } from '@ibiz-template/vue3-util';
import { registerControlProvider } from '@ibiz-template/runtime';
import { TaggedWall } from './tagged-wall';
import { TaggedWallProvider } from './provider';

export const IBizTaggedWall = withInstall(TaggedWall, function (v: App) {
  v.component(TaggedWall.name, TaggedWall);
  registerControlProvider(
    'LIST_RENDER_TAGGED_WALL',
    () => new TaggedWallProvider(),
  );
});
