import { defineComponent, h, PropType, ref, resolveComponent } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import { IDEFormItem } from '@ibiz/model-core';
import { FormItemController } from '@ibiz-template/runtime';
import CompositeFormItem from './composite-form-item/composite-form-item';
import './form-item.scss';

export const FormItem = defineComponent({
  name: 'IBizFormItem',
  props: {
    modelData: {
      type: Object as PropType<IDEFormItem>,
      required: true,
    },
    controller: {
      type: Object as PropType<FormItemController>,
      required: true,
    },
    attrs: {
      type: Object as PropType<IData>,
      required: false,
    },
  },
  setup(props) {
    const ns = useNamespace('form-item');
    const c = props.controller;
    const onValueChange = (
      val: unknown,
      name?: string,
      ignore: boolean = false,
    ): void => {
      props.controller.setDataValue(val, name, ignore);
    };

    // 额外参数
    const extraParams = ref({});

    // 是否隐藏无值的单位
    let emptyHiddenUnit = ibiz.config.form.emptyHiddenUnit;
    const emptyhiddenunit =
      props.controller.form?.controlParams?.emptyhiddenunit;

    if (emptyhiddenunit) {
      emptyHiddenUnit = Object.is(emptyhiddenunit, 'true');
    }

    // 编辑器参数优先级最高
    const editorParams = props.controller.editor?.model?.editorParams || {};
    const { EMPTYHIDDENUNIT } = editorParams;

    if (EMPTYHIDDENUNIT) {
      emptyHiddenUnit = Object.is(EMPTYHIDDENUNIT, 'true');
    }

    Object.assign(extraParams.value, {
      emptyHiddenUnit,
    });

    return { ns, c, extraParams, onValueChange };
  },
  render() {
    if (!this.c.state.visible || this.c.model.editor?.editorType === 'HIDDEN') {
      return null;
    }
    // 编辑器内容
    let editor = null;
    const compositeItem = this.c.model.compositeItem;
    // 复合表单项
    if (compositeItem) {
      const { editorItems = [] } = this.c.model.editor || {};
      editor = editorItems.map((item: IData, index: number) => {
        const controller = this.c.form.details[item.id] as FormItemController;
        return [
          <CompositeFormItem
            modelData={controller.model}
            controller={controller}
            attrs={this.attrs}
          />,
          // feat：复合表单项样式2会在编辑器之间加`-`分隔符
          editorItems.length - 1 > index &&
            this.c.model.detailStyle === 'STYLE2' && (
              <span class={this.ns.e('composite-separator')}>-</span>
            ),
        ];
      });
    } else {
      const editMode = this.c.editor?.model?.editorParams?.editMode;
      const editorProps = {
        style: this.c.editor?.style,
        value: this.c.value,
        data: this.c.data,
        controller: this.c.editor,
        disabled: this.c.state.disabled,
        readonly: this.c.state.readonly,
        onChange: this.onValueChange,
        extraParams: this.extraParams,
        controlParams: editMode
          ? { ...this.c.form.controlParams, editmode: editMode }
          : this.c.form.controlParams,
        onFocus: (event: MouseEvent) => this.c.onFocus(event),
        onBlur: (event: MouseEvent) => this.c.onBlur(event),
        onEnter: (event: MouseEvent) => this.c.onEnter(event),
        onClick: (event: MouseEvent, params: IParams) =>
          this.c.onClick(event, params),
        ...this.attrs,
      };
      if (this.$slots.default) {
        editor = this.$slots.default(editorProps);
      } else if (this.c.editorProvider) {
        const component = resolveComponent(this.c.editorProvider.formEditor);
        editor = h(component, {
          ...editorProps,
        });
      } else {
        editor = (
          <not-supported-editor
            modelData={this.modelData.editor}
            context={this.c.context}
          />
        );
      }
    }

    return (
      <iBizFormItemContainer
        id={`${this.c.form.view.model.codeName}_${this.c.form.model.codeName}_${this.modelData.codeName}`}
        class={[
          this.ns.b(),
          this.ns.m(this.modelData.id),
          this.ns.is('compositeItem', compositeItem),
          ...this.c.containerClass,
        ]}
        style={this.modelData.cssStyle}
        controller={this.c}
        onClick={(event: MouseEvent) => this.c.onClick(event)}
      >
        {editor}
      </iBizFormItemContainer>
    );
  },
});
export default FormItem;
