import { useNamespace } from '@ibiz-template/vue3-util';
import { defineComponent, PropType, Ref, ref, watch } from 'vue';
import { createUUID } from 'qx-util';
import {
  IHtmlItem,
  IPanelRawItem,
  IRawItemContainer,
  ITextItem,
  IUnkownItem,
} from '@ibiz/model-core';
import './rawitem.scss';
import { parseHtml } from '../../panel-component/user-message/user-message.util';

export const IBizRawItem = defineComponent({
  name: 'IBizRawItem',
  props: {
    type: {
      type: String,
      required: false,
    },
    content: {
      type: [String, Object, Number],
    },
    rawItem: {
      type: Object as PropType<IRawItemContainer>,
      required: false,
    },
  },
  setup(props) {
    const ns = useNamespace('rawitem');
    let rawItem = null;
    let contentType = '';
    if (props.rawItem) {
      rawItem = props.rawItem.rawItem!;
      contentType = rawItem.contentType!;
    }
    const rawItemType = ref(props.type || contentType || '');
    const rawItemContent: Ref<string | number | IData> = ref('');
    let sysImage = null;
    if (contentType === 'IMAGE') {
      sysImage = (rawItem as IPanelRawItem).sysImage;
    }
    // 传入内容
    if (contentType === 'RAW' || contentType === 'HTML') {
      if (contentType === 'RAW') {
        rawItemType.value = 'TEXT';
        rawItemContent.value = (rawItem as ITextItem).caption!;
      } else {
        rawItemContent.value = (rawItem as IHtmlItem).content!;
      }
    } else if (
      ['VIDEO', 'DIVIDER', 'INFO', 'WARNING', 'ERROR'].includes(contentType!)
    ) {
      rawItemContent.value =
        props.content! || (rawItem as IUnkownItem).rawContent!;
    } else if (contentType === 'IMAGE' && sysImage) {
      rawItemContent.value = sysImage;
    }

    // 判断传入是否为图片路径
    const isImg = (imgUrl: string) => {
      const reg =
        /^https?:|^http?:|(\.png|\.svg|\.jpg|\.png|\.gif|\.psd|\.tif|\.bmp|\.jpeg)/;
      return reg.test(imgUrl);
    };

    // 视频类型内容参数
    const playerParams = ref({
      id: createUUID(),
      path: '',
      mute: true,
      autoplay: true,
      replay: false,
      showcontrols: true,
    });

    // 分割线类型参数
    const dividerParams = ref({
      contentPosition: 'center',
      html: '',
    });

    // 类型参数
    const alertParams = ref({
      type: 'info',
      title: '',
      closeabled: true,
      showIcon: false,
      class: '',
      'left-icon': '',
    });

    // 文本类型显示值
    const rawItemText: Ref<string | number | IData> = ref('');

    // 转换各类值操作
    const convertValue = () => {
      // 图片类型
      if (rawItemType.value === 'IMAGE') {
        if (typeof props.content === 'string') {
          if (isImg(props.content)) {
            rawItemContent.value = { imagePath: props.content };
          } else {
            rawItemContent.value = { cssClass: props.content };
          }
        }
      }

      // 文本类型
      if (
        [
          'TEXT',
          'HEADING1',
          'HEADING2',
          'HEADING3',
          'HEADING4',
          'HEADING5',
          'HEADING6',
          'PARAGRAPH',
          'HTML',
        ].includes(rawItemType.value)
      ) {
        rawItemText.value = rawItemContent.value;
        if (typeof rawItemText.value === 'string') {
          rawItemText.value = rawItemText.value.replaceAll('&lt;', '<');
          rawItemText.value = rawItemText.value.replaceAll('&gt;', '>');
          rawItemText.value = rawItemText.value.replaceAll('&amp;nbsp;', ' ');
          rawItemText.value = rawItemText.value.replaceAll('&nbsp;', ' ');
        }
      }

      // 解析表情内容
      if (rawItemType.value === 'HTML') {
        rawItemText.value = parseHtml(rawItemText.value as string);
      }

      if (
        ['VIDEO', 'DIVIDER', 'INFO', 'WARNING', 'ERROR'].includes(
          rawItemType.value,
        )
      ) {
        if (rawItemContent.value) {
          let rawConfig = {};
          try {
            if (typeof rawItemContent.value === 'string') {
              // eslint-disable-next-line no-new-func
              const func = new Function(`return (${rawItemContent.value});`);
              rawConfig = func();
              switch (rawItemType.value) {
                case 'VIDEO':
                  Object.assign(playerParams.value, rawConfig);
                  break;
                case 'DIVIDER':
                  Object.assign(dividerParams.value, rawConfig);
                  break;
                case 'INFO':
                case 'WARNING':
                case 'ERROR':
                  alertParams.value.class =
                    rawItemType.value.toLocaleLowerCase();
                  if (rawItemType.value === 'ERROR') {
                    alertParams.value['left-icon'] = 'close';
                  } else {
                    alertParams.value['left-icon'] =
                      rawItemType.value.toLocaleLowerCase();
                  }
                  Object.assign(alertParams.value, rawConfig);
                  break;
                default:
                  break;
              }
            }
          } catch {
            ibiz.log.error(
              ibiz.i18n.t('component.rawItem.errorConfig', {
                type: rawItemType.value,
              }),
            );
          }
        }
      }
    };

    convertValue();

    watch(
      () => props.content,
      (newVal, oldVal) => {
        if (newVal !== oldVal) {
          rawItemContent.value = newVal as string | number;
          convertValue();
        }
      },
      {
        immediate: true,
      },
    );

    return {
      ns,
      rawItemText,
      playerParams,
      dividerParams,
      alertParams,
      rawItemType,
      rawItemContent,
    };
  },
  render() {
    const renderContent = () => {
      if (this.rawItemType === 'IMAGE') {
        return (
          <i-biz-icon
            class={[this.ns.e('image')]}
            icon={this.rawItemContent}
          ></i-biz-icon>
        );
      }
      if (this.rawItemType === 'TEXT') {
        return <span class={this.ns.e('text')}>{this.rawItemText}</span>;
      }
      if (this.rawItemType === 'HEADING1') {
        return <h1 class={this.ns.e('h1')}>{this.rawItemText}</h1>;
      }
      if (this.rawItemType === 'HEADING2') {
        return <h2 class={this.ns.e('h2')}>{this.rawItemText}</h2>;
      }
      if (this.rawItemType === 'HEADING3') {
        return <h3 class={this.ns.e('h3')}>{this.rawItemText}</h3>;
      }
      if (this.rawItemType === 'HEADING4') {
        return <h4 class={this.ns.e('h4')}>{this.rawItemText}</h4>;
      }
      if (this.rawItemType === 'HEADING5') {
        return <h5 class={this.ns.e('h5')}>{this.rawItemText}</h5>;
      }
      if (this.rawItemType === 'HEADING6') {
        return <h6 class={this.ns.e('h6')}>{this.rawItemText}</h6>;
      }
      if (this.rawItemType === 'PARAGRAPH') {
        return <p class={this.ns.e('paragraph')}>{this.rawItemText}</p>;
      }
      if (this.rawItemType === 'HTML') {
        return (
          <div class={this.ns.e('paragraph')} v-html={this.rawItemText}></div>
        );
      }
      if (this.rawItemType === 'VIDEO') {
        return (
          <div class={this.ns.e('video')}>
            <video
              id={this.playerParams.id}
              src={this.playerParams.path}
              autoplay={this.playerParams.autoplay}
              controls={this.playerParams.showcontrols}
              loop={this.playerParams.replay}
              muted={this.playerParams.mute}
            >
              <source src={this.playerParams.path} type='video/mp4' />
              <source src={this.playerParams.path} type='video/ogg' />
              <source src={this.playerParams.path} type='video/webm' />
              {ibiz.i18n.t('component.rawItem.noSupportVideo')}
            </video>
          </div>
        );
      }
      if (this.rawItemType === 'DIVIDER') {
        if (this.dividerParams.html) {
          return (
            <van-divider content-position={this.dividerParams.contentPosition}>
              <span v-html={this.dividerParams.html}></span>
            </van-divider>
          );
        }
        return (
          <van-divider
            content-position={this.dividerParams.contentPosition}
          ></van-divider>
        );
      }
      if (
        this.rawItemType === 'INFO' ||
        this.rawItemType === 'WARNING' ||
        this.rawItemType === 'ERROR'
      ) {
        return (
          <van-notice-bar
            text={this.alertParams.title}
            show-icon={this.alertParams.showIcon}
            class={this.alertParams.class}
            left-icon={
              this.alertParams.showIcon ? this.alertParams['left-icon'] : ''
            }
            mode={this.alertParams.closeabled ? 'closeable' : ''}
          >
            {this.alertParams.title}
          </van-notice-bar>
        );
      }
      if (this.rawItemType === 'MARKDOWN') {
        return (
          <iBizMarkDown value={this.content} disabled={true}></iBizMarkDown>
        );
      }
      if (['PLACEHOLDER'].includes(this.rawItemType)) {
        return null;
      }
      return null;
    };

    return <div class={this.ns.b()}>{renderContent()}</div>;
  },
});
