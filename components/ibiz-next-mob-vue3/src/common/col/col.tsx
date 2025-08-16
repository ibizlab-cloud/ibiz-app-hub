import {
  computed,
  ConcreteComponent,
  defineComponent,
  h,
  PropType,
  resolveComponent,
} from 'vue';
import { IFlexLayoutPos, IGridLayoutPos, ILayoutPos } from '@ibiz/model-core';
import { useNamespace } from '@ibiz-template/vue3-util';
import { calcGridLayoutPos, IColState } from '@ibiz-template/runtime';
import './col.scss';

export const IBizCol = defineComponent({
  name: 'IBizCol',
  props: {
    layoutPos: {
      type: Object as PropType<ILayoutPos>,
      required: true,
    },
    state: {
      type: Object as PropType<IColState>,
      required: true,
    },
  },
  setup(props) {
    const ns = useNamespace('col');

    /**
     * 计算间距类名
     */
    const spacingClass = computed(() => {
      const ns2 = useNamespace('spacing');
      const classArr: string[] = [];
      const spacings: IData = {
        top: props.layoutPos.spacingTop,
        bottom: props.layoutPos.spacingBottom,
        left: props.layoutPos.spacingLeft,
        right: props.layoutPos.spacingRight,
      };
      Object.keys(spacings).forEach(position => {
        const value = spacings[position] as string;
        if (!value) {
          return;
        }
        classArr.push(ns2.bm(position, value.toLowerCase()));
      });
      return classArr;
    });

    // 计算栅格布局的属性
    const gridAttrs = computed(() => {
      const gridLayoutPos = props.layoutPos as IGridLayoutPos;
      // FLEX布局时不计算
      if (gridLayoutPos.layout === 'FLEX') {
        return {};
      }
      const { md } = calcGridLayoutPos(gridLayoutPos);

      return {
        span: md.span,
        offset: md.offset,
      };
    });

    const cssVars = computed(() => {
      const layout = props.state.layout;
      const styles = {
        width: layout.width,
        height: layout.height,
      };
      Object.assign(styles, layout.extraStyle);
      return styles;
    });

    const colClass = computed(() => {
      return [
        ns.b(),
        props.layoutPos?.layout === 'FLEX' ? ns.m('flex') : ns.m('grid'),
        ns.is('hidden', !props.state.visible),
        ...spacingClass.value,
        props.state.layout.extraClass,
      ];
    });

    return { ns, colClass, gridAttrs, cssVars };
  },
  render() {
    // 不显示且不用保活时直接不绘制
    if (!this.state.visible && !this.state.keepAlive) {
      return null;
    }

    const defaultSlot = this.$slots.default?.();
    if (this.layoutPos?.layout === 'FLEX') {
      const pos = this.layoutPos as IFlexLayoutPos;
      return (
        <div
          class={this.colClass}
          style={{
            flexGrow: pos.grow,
            flexShrink: pos.shrink === 1 ? undefined : pos.shrink,
            flexBasis: `${pos.basis}px}`,
            ...this.cssVars,
          }}
        >
          {defaultSlot}
        </div>
      );
    }

    return h(
      resolveComponent('van-col') as ConcreteComponent,
      {
        class: this.colClass,
        style: this.cssVars,
        ...this.gridAttrs,
      },
      { default: () => defaultSlot },
    );
  },
});
