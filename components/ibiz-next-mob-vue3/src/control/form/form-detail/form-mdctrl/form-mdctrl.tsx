import { computed, defineComponent, PropType } from 'vue';
import { useController, useNamespace } from '@ibiz-template/vue3-util';
import { IDEFormMDCtrl } from '@ibiz/model-core';
import {
  FormMDCtrlController,
  FormMDCtrlFormController,
  FormMDCtrlRepeaterController,
} from '@ibiz-template/runtime';
import './form-mdctrl.scss';

export const FormMDCtrl = defineComponent({
  name: 'IBizFormMDCtrl',
  props: {
    modelData: {
      type: Object as PropType<IDEFormMDCtrl>,
      required: true,
    },
    controller: {
      type: FormMDCtrlController,
      required: true,
    },
  },
  setup(props) {
    const ns = useNamespace('form-mdctrl');
    useController(props.controller);

    const c = props.controller;
    const hasCaption = c.model.showCaption && !!c.model.caption;

    // 这个样式只考虑重复器和多数据表单

    const hasValue = computed(() => {
      return (
        ((c as FormMDCtrlRepeaterController).value &&
          (c as FormMDCtrlRepeaterController).value!.length > 0) ||
        ((c as FormMDCtrlFormController).state!.items &&
          (c as FormMDCtrlFormController).state!.items!.length > 0)
      );
    });

    return { c, ns, hasCaption, hasValue };
  },
  render() {
    const { model } = this.c;
    let content;

    // 根据内容类型绘制内容组件
    switch (model.contentType) {
      case 'GRID':
      case 'LIST':
      case 'DATAVIEW':
        content = <iBizFormMDCtrlMD controller={this.c} />;
        break;
      case 'FORM':
        content = <iBizFormMDCtrlForm controller={this.c} />;
        break;
      case 'REPEATER':
        content = <iBizFormMDCtrlRepeater controller={this.c} />;
        break;
      default:
        <div>
          {model.contentType}
          {ibiz.i18n.t('app.noSupport')}
        </div>;
        break;
    }

    return (
      <div
        class={[
          this.ns.b(),
          this.ns.m(this.modelData.codeName),
          ...this.controller.containerClass,
          this.hasCaption ? this.ns.m('show-caption') : '',
          this.hasValue ? this.ns.m('has-value') : '',
        ]}
      >
        {this.hasCaption && (
          <div class={this.ns.b('header')}>
            <span class={this.ns.e('title')}>{this.c.model.caption}</span>
          </div>
        )}
        {content}
      </div>
    );
  },
});

export default FormMDCtrl;
