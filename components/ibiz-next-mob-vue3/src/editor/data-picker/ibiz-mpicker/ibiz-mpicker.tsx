import { ref, watch, Ref, defineComponent, computed } from 'vue';
import {
  getDataPickerProps,
  getEditorEmits,
  useNamespace,
} from '@ibiz-template/vue3-util';
import './ibiz-mpicker.scss';
import { PickerEditorController } from '../picker-editor.controller';
import { IBizDataMPicker } from '../../common/data-mpicker/ibiz-data-mpicker';
import { IBizCommonRightIcon } from '../../common/right-icon/right-icon';

export const IBizMPicker = defineComponent({
  name: 'IBizMPicker',
  props: getDataPickerProps<PickerEditorController>(),
  emits: getEditorEmits(),
  setup(props, { emit }) {
    const ns = useNamespace('mpicker');

    const c: PickerEditorController = props.controller!;

    // 当前表单项绑定值key的集合
    const curValue: Ref<Array<string>> = ref([]);

    // 实体数据集
    const items: Ref<IData[]> = ref([]);

    // 选中项key-value键值对
    const selectItems: Ref<IData[]> = ref([]);

    // 是否显示picker
    const showPicker = ref(false);

    // 格式化
    const formatter = (item: IData) => {
      return {
        srfkey: item[c.keyName] || item.srfkey,
        value: item[c.keyName] || item.srfkey,
        srfmajortext: item[c.textName] || item.srfmajortext,
        text: item[c.textName] || item.srfmajortext,
        ...item,
      };
    };
    // 监听传入值
    watch(
      () => props.value,
      newVal => {
        curValue.value = [];
        selectItems.value = [];
        if (newVal) {
          selectItems.value = JSON.parse(newVal as string).map(formatter);
          selectItems.value.forEach((item: IData) => {
            curValue.value.push(item.srfkey);

            // 选项没有的时候补充选项
            const index = items.value.findIndex(i =>
              Object.is(i.srfkey, item.srfkey),
            );
            if (index < 0) {
              items.value.push(formatter(item));
            }
          });
        }
      },
      { immediate: true, deep: true },
    );

    // 处理视图关闭，往外抛值
    const handleOpenViewClose = (result: IData[]) => {
      // 抛出值集合
      const valArr: IData[] = [];
      if (result && Array.isArray(result)) {
        result.forEach((select: IData) => {
          // 回显并且回来的选中值只有srfkey和srfmajortext,所以||
          const formattedItem = formatter(select);
          valArr.push(formattedItem);

          // 选项不存在的补充到选项里
          const index = items.value.findIndex(item =>
            Object.is(item[c.keyName], select[c.keyName]),
          );
          if (index < 0) {
            items.value.push(formattedItem);
          }
        });
      }
      const value = valArr.length > 0 ? JSON.stringify(valArr) : '';
      emit('change', value);
    };

    // 打开数据选择视图
    const openPickUpView = async (event: MouseEvent) => {
      event.stopPropagation();
      event.preventDefault();
      if (props.disabled || props.readonly) {
        return;
      }
      let selectedData;
      if (selectItems.value.length) {
        selectedData = JSON.stringify(selectItems.value);
      }
      const res = await c.openPickUpView(props.data!, selectedData);
      if (res) {
        handleOpenViewClose(res);
      }
    };

    // 下拉选中回调
    const onSelect = (selects: string[]) => {
      const valArr: Array<IData> = [];
      if (selects.length > 0) {
        selects.forEach((select: string) => {
          const findItem = items.value.find(item =>
            Object.is(item.srfkey, select),
          );
          if (findItem) {
            valArr.push(formatter(findItem));
          }
        });
        const value = valArr.length > 0 ? JSON.stringify(valArr) : '';
        selectItems.value = valArr;
        emit('change', value);
      } else {
        emit('change', '');
      }
    };

    // 搜索
    const onSearch = async (query: string = '') => {
      if (c.model.appDataEntityId) {
        const trimQuery = query.trim();
        const res = await c.getServiceData(trimQuery, props.data!);
        if (res) {
          items.value = res.data.map(item => formatter(item));
        }
      }
    };

    // 移除标签回调
    const onRemove = (tag: string) => {
      if (props.readonly || props.disabled) {
        return;
      }
      const index = selectItems.value.findIndex((item: IData) =>
        Object.is(item[c.keyName], tag),
      );
      if (index >= 0) {
        selectItems.value.splice(index, 1);
        const val: Array<IData> = [];
        let value: string | Array<IData> | null = null;
        selectItems.value.forEach((select: IData) => {
          if (c.model.valueType === 'OBJECTS') {
            val.push(c.handleObjectParams(select));
          } else if (c.objectIdField) {
            val.push(select[c.keyName]);
          } else {
            val.push({
              [c.keyName]: select[c.keyName],
              [c.textName]: select[c.textName],
            });
          }
        });
        if (val.length > 0) {
          if (c.model.valueType === 'OBJECTS') {
            value = val;
          } else {
            value = c.objectIdField
              ? val.join(c.model.valueSeparator)
              : JSON.stringify(val);
          }
        }
        emit('change', value);
      }
    };

    // 信息展示，只显示名称。
    const valueText = computed(() => {
      return selectItems.value
        .map(item => {
          return item.srfmajortext;
        })
        .join(',');
    });

    // 聚焦
    const onFocus = () => {
      emit('focus');
    };

    // 失焦
    const onBlur = () => {
      emit('blur');
    };

    const openPicker = async () => {
      if (props.disabled || props.readonly) {
        return;
      }
      showPicker.value = true;
      onSearch();
    };

    return {
      ns,
      c,
      curValue,
      items,
      valueText,
      selectItems,
      showPicker,
      onSearch,
      onRemove,
      onSelect,
      openPickUpView,
      openPicker,
      onFocus,
      onBlur,
    };
  },
  render() {
    return (
      <div
        class={[
          this.ns.b(),
          this.disabled ? this.ns.m('disabled') : '',
          this.readonly ? this.ns.m('readonly') : '',
        ]}
        onClick={() => {
          this.openPicker();
        }}
        ref='editorRef'
      >
        {this.readonly && this.valueText}
        {!this.readonly && (
          <van-field
            ref='editorRef'
            v-model={this.valueText}
            clearable
            placeholder={this.c.placeHolder}
            disabled={this.disabled}
          >
            {{
              input: () => {
                return this.selectItems.map((item: IData) => {
                  return (
                    <div class={this.ns.b('select-item')}>
                      <div class={this.ns.be('select-item', 'text')}>
                        {item.srfmajortext}
                      </div>
                      <div class={this.ns.be('select-item', 'close')}>
                        <van-icon
                          name='cross'
                          onClick={(e: Event) => {
                            e.stopPropagation();
                            this.onRemove(item[this.c.keyName]);
                          }}
                        />
                      </div>
                    </div>
                  );
                });
              },
              'right-icon': () => {
                if (this.$slots.append) {
                  return this.$slots.append({});
                }
                if (this.readonly) {
                  return null;
                }
                return [
                  this.c.model.pickupAppViewId && (
                    <van-button
                      size='small'
                      onClick={(event: MouseEvent) =>
                        this.openPickUpView(event)
                      }
                    >
                      <ion-icon
                        name='search'
                        class={this.ns.e('pickup-search-icon')}
                      ></ion-icon>
                    </van-button>
                  ),
                  this.c.model.appDEDataSetId && (
                    <IBizCommonRightIcon></IBizCommonRightIcon>
                  ),
                ];
              },
            }}
          </van-field>
        )}
        <IBizDataMPicker
          items={this.items}
          onChange={this.onSelect}
          v-model:showPicker={this.showPicker}
          value={this.curValue}
        ></IBizDataMPicker>
      </div>
    );
  },
});
