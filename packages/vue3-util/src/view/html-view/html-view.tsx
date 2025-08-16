import { StringUtil } from '@ibiz-template/core';
import { IAppDEHtmlView } from '@ibiz/model-core';
import { ViewController, getErrorViewProvider } from '@ibiz-template/runtime';
import {
  h,
  ref,
  PropType,
  computed,
  onBeforeMount,
  defineComponent,
  resolveComponent,
} from 'vue';
import { useNamespace, useViewController } from '../../use';
import './html-view.scss';

export const HtmlView = defineComponent({
  name: 'IBizHtmlView',
  props: {
    context: Object as PropType<IContext>,
    params: { type: Object as PropType<IParams>, default: () => ({}) },
    modelData: { type: Object as PropType<IAppDEHtmlView>, required: true },
    modal: { type: Object as PropType<IAppDEHtmlView> },
    state: { type: Object as PropType<IData> },
  },
  setup() {
    const ns = useNamespace('view');
    const c = useViewController((...args) => new ViewController(...args));
    // 视图部件模型在viewlayoutPanel里面。
    const controls = c.model.viewLayoutPanel?.controls || c.model.controls;
    const { viewType, sysCss, codeName } = c.model;
    const typeClass = viewType!.toLowerCase();
    const sysCssName = sysCss?.cssName;
    const viewClassNames = [
      ns.b(),
      true && ns.b(typeClass),
      true && ns.m(codeName),
      true && sysCssName,
    ];
    const isLoading = ref(false);

    const url = computed(() => {
      const { htmlUrl } = c.model as IAppDEHtmlView;
      if (htmlUrl) return StringUtil.fill(htmlUrl, c.context, c.params);
      return '';
    });

    onBeforeMount(() => {
      if (url.value) {
        isLoading.value = true;
      }
    });

    const onLoad = () => {
      isLoading.value = false;
    };

    return { c, ns, controls, viewClassNames, url, isLoading, onLoad };
  },
  render() {
    if (this.url) {
      return (
        <div class={this.viewClassNames} v-loading={this.isLoading}>
          <iframe src={this.url} onLoad={() => this.onLoad()}></iframe>
        </div>
      );
    }

    let Content = null;
    const provider = getErrorViewProvider('404');
    if (provider) {
      if (typeof provider.component === 'string') {
        Content = h(resolveComponent(provider.component) as string);
      }
      Content = h(provider.component);
    }

    return <div class={this.viewClassNames}>{Content}</div>;
  },
});
