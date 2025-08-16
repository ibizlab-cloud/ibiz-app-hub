import { useNamespace } from '@ibiz-template/vue3-util';
import { IPanelButton } from '@ibiz/model-core';
import { defineComponent, PropType, computed } from 'vue';
import { PanelButtonController } from './panel-button.controller';
import { convertBtnType } from '../../util';
import './panel-button.scss';

export const PanelButton = defineComponent({
  name: 'IBizPanelButton',
  props: {
    modelData: {
      type: Object as PropType<IPanelButton>,
      required: true,
    },
    controller: {
      type: PanelButtonController,
      required: true,
    },
  },
  setup(props) {
    const ns = useNamespace('panel-button');

    const {
      caption,
      captionItemName,
      renderMode,
      buttonStyle,
      showCaption,
      sysImage,
      codeName,
    } = props.modelData;

    const { panel, state } = props.controller;
    const { id } = props.modelData;
    const captionText = computed(() => {
      if (captionItemName && panel.data) {
        return panel.data[captionItemName];
      }
      return caption;
    });

    const buttonType = computed(() => {
      if (Object.is(renderMode, 'LINK')) return 'text';
      return convertBtnType(buttonStyle);
    });

    const handleButtonClick = (event: MouseEvent) => {
      props.controller.onActionClick(event);
    };

    // 类名控制
    const classArr = computed(() => {
      let result: Array<string | false> = [ns.b(), ns.m(id)];
      result = [
        ...result,
        ...props.controller.containerClass,
        ns.is('hidden', !props.controller.state.visible),
        ns.is(
          'login-btn',
          props.modelData.id?.toUpperCase() === 'AUTH_LOGINBUTTON',
        ),
      ];
      return result;
    });

    return {
      ns,
      state,
      sysImage,
      codeName,
      classArr,
      buttonType,
      captionText,
      showCaption,
      handleButtonClick,
    };
  },
  render() {
    if (this.state.visible) {
      return (
        <van-button
          type={this.buttonType}
          disabled={this.state.disabled}
          onClick={this.handleButtonClick}
          class={this.classArr}
        >
          <div class={this.ns.b('content')}>
            <iBizIcon
              class={this.ns.bm('content', 'icon')}
              icon={this.sysImage}
            />
            <span class={this.ns.bm('content', 'caption')}>
              {this.showCaption ? this.captionText : null}
            </span>
          </div>
        </van-button>
      );
    }
    return null;
  },
});
export default PanelButton;
