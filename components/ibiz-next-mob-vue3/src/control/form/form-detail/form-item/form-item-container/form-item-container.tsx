/* eslint-disable no-unused-expressions */
import { computed, PropType, defineComponent } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import { FormItemController } from '@ibiz-template/runtime';
import './form-item-container.scss';

export const IBizFormItemContainer = defineComponent({
  name: 'IBizFormItemContainer',
  props: {
    controller: {
      type: Object as PropType<FormItemController>,
      required: true,
    },
  },
  setup(props) {
    const ns = useNamespace('form-item-container');
    let labelAlign: 'right' | 'left' = 'left';
    let editorAlign: 'right' | 'left' = 'right';
    const c = props.controller;
    const { labelPos, labelWidth, enableInputTip, sysImage } = c.model;

    const {
      mobformitemalignmode,
      mobshowunderline,
      mobshoweditorborder,
      mobhideclear,
    } = c.form.controlParams;

    const editorContentAlign =
      mobformitemalignmode || ibiz.config.form.mobFormItemAlignMode;

    let showUnderLine = ibiz.config.form.mobShowUnderLine;
    let showEditorBorder = ibiz.config.form.mobShowEditorBorder;
    let hideClear = false;
    // 部件参数优先级高于全局参数
    if (mobshowunderline) {
      showUnderLine = Object.is(mobshowunderline, 'true');
    }
    if (mobshoweditorborder) {
      showEditorBorder = Object.is(mobshoweditorborder, 'true');
    }
    if (mobhideclear) {
      hideClear = Object.is(mobhideclear, 'true');
    }
    // 编辑器参数优先级最高
    const editorParams = c.editor?.model?.editorParams || {};
    const { MOBSHOWEDITORBORDER, MOBSHOWUNDERLINE, MOBHIDECLEAR } =
      editorParams;
    if (MOBSHOWUNDERLINE) {
      showUnderLine = Object.is(MOBSHOWUNDERLINE, 'true');
    }
    if (MOBSHOWEDITORBORDER) {
      showEditorBorder = Object.is(MOBSHOWEDITORBORDER, 'true');
    }
    if (MOBHIDECLEAR) {
      hideClear = Object.is(MOBHIDECLEAR, 'true');
    }
    const cssVars = computed(() => {
      switch (labelPos) {
        case 'LEFT':
          labelAlign = 'left';
          editorAlign = 'right';
          break;
        case 'RIGHT':
          labelAlign = 'right';
          editorAlign = 'left';
          break;
        case 'BOTTOM':
          labelAlign = 'left';
          editorAlign = 'left';
          break;
        case 'TOP':
          labelAlign = 'left';
          editorAlign = 'left';
          break;
        default:
          break;
      }
      if (editorContentAlign) {
        editorAlign = editorContentAlign;
      }
      const result: IData = {
        'label-align': labelAlign,
        'editor-align': editorAlign,
      };
      if (labelWidth !== 130) {
        Object.assign(result, { 'label-width': `${labelWidth}px` });
      }
      if (hideClear) {
        Object.assign(result, { 'required-style': 'none' });
      } else {
        Object.assign(result, { 'required-style': 'initial' });
      }
      return ns.cssVarBlock(result);
    });

    const handleClick = (e: MouseEvent) => {
      enableInputTip ? c.loadInputTip() : e.stopPropagation();
    };

    const renderLabel = () => {
      return (
        <van-popover
          class={ns.e('popover')}
          placement={labelPos === 'RIGHT' ? 'bottom-end' : 'bottom-start'}
        >
          {{
            default: () => {
              return (
                <div class={ns.em('popover', 'content')}>
                  <div
                    class={ns.em('popover', 'tooltip')}
                    v-html={c.state.inputTip}
                  ></div>
                  {c.state.inputTipUrl && (
                    <a
                      target='_blank'
                      href={c.state.inputTipUrl}
                      title={ibiz.i18n.t('component.formItemContainer.more')}
                    >
                      {ibiz.i18n.t('component.formItemContainer.more')}
                    </a>
                  )}
                </div>
              );
            },
            reference: () => {
              return (
                <div
                  class={[ns.e('label'), ...(c.labelClass || [])]}
                  onClick={handleClick}
                >
                  {enableInputTip && (
                    <ion-icon
                      name='bulb-outline'
                      class={ns.em('label', 'icon')}
                    ></ion-icon>
                  )}
                  {sysImage && (
                    <iBizIcon
                      class={ns.em('label', 'icon')}
                      icon={sysImage}
                    ></iBizIcon>
                  )}
                  <span>{c.labelCaption}</span>
                </div>
              );
            },
          }}
        </van-popover>
      );
    };

    return { ns, cssVars, showUnderLine, showEditorBorder, renderLabel };
  },
  render() {
    const { labelPos } = this.controller.model;
    return (
      <div
        class={[
          this.ns.b(),
          this.ns.m(labelPos?.toLowerCase()),
          this.ns.is('required', this.controller.state.required),
          this.ns.is('error', !!this.controller.state.error),
          this.ns.is('hidden-label', labelPos === 'NONE'),
          this.ns.is('show-underLine', this.showUnderLine),
          this.ns.is('show-border', this.showEditorBorder),
        ]}
        style={this.cssVars}
      >
        <div class={[this.ns.b('content')]}>
          {labelPos && ['LEFT', 'TOP'].includes(labelPos) && this.renderLabel()}
          <div class={[this.ns.e('editor')]}>{this.$slots.default?.()}</div>
          {labelPos &&
            ['RIGHT', 'BOTTOM'].includes(labelPos) &&
            this.renderLabel()}
        </div>
        {this.controller.state.error ? (
          <div class={[this.ns.b('error')]}>{this.controller.state.error}</div>
        ) : null}
      </div>
    );
  },
});
