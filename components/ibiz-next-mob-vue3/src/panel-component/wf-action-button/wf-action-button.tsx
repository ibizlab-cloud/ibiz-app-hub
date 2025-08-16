import { useNamespace } from '@ibiz-template/vue3-util';
import { IPanelRawItem } from '@ibiz/model-core';
import { defineComponent, PropType, computed, ref } from 'vue';
import { WFActionButtonController } from './wf-action-button.controller';
import './wf-action-button.scss';

export const WFActionButton = defineComponent({
  name: 'IBizWFActionButton',
  props: {
    modelData: {
      type: Object as PropType<IPanelRawItem>,
      required: true,
    },
    controller: {
      type: WFActionButtonController,
      required: true,
    },
  },
  setup(props) {
    const ns = useNamespace('wf-action-button');

    const { caption, showCaption, sysImage, codeName } = props.modelData;

    const { state } = props.controller;
    const { id } = props.modelData;

    const handleButtonClick = (event: IData) => {
      props.controller.panel.view.call('WFAction', event);
    };
    // 类名控制
    const classArr = computed(() => {
      let result: Array<string | false> = [ns.b(), ns.m(id)];
      result = [
        ...result,
        ...props.controller.containerClass,
        ns.is('hidden', !props.controller.state.visible),
      ];
      return result;
    });

    const renderMode = computed(() => {
      return props.controller.state.wfButtons.length > 2 ? 'sheet' : 'default';
    });

    const show = ref(false);

    return {
      ns,
      showCaption,
      sysImage,
      caption,
      codeName,
      classArr,
      state,
      show,
      renderMode,
      handleButtonClick,
    };
  },
  render() {
    const { wfButtons } = this.controller.state;
    const renderDefault = () => {
      return wfButtons.map((item: IData) => {
        return (
          <van-button
            type='primary'
            disabled={this.state.disabled}
            onClick={() => {
              this.handleButtonClick(item);
            }}
          >
            {item.caption}
          </van-button>
        );
      });
    };
    const renderSheet = () => {
      return [
        <van-button
          type='primary'
          disabled={this.state.disabled}
          onClick={() => {
            this.show = true;
          }}
        >
          {this.caption}
        </van-button>,
        <van-action-sheet
          v-model:show={this.show}
          actions={wfButtons}
          close-on-click-overlay
          cancel-text={ibiz.i18n.t('app.cancel')}
          close-on-click-action
          onSelect={this.handleButtonClick}
        ></van-action-sheet>,
      ];
    };
    if (this.state.visible) {
      return (
        <div class={this.classArr}>
          {this.renderMode === 'default' ? renderDefault() : renderSheet()}
        </div>
      );
    }
    return null;
  },
});
export default WFActionButton;
