import {
  defineComponent,
  h,
  PropType,
  ref,
  watch,
  resolveComponent,
  Ref,
} from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import { isNil } from 'ramda';
import { createUUID } from 'qx-util';
import './flow-drtab.scss';

export const FlowDrtab = defineComponent({
  name: 'FlowDrtab',
  props: {
    pagesstate: {
      type: Array as PropType<IData[]>,
      default: () => [],
    },
    drtabpages: {
      type: Array as PropType<IData[]>,
      default: () => [],
    },
    context: {
      type: Object as PropType<IContext>,
      default: () => {},
    },
    params: {
      type: Object as PropType<IParams>,
      default: () => {},
    },
    counterData: {
      type: Array as PropType<IData>,
      default: () => {},
    },
    showHeader: {
      type: Boolean,
      default: true,
    },
    activeTab: {
      type: Object as PropType<IData>,
      default: () => {},
    },
  },
  setup(props) {
    const ns = useNamespace('flow-drtab');
    const uuid = createUUID();
    const navtag = ref('');
    const viewList: Ref<IData[]> = ref([]);

    // 滚定到目标
    const scrollToTarget = () => {
      if (navtag.value) {
        const el = document.getElementById(`${uuid}_${navtag.value}`);
        if (el) {
          el.scrollIntoView();
        }
      }
    };

    // 分页视图挂载完成
    const onViewMounted = () => {
      scrollToTarget();
    };

    watch(
      () => props.activeTab,
      (newVal, oldVal) => {
        if (newVal && newVal.tag !== oldVal?.tag) {
          navtag.value = newVal.tag;
          scrollToTarget();
        }
      },
      {
        deep: true,
        immediate: true,
      },
    );

    watch(
      () => props.drtabpages,
      newVal => {
        if (newVal) {
          Promise.all(
            newVal.map(async (item: IData) => {
              const view = await ibiz.hub.getAppView(item.appViewId);
              return { id: item.id, height: view?.height, width: view?.width };
            }),
          ).then(res => {
            viewList.value = res;
          });
        }
      },
      {
        deep: true,
        immediate: true,
      },
    );
    // 计算视图默认宽高
    const calcStyle = (tag: string) => {
      const target = viewList.value.find(item => {
        return item.id === tag;
      });
      if (target) {
        return {
          height: target.height ? `${target.height}px` : '100%',
          width: target.width ? `${target.width}px` : '100%',
        };
      }
    };

    return { ns, uuid, onViewMounted, calcStyle };
  },
  render() {
    const tabs = this.pagesstate.map((item: IData) => {
      const counterNum = item.counterId
        ? this.counterData[item.counterId]
        : undefined;
      const viewShell = resolveComponent('IBizViewShell');
      const target = this.drtabpages.find(page => {
        return page.id === item.tag;
      });
      if (!target || item.hidden) {
        return null;
      }
      return (
        <div id={`${this.uuid}_${item.tag}`} class={this.ns.e('tab-item')}>
          {this.showHeader && (
            <div class={this.ns.em('tab-item', 'label')}>
              {item.sysImage && (
                <iBizIcon
                  class={this.ns.be('label', 'icon')}
                  icon={item.sysImage}
                />
              )}
              <span class={this.ns.be('label', 'text')}>{item.caption}</span>
              {!isNil(counterNum) && (
                <iBizBadge
                  class={this.ns.e('counter')}
                  value={counterNum}
                  counterMode={item.counterMode}
                />
              )}
            </div>
          )}
          <div
            class={this.ns.em('tab-item', 'tab-view')}
            style={this.calcStyle(item.tag)}
          >
            {h(viewShell, {
              context: this.context,
              params: this.params,
              viewId: target.appViewId,
              onMounted: this.onViewMounted,
            })}
          </div>
        </div>
      );
    });
    return (
      <div class={this.ns.b()}>
        <div class={this.ns.e('container')}>{tabs}</div>
      </div>
    );
  },
});
