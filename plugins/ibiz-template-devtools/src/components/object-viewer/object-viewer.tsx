import { defineComponent } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import { DevToolCollapse, DevToolCollapsePanel } from '../collapse/index';
import './object-viewer.scss';

export const ObjectViewer = defineComponent({
  name: 'DevToolObjectViewer',
  component: [DevToolCollapse, DevToolCollapsePanel],
  props: {
    obj: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const ns = useNamespace('object-viewer');

    const copy = (value: string) => {
      if (!value) {
        return;
      }
      const result = ibiz.util.text.copy(value);
      if (result) {
        ibiz.message.success('拷贝成功!');
      } else {
        ibiz.message.error('拷贝失败，浏览器copy操作不被支持或未被启用!');
      }
    };

    return { ns, copy };
  },
  render() {
    if (!this.obj) {
      return null;
    }

    const keys = Object.keys(this.obj);

    return (
      <div class={[this.ns.b()]}>
        {keys.map(key => {
          const value = this.obj[key];
          if (typeof value === 'object' && value !== null) {
            return (
              <DevToolCollapse value={['sub']}>
                <DevToolCollapsePanel title={key} name='sub'>
                  <ObjectViewer obj={value}></ObjectViewer>
                </DevToolCollapsePanel>
              </DevToolCollapse>
            );
          }
          return (
            <div class={this.ns.b('item')}>
              <div
                class={this.ns.be('item', 'key')}
                title={key}
                onClick={e => {
                  e.stopPropagation();
                  this.copy(key);
                }}
              >
                {key}
              </div>
              <div class={this.ns.be('item', 'separator')}>:</div>
              <div
                class={this.ns.be('item', 'value')}
                title={value}
                onClick={e => {
                  e.stopPropagation();
                  this.copy(value);
                }}
              >{`${value}`}</div>
            </div>
          );
        })}
      </div>
    );
  },
});
