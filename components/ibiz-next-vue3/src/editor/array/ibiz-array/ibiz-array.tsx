import { computed, defineComponent, Ref, ref, VNode, watch } from 'vue';
import {
  getArrayProps,
  getEditorEmits,
  useNamespace,
} from '@ibiz-template/vue3-util';
import { createUUID } from 'qx-util';
import { toNumber } from 'lodash-es';
import { ArrayEditorController } from '../array-editor.controller';
import './ibiz-array.scss';

/**
 * 数组数据编辑
 *
 * @description 使用el-input组件封装，提供数组数据的输入能力，其呈现样式为多个携带自增自减按钮的输入框。支持编辑器类型包含：`数组编辑器`
 * @primary
 * @editorparams {"name":"editorstyle","parameterType":"'default' | 'url' | 'img'","defaultvalue":"'default'","description":"当设置为 'url' 时，输入框会显示内容的前缀和后缀，鼠标移入输入框的提示信息将以链接形式展示；设置为 'img' 时，鼠标移入输入框的提示信息将以图片形式展示"}
 * @editorparams {"name":"size","parameterType":"'large' | 'default' | 'small'","defaultvalue":"'default'","description":"el-input组件的size属性"}
 * @editorparams {"name":"limit","parameterType":"number","defaultvalue":0,"description":"默认不限制输入项数量，若设置了非零的限制数，当输入项数量超出该限制时，自增按钮将隐藏"}
 * @editorparams {"name":"maxlength","parameterType":"number","description":"设置单个输入框可输入内容的最大长度，仅在 editorstyle 参数设置为 'url' 时生效"}
 * @editorparams {"name":"showwordlimit","parameterType":"boolean","defaultvalue":false,"description":"是否显示字数限制，仅在 editorstyle 参数设置为 'url'，并且数据类型为 'text' 时生效"}
 * @editorparams {"name":"prepend","parameterType":"string","description":"该配置内容会显示在每个输入框的头部，仅在 editorstyle 参数设置为 'url' 时生效"}
 * @editorparams {"name":"append","parameterType":"string","description":"该配置内容会显示在每个输入框的尾部，仅在 editorstyle 参数设置为 'url' 时生效"}
 * @editorparams {"name":"target","parameterType":"'_blank' | '_parent' | '_self' | '_top'","defaultvalue":"'_blank'","description":"该参数用于控制文字提示链接的打开方式，仅在 editorstyle 参数设置为 'url' 时生效"}
 * @editorparams {"name":"triggermode","parameterType":"'blur' |' input'","defaultvalue":"'blur'","description":"指定编辑器触发 `change` 值变更事件的模式，input: 输入框输入时触发事件，blur：输入框blur时触发事件"}
 * @editorparams {"name":"readonly","parameterType":"boolean","defaultvalue":false,"description":"设置编辑器是否为只读态"}
 * @ignoreprops  autoFocus | overflowMode
 * @ignoreemits  infoTextChange
 */
export const IBizArray = defineComponent({
  name: 'IBizArray',
  props: getArrayProps<ArrayEditorController>(),
  emits: getEditorEmits(),
  setup(props, { emit }) {
    const ns = useNamespace('array');

    const c = props.controller!;

    const editorModel = c.model;

    // 编辑器样式
    let editorStyle = 'default';
    // 输入框大小
    let size = 'default';
    // 数组大小限制
    let limit = 0;
    // 输入内容最长长度
    let maxLength;
    // 是否显示输入内容长度
    let showWordLimit = false;
    // 输入内容前缀
    let prepend = '';
    // 输入内容后缀
    let append = '';
    // 超链接打开方式
    let target = '_blank';
    // 输入内容项集合
    const items: Ref<IData[]> = ref([]);

    if (editorModel.editorParams) {
      if (editorModel.editorParams.editorStyle) {
        editorStyle = editorModel.editorParams.editorStyle;
      }
      if (editorModel.editorParams.editorstyle) {
        editorStyle = editorModel.editorParams.editorstyle;
      }
      if (editorModel.editorParams.size) {
        size = editorModel.editorParams.size;
      }
      if (editorModel.editorParams.limit) {
        limit = toNumber(editorModel.editorParams.limit);
      }
      if (editorModel.editorParams.maxLength) {
        maxLength = toNumber(editorModel.editorParams.maxLength);
      }
      if (editorModel.editorParams.maxlength) {
        maxLength = toNumber(editorModel.editorParams.maxlength);
      }
      if (editorModel.editorParams.showWordLimit) {
        showWordLimit = c.toBoolean(editorModel.editorParams.showWordLimit);
      }
      if (editorModel.editorParams.showwordlimit) {
        showWordLimit = c.toBoolean(editorModel.editorParams.showwordlimit);
      }
      if (editorModel.editorParams.prepend) {
        prepend = editorModel.editorParams.prepend;
      }
      if (editorModel.editorParams.append) {
        append = editorModel.editorParams.append;
      }
      if (editorModel.editorParams.target) {
        target = editorModel.editorParams.target;
      }
    }

    // 输入框类型
    const dataType = editorModel.dataType;
    const type =
      Object.is(dataType, 'NUMBER') || Object.is(dataType, 'INTEGER')
        ? 'number'
        : 'text';

    // 是否显示表单默认内容
    const showFormDefaultContent = computed(() => {
      if (
        props.controlParams &&
        props.controlParams.editmode === 'hover' &&
        !props.readonly
      ) {
        return true;
      }
      return false;
    });

    watch(
      () => props.value,
      (newVal, oldVal) => {
        if (newVal && newVal !== oldVal) {
          if (items.value.length === 0) {
            const tempItems = newVal.map((value: string | number) => {
              return { value, key: createUUID() };
            });
            items.value = tempItems;
          }
        }
      },
      { immediate: true },
    );

    // 获取Url路径
    const getUrl = (value: string): string => {
      let tempValue = value;
      if (tempValue) {
        if (prepend) {
          tempValue = prepend + tempValue;
        }
        if (append) {
          tempValue += append;
        }
      }
      return tempValue;
    };

    // 抛值
    const onEmit = (eventName: string = 'blur'): void => {
      const result = items.value.map(item => item.value);
      if (eventName === c.triggerMode) {
        emit('change', result);
      }
    };

    // 新增项
    const addItem = (index?: number): void => {
      if (props.disabled || props.readonly) {
        return;
      }
      const tempLink = {
        key: createUUID(),
        value: null,
      };
      if (index) {
        items.value.splice(index, 0, tempLink);
      } else {
        items.value.push(tempLink);
      }
      onEmit();
    };

    // 删除项
    const removeItem = (index: number): void => {
      items.value.splice(index, 1);
      onEmit();
    };

    // 处理值改变
    const handleChange = (value: string | number, index: number): void => {
      items.value[index].value = value;
      onEmit();
    };

    // 处理值改变
    const handleInput = (value: string | number, index: number): void => {
      items.value[index].value = value;
      onEmit('input');
    };

    const onBlur = (e: IData): void => {
      emit('blur', e);
    };

    const onFocus = (e: IData): void => {
      emit('focus', e);
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e && e.code === 'Enter') {
        emit('enter', e);
      }
    };

    return {
      ns,
      c,
      editorStyle,
      type,
      size,
      limit,
      maxLength,
      showWordLimit,
      prepend,
      append,
      target,
      items,
      getUrl,
      addItem,
      removeItem,
      handleChange,
      handleInput,
      onBlur,
      onFocus,
      handleKeyUp,
      showFormDefaultContent,
    };
  },
  render() {
    return (
      <div
        class={[
          this.ns.b(),
          this.disabled ? this.ns.m('disabled') : '',
          this.readonly ? this.ns.m('readonly') : '',
          this.ns.is('show-default', this.showFormDefaultContent),
        ]}
      >
        {this.items.length === 0 ? (
          <ion-icon
            class={this.ns.b('add-icon')}
            name='add-outline'
            onClick={this.addItem}
          />
        ) : (
          this.items.map((item, index) => {
            return (
              <div class={this.ns.b('item')} key={item.key}>
                {this.editorStyle === 'default' ? (
                  <el-input
                    type={this.type}
                    size={this.size}
                    v-model={item.value}
                    placeholder={this.c.placeHolder}
                    disabled={this.disabled}
                    readonly={this.readonly}
                    onBlur={this.onBlur}
                    onFocus={this.onFocus}
                    onKeyup={this.handleKeyUp}
                    onChange={(val: string | number): void =>
                      this.handleChange(val, index)
                    }
                    onInput={(val: string | number): void =>
                      this.handleInput(val, index)
                    }
                    {...this.$attrs}
                  ></el-input>
                ) : (
                  <el-tooltip
                    placement='bottom'
                    trigger='hover'
                    popper-class={this.ns.b('tooltip')}
                  >
                    {{
                      default: (): VNode => {
                        return (
                          <el-input
                            type={this.type}
                            size={this.size}
                            v-model={item.value}
                            placeholder={this.c.placeHolder}
                            disabled={this.disabled}
                            readonly={this.readonly}
                            maxlength={
                              Object.is(this.editorStyle, 'url')
                                ? this.maxLength
                                : null
                            }
                            show-word-limit={
                              Object.is(this.editorStyle, 'url')
                                ? this.showWordLimit
                                : null
                            }
                            onBlur={this.onBlur}
                            onFocus={this.onFocus}
                            onChange={(val: string | number): void =>
                              this.handleChange(val, index)
                            }
                            onInput={(val: string | number): void =>
                              this.handleInput(val, index)
                            }
                            onKeyup={this.handleKeyUp}
                            {...this.$attrs}
                          >
                            {{
                              prefix: (): string | null => {
                                if (
                                  Object.is(this.editorStyle, 'url') &&
                                  this.prepend
                                ) {
                                  return this.prepend;
                                }
                                return null;
                              },
                              suffix: (): string | null => {
                                if (
                                  Object.is(this.editorStyle, 'url') &&
                                  this.append
                                ) {
                                  return this.append;
                                }
                                return null;
                              },
                            }}
                          </el-input>
                        );
                      },
                      content: (): VNode => {
                        if (this.editorStyle === 'img') {
                          return (
                            <el-image fit='contain' src={item.value}></el-image>
                          );
                        }
                        return (
                          <el-link
                            href={this.getUrl(item.value)}
                            target={this.target}
                          >
                            {this.getUrl(item.value)}
                          </el-link>
                        );
                      },
                    }}
                  </el-tooltip>
                )}
                {!(this.disabled || this.readonly) && (
                  <div class={this.ns.b('icons')}>
                    {(!this.limit || this.items.length < this.limit) && (
                      <ion-icon
                        class={this.ns.b('add-icon')}
                        name='add'
                        onClick={(): void => this.addItem(index + 1)}
                      />
                    )}
                    <ion-icon
                      class={this.ns.b('remove-icon')}
                      name='remove'
                      onClick={(): void => this.removeItem(index)}
                    />
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    );
  },
});
