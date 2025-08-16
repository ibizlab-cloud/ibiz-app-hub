import {
  VNode,
  computed,
  defineComponent,
  h,
  ref,
  resolveComponent,
} from 'vue';
import {
  EventBase,
  FormMDCtrlMDController,
  IMDControlController,
} from '@ibiz-template/runtime';
import { useNamespace } from '@ibiz-template/vue3-util';
import './form-mdctrl-md.scss';

export const FormMDCtrlMD = defineComponent({
  name: 'IBizFormMDCtrlMD',
  props: {
    controller: {
      type: FormMDCtrlMDController,
      required: true,
    },
  },
  setup(props) {
    const ns = useNamespace('form-mdctrl-md');

    /** 是否显示操作按钮 */
    const showActions = computed(() => {
      return props.controller.enableCreate || props.controller.enableDelete;
    });

    const onCreated = (event: EventBase): void => {
      props.controller.setMDControl(event.ctrl as IMDControlController);
    };

    /** 是否选中数据 */
    const isSelected = ref(false);
    const onSelectionChange = (event: EventBase): void => {
      isSelected.value = event.data.length > 0;
    };

    return { ns, showActions, isSelected, onCreated, onSelectionChange };
  },
  render() {
    const { mdProvider, model } = this.controller;

    const isLoaded = this.controller.form.state.isLoaded;

    let controlComponent: VNode | null = null;

    if (isLoaded) {
      //* 绘制多数据部件
      const controlProps: IData = {
        class: this.ns.b('content'),
        modelData: model.contentControl!,
        context: this.controller.form.context,
        params: this.controller.form.params,
        onCreated: this.onCreated,
        onSelectionChange: this.onSelectionChange,
      };

      // 表格的额外props
      if (model.contentType === 'GRID') {
        controlProps.rowEditOpen = true;
      }

      controlComponent = h(
        resolveComponent(mdProvider.component),
        controlProps,
      );
    }

    return (
      <div class={this.ns.b()}>
        {this.showActions && (
          <div class={this.ns.b('actions')}>
            {this.controller.enableCreate && (
              <van-button
                class={[
                  this.ns.be('actions', 'create'),
                  this.ns.be('actions', 'btn'),
                ]}
                size='small'
                type='primary'
                onClick={(): void => this.controller.create()}
              >
                {ibiz.i18n.t('app.add')}
              </van-button>
            )}
            {this.controller.enableDelete && (
              <van-button
                type='danger'
                size='small'
                disabled={!this.isSelected}
                class={[
                  this.ns.be('actions', 'remove'),
                  this.ns.be('actions', 'btn'),
                ]}
                onClick={(): void => this.controller.remove()}
              >
                {ibiz.i18n.t('app.delete')}
              </van-button>
            )}
          </div>
        )}
        {controlComponent}
      </div>
    );
  },
});
