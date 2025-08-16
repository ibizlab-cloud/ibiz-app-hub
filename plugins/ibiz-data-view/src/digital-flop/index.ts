import { withInstall } from '@ibiz-template/vue3-util';
import { App } from 'vue';
import { registerEditorProvider } from '@ibiz-template/runtime';
import { DigitalFlop } from './digital-flop';
import { DigitalFlopProvider } from './digital-flop.provider';

export const IBizDigitalFlop = withInstall(DigitalFlop, function (v: App) {
  v.component(DigitalFlop.name, DigitalFlop);
  registerEditorProvider('SPAN_DIGITAL_FLOP', () => new DigitalFlopProvider());
});
