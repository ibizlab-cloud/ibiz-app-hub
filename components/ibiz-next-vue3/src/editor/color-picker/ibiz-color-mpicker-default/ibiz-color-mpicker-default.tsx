/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useNamespace } from '@ibiz-template/vue3-util';
import { defineComponent, ref, watch, computed, PropType } from 'vue';
import './ibiz-color-mpicker-default.scss';

export const IBizColorMPickerDefault = defineComponent({
  name: 'IBizColorMPickerDefault',
  props: {
    value: {
      type: [Array, String],
    },
    customColorList: {
      type: String,
    },
    type: {
      type: String as PropType<'ITEM' | 'ITEMS'>,
      default: 'ITEMS',
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['change'],
  setup(props, { emit }) {
    const ns = useNamespace('color-mpicker-default');

    // 选择的类型
    const curType = ref('default');

    // 选择的模板颜色
    const curTemplateColor = ref('');

    const showTemplateList = ref(false);

    // 颜色类型
    const colorType: IData[] = [
      {
        text: ibiz.i18n.t('editor.colorPicker.systemColor'),
        value: 'default',
      },
      {
        text: ibiz.i18n.t('editor.colorPicker.templateColor'),
        value: 'template',
      },
    ];

    // 模板配色
    const templateColorList = computed(() => {
      if (props.customColorList) {
        return JSON.parse(props.customColorList);
      }
      return [
        {
          text: ibiz.i18n.t('editor.colorPicker.simpleBlue'),
          value:
            props.type === 'ITEM'
              ? ['#6698FF']
              : [
                  '#6698FF',
                  '#73DEB3',
                  '#7585A2',
                  '#F7BE21',
                  '#EE734A',
                  '#83D0EE',
                ],
        },
        {
          text: ibiz.i18n.t('editor.colorPicker.autumnOrange'),
          value:
            props.type === 'ITEM'
              ? ['#EE734A']
              : [
                  '#EE734A',
                  '#7585A2',
                  '#FEC103',
                  '#9EB411',
                  '#CD8050',
                  '#DAD5B5',
                ],
        },
        {
          text: ibiz.i18n.t('editor.colorPicker.Macaroon'),
          value:
            props.type === 'ITEM'
              ? ['#467CE6']
              : [
                  '#467CE6',
                  '#CD74CA',
                  '#4997CC',
                  '#BCBFE3',
                  '#666CEB',
                  '#82BC9A',
                ],
        },
        {
          text: ibiz.i18n.t('editor.colorPicker.mintGreen'),
          value:
            props.type === 'ITEM'
              ? ['#118299']
              : [
                  '#118299',
                  '#13B3B3',
                  '#73DEB3',
                  '#FEC103',
                  '#9EB411',
                  '#83D0EE',
                ],
        },
      ];
    });

    // 模板颜色切换
    const handleTemplateColorChange = () => {
      const temmpVal = JSON.parse(curTemplateColor.value);
      emit('change', temmpVal);
    };

    // 类型切换
    const handleSchemeChange = () => {
      if (curType.value === 'default') {
        showTemplateList.value = false;
        emit('change', templateColorList.value[0]?.value?.[0]);
      } else {
        showTemplateList.value = true;
      }
    };

    watch(
      () => props.value,
      () => {
        if (props.value) {
          if (typeof props.value === 'string') {
            // 系统的
            curType.value = 'default';
            showTemplateList.value = false;
          } else {
            // 模板的
            curType.value = 'template';
            showTemplateList.value = true;
            if (props.value.length > 0) {
              curTemplateColor.value = JSON.stringify(props.value);
            }
          }
        } else {
          curType.value = 'default';
          showTemplateList.value = false;
        }
      },
      {
        immediate: true,
        deep: true,
      },
    );

    return {
      ns,
      curType,
      curTemplateColor,
      showTemplateList,
      colorType,
      templateColorList,
      handleTemplateColorChange,
      handleSchemeChange,
    };
  },
  render() {
    return (
      <div class={this.ns.b()}>
        <el-select
          class={this.ns.b('picker')}
          popper-class={this.ns.b('popper')}
          v-model={this.curType}
          onChange={this.handleSchemeChange}
        >
          {{
            default: () => {
              return this.colorType.map(scheme => {
                return (
                  <el-option
                    key={scheme.value}
                    label={scheme.text}
                    value={scheme.value}
                  />
                );
              });
            },
          }}
        </el-select>
        {this.showTemplateList && (
          <el-select
            class={this.ns.b('template-color-picker')}
            popper-class={this.ns.b('popper')}
            v-model={this.curTemplateColor}
            onChange={this.handleTemplateColorChange}
          >
            {{
              default: () => {
                return this.templateColorList.map((color: IData) => {
                  return (
                    <el-option
                      key={color.key}
                      label={color.text}
                      value={JSON.stringify(color.value)}
                    >
                      {{
                        default: () => {
                          return (
                            <div
                              class={this.ns.b('template-color-picker-option')}
                            >
                              {Array.isArray(color.value) ? (
                                color.value.map(item => (
                                  <div
                                    class={this.ns.be(
                                      'template-color-picker',
                                      'icon',
                                    )}
                                    style={{ background: item }}
                                  ></div>
                                ))
                              ) : (
                                <div
                                  class={this.ns.be(
                                    'template-color-picker',
                                    'icon',
                                  )}
                                  style={{ background: color.value }}
                                ></div>
                              )}

                              <div
                                class={this.ns.be(
                                  'template-color-picker',
                                  'text',
                                )}
                              >
                                {color.text}
                              </div>
                            </div>
                          );
                        },
                      }}
                    </el-option>
                  );
                });
              },
              prefix: () => {
                if (this.curTemplateColor) {
                  const colors = JSON.parse(this.curTemplateColor);
                  return Array.isArray(colors) ? (
                    colors.map(item => (
                      <div
                        class={this.ns.be('template-color-picker', 'icon')}
                        style={{ background: item }}
                      ></div>
                    ))
                  ) : (
                    <div
                      class={this.ns.be('template-color-picker', 'icon')}
                      style={{ background: colors[0] }}
                    >
                      {colors[0]}
                    </div>
                  );
                }
              },
            }}
          </el-select>
        )}
      </div>
    );
  },
});
