import { computed, defineComponent, PropType } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import { $RandomColor, $Normal, getRandomColorFromArray } from '../util';
import './tags.scss';
import { TaggedWallController } from './tagged-wall.controller';

export const CustomTag = defineComponent({
  name: 'CustomTag',
  props: {
    tname: {
      type: String,
      required: true,
    },
    controller: {
      type: Object as PropType<TaggedWallController>,
      required: true,
    },
  },
  setup(props) {
    const ns = useNamespace('custom-tag');
    const setColor = computed(() => {
      if (props.controller.customColorGroup.length > 0) {
        return getRandomColorFromArray(props.controller.customColorGroup);
      }
      return $RandomColor();
    });

    const normalSize = computed(() => {
      if (props.controller.enableFontSizeRandom) {
        return `${$Normal(props.controller.maxFontSize, props.controller.minFontSize)}px`;
      }
      return `${props.controller.defaultFontSize}px`;
    });

    return {
      ns,
      setColor,
      normalSize,
      getRandomColorFromArray,
    };
  },
  render() {
    return (
      <a
        class={this.ns.b()}
        style={`color:${this.setColor};font-size:${this.normalSize}`}
      >
        {this.tname}
      </a>
    );
  },
});
