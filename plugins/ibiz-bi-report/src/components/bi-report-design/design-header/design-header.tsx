import { PropType, computed, defineComponent } from 'vue';
import { BIReportDesignController } from '../../../controller';
import { useNamespace } from '../../../use';
import './design.header.scss';

export default defineComponent({
  name: 'BIDesignHeader',
  props: {
    controller: {
      type: Object as PropType<BIReportDesignController>,
      required: true,
    },
  },
  setup(props) {
    const ns = useNamespace('design-header');

    // 属性数据
    const propertyData = computed(() => {
      return props.controller.state.propertyData;
    });

    // 标题
    const caption = computed(() => {
      return propertyData.value?.caption;
    });

    // 保存
    const onSave = () => {
      props.controller.save();
    };

    // 关闭
    const onClose = async () => {
      props.controller.close();
    };

    // 取消保存，效果为重置
    const onReset = async () => {
      if (props.controller && !props.controller.state.dataChangeState) {
        return;
      }
      // 重置为默认值
      const target = await (ibiz as IData).confirm.warning({
        title: '确认取消保存',
        desc: (
          <div class={ns.b('report-caption')}>
            <div>
              确认取消保存报表
              <div class={ns.be('report-caption', 'name')}>
                {caption.value || '未命名'}
              </div>
              吗？
            </div>
            <div class={ns.be('report-caption', 'desc')}>
              取消保存后无法保存编辑信息。
            </div>
          </div>
        ),
      });
      if (target) {
        props.controller.cancel();
      }
    };

    return { ns, caption, onSave, onClose, onReset };
  },
  render() {
    return (
      <div class={this.ns.b()}>
        <div class={this.ns.e('caption')}>
          <span class={this.ns.em('caption', 'text')}>{this.caption}</span>
        </div>
        <div class={this.ns.e('actions')}>
          <div class={this.ns.em('actions', 'close')} onClick={this.onClose}>
            返回
          </div>
          <div class={this.ns.em('actions', 'save')}>
            <el-dropdown
              split-button
              type='primary'
              onClick={this.onSave}
              onCommand={this.onReset}
              popper-class={this.ns.b('save-popper')}
            >
              {{
                default: () => {
                  return <span>保存</span>;
                },
                dropdown: () => {
                  return (
                    <el-dropdown-menu>
                      <el-dropdown-item>取消保存</el-dropdown-item>
                    </el-dropdown-menu>
                  );
                },
              }}
            </el-dropdown>
          </div>
        </div>
      </div>
    );
  },
});
