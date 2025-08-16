/* eslint-disable camelcase */
import { computed, defineComponent, PropType } from 'vue';
import { IInternalMessage } from '@ibiz-template/core';
import { useNamespace } from '@ibiz-template/vue3-util';
import './internal-message-json.scss';
import { InternalMessageJSONtProvider } from './internal-message-json.provider';

export const InternalMessageJSON = defineComponent({
  name: 'IBizInternalMessageJSON',
  props: {
    message: {
      type: Object as PropType<IInternalMessage>,
      required: true,
    },
    provider: {
      type: Object as PropType<InternalMessageJSONtProvider>,
      required: true,
    },
  },
  emits: {
    close: () => true,
  },
  setup(props, { emit }) {
    const ns = useNamespace('internal-message-json');

    const jsonContent = computed(() => {
      if (props.message.content && props.message.content_type === 'JSON') {
        return JSON.parse(props.message.content) as IData;
      }
      return null;
    });

    // 没有短内容和长内容不一致时, 显示点击
    const redirectUrl = computed(() => {
      const url = ibiz.env.isMob ? props.message.mobile_url : props.message.url;
      return url || jsonContent.value?.redirecturl;
    });

    const toolbarItems = computed(() => {
      if (!redirectUrl.value) {
        return undefined;
      }
      return [
        {
          icon: 'link-outline',
          key: 'openRedirectView',
          tooltip: ibiz.i18n.t(
            'panelComponent.userMessage.internalMessageJson.jumpToView',
          ),
        },
      ];
    });

    const onToolbarClick = (key: string) => {
      if (key === 'openRedirectView') {
        props.provider.openRedirectView(props.message, redirectUrl.value!);
        emit('close');
      }
    };

    return { ns, jsonContent, toolbarItems, redirectUrl, onToolbarClick };
  },
  render() {
    // 内容区
    let content = null;
    if (this.jsonContent?.html) {
      content = (
        <div class={this.ns.e('content')} v-html={this.jsonContent.html}></div>
      );
    } else if (this.jsonContent?.todoid) {
      content = (
        <div class={this.ns.e('content')}>
          <div class={this.ns.b('todo')}>
            <div class={this.ns.e('header')}>
              <div
                class={this.ns.e('title')}
              >{`${this.jsonContent.title}${this.jsonContent.param05}`}</div>
              <div class={this.ns.e('state')}>
                <el-tag>{this.jsonContent.todostatetext}</el-tag>
              </div>
            </div>
            <div class={this.ns.e('content')}>
              {ibiz.i18n.t(
                'panelComponent.userMessage.internalMessageJson.todoContent',
                {
                  createmanname: this.jsonContent.createmanname,
                  processdate: this.jsonContent.processdate,
                },
              )}
            </div>
          </div>
        </div>
      );
    } else {
      content = (
        <div class={this.ns.e('content')}>
          {ibiz.i18n.t(
            'panelComponent.userMessage.internalMessageJson.missingHtml',
          )}
        </div>
      );
    }

    return (
      <iBizInternalMessageContainer
        class={[this.ns.b()]}
        message={this.message}
        provider={this.provider}
        clickable={!!this.redirectUrl}
        toolbarItems={this.toolbarItems}
        onToolbarClick={this.onToolbarClick}
        onClose={() => this.$emit('close')}
      >
        {content}
      </iBizInternalMessageContainer>
    );
  },
});
