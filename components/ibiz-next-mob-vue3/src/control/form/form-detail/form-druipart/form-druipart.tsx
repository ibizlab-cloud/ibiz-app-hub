import { computed, defineComponent, h, PropType, resolveComponent } from 'vue';
import { useController, useNamespace } from '@ibiz-template/vue3-util';
import './form-druipart.scss';
import { IDEFormDRUIPart } from '@ibiz/model-core';
import { EventBase, FormDRUIPartController } from '@ibiz-template/runtime';

export const FormDRUIPart = defineComponent({
  name: 'IBizFormDRUIPart',
  props: {
    modelData: {
      type: Object as PropType<IDEFormDRUIPart>,
      required: true,
    },
    controller: {
      type: FormDRUIPartController,
      required: true,
    },
  },
  setup(props) {
    const ns = useNamespace('form-druipart');
    useController(props.controller);

    const onCreated = (event: EventBase) => {
      props.controller.setEmbedView(event.view);
    };

    const captionText = computed(() => {
      const { caption, capLanguageRes } = props.modelData;
      let text = caption;
      if (capLanguageRes) {
        text = ibiz.i18n.t(capLanguageRes.lanResTag!, caption);
      }
      return text;
    });
    return {
      ns,
      captionText,
      onCreated,
    };
  },
  render() {
    if (
      !this.controller.state.visible ||
      !this.controller.state.viewComponentKey
    ) {
      return null;
    }

    // 头部绘制
    let header: unknown = null;
    if (this.modelData.showCaption && this.captionText) {
      header = (
        <div class={[this.ns.b('header')]}>
          <div class={[this.ns.e('caption')]}>{this.captionText}</div>
        </div>
      );
    }
    const viewShell = resolveComponent('IBizViewShell');
    return (
      <div
        class={[this.ns.b(), this.ns.m(this.modelData.codeName)]}
        onClick={(event: MouseEvent) => this.controller.onClick(event)}
      >
        {header}
        <div class={this.ns.b('content')}>
          {h(viewShell, {
            context: this.controller.navContext,
            params: this.controller.navParams,
            key: this.controller.state.viewComponentKey,
            viewId: this.controller.model.appViewId,
            state: { noLoadDefault: true },
            onCreated: this.onCreated,
          })}
        </div>
      </div>
    );
  },
});
export default FormDRUIPart;
