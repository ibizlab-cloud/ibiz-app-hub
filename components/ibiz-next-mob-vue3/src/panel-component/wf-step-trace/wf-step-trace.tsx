import { useNamespace } from '@ibiz-template/vue3-util';
import { computed, defineComponent } from 'vue';
import { WFStepTraceController } from './wf-step-trace.controller';
import './wf-step-trace.scss';

export const WFStepTrace = defineComponent({
  name: 'IBizWFStepTrace',
  props: {
    controller: {
      type: WFStepTraceController,
      required: true,
    },
  },
  setup(props) {
    const ns = useNamespace('wf-step-trace');
    const data = computed(() => {
      return props.controller.getData();
    });
    return {
      ns,
      data,
    };
  },
  render() {
    return (
      <div class={this.ns.b()}>
        {this.data && (
          <van-steps direction='vertical'>
            {this.data.map((task: IData) => {
              return (
                <van-step>
                  <div class={[this.ns.b('task')]}>
                    <div class={this.ns.b('task-item')}>
                      <van-field
                        readonly
                        v-model={task.time}
                        label={ibiz.i18n.t(
                          'panelComponent.wfStepTrace.processingComplete',
                        )}
                      />
                    </div>
                    <div class={this.ns.b('task-item')}>
                      <van-field
                        readonly
                        v-model={task.type}
                        label={ibiz.i18n.t(
                          'panelComponent.wfStepTrace.processingSteps',
                        )}
                      />
                    </div>
                    <div class={this.ns.b('task-item')}>
                      <van-field
                        readonly
                        v-model={task.authorName}
                        label={ibiz.i18n.t(
                          'panelComponent.wfStepTrace.processingPersonnel',
                        )}
                      />
                    </div>
                    <div class={this.ns.b('task-item')}>
                      <van-field
                        v-model={task.taskName}
                        readonly
                        label={ibiz.i18n.t(
                          'panelComponent.wfStepTrace.submissionPath',
                        )}
                      />
                    </div>
                  </div>
                </van-step>
              );
            })}
          </van-steps>
        )}
      </div>
    );
  },
});
export default WFStepTrace;
