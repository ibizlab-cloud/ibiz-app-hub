import { defineComponent, onBeforeUnmount, onMounted, ref } from 'vue';
import { getSpanProps, useNamespace } from '@ibiz-template/vue3-util';
import day from 'dayjs';
import { ScreenPortletRealTimeController } from './screen-portlet-real-time.controller';
import './screen-portlet-real-time.scss';

export const ScreenPortletRealTime = defineComponent({
  name: 'ScreenPortletRealTime',
  // @ts-ignore
  props: getSpanProps<ScreenPortletRealTimeController>(),
  setup(props) {
    const ns = useNamespace('screen-portlet-real-time');

    const c = props.controller;

    let timerId: NodeJS.Timeout | null = null;

    const weekDays = ['日', '一', '二', '三', '四', '五', '六'];

    const leftText = ref<string>('');
    const week = ref<string>('');
    const rightText = ref<string>('');

    onMounted(() => {
      timerId = setInterval(() => {
        const now = day();

        leftText.value = c.leftTime ? `${now.format(c.leftTime)} ` : '';
        week.value = c.showWeek ? `星期${weekDays[now.day()]} ` : '';
        rightText.value = c.rightTime ? now.format(c.rightTime) : '';
      }, 1000);
    });

    onBeforeUnmount(() => {
      if (timerId) {
        clearInterval(timerId);
      }
    });

    return {
      ns,
      c,
      leftText,
      week,
      rightText,
    };
  },
  render() {
    return (
      <div class={this.ns.b()}>
        {this.leftText ? (
          <div class={this.ns.e('left-time')}>{this.leftText}</div>
        ) : null}
        {this.week ? <div class={this.ns.e('week')}>{this.week}</div> : null}

        <div class={this.ns.e('right-time')}>{this.rightText}</div>
      </div>
    );
  },
});
