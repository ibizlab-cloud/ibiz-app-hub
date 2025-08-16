import {
  h,
  ref,
  Ref,
  watch,
  computed,
  onMounted,
  defineComponent,
  resolveComponent,
} from 'vue';
import {
  useNamespace,
  getEditorEmits,
  getDataPickerProps,
} from '@ibiz-template/vue3-util';
import { clone } from 'lodash-es';
import { showTitle } from '@ibiz-template/core';
import { PickerEditorController } from '../picker-editor.controller';
import './ibiz-mpicker.scss';

/**
 * 地址框选择
 *
 * @description 使用el-select组件封装，用于选择多项数据，支持 AC 实时搜索，输入关键词即可从服务器获取数据；通过模态窗口呈现自定义样式的选择界面，解决下拉选择展示、检索及样式的局限。支持编辑器类型包含：`地址框（选择）`、`地址框（支持选择、AC）`
 * @primary
 * @editorparams {"name":"overflowmode","parameterType":"'auto' | 'ellipsis'","defaultvalue":"'auto'","description":"用于控制该编辑器下拉区域的宽度显示方式。当参数值为 'auto' 时，下拉区域宽度会根据内容自动展开；当参数值为 'ellipsis' 时，下拉区域宽度将与输入框保持一致，若内容超出宽度则会显示省略号，鼠标悬浮在内容上时会出现 tooltip 提示信息"}
 * @editorparams {"name":"valuetype","parameterType":"string","description":"编辑器的值类型"}
 * @editorparams {"name":"objectidfield","parameterType":"string","description":"值类型为OBJECTS时的对象标识属性"}
 * @editorparams {"name":"objectnamefield","parameterType":"string","description":"值类型为OBJECTS时的对象名称属性。也用于控制是否触发下拉区域数据的默认加载，配置时会触发默认加载，不配置时不会触发默认加载"}
 * @editorparams {"name":"objectvaluefield","parameterType":"string","description":"值类型为OBJECTS时的对象值属性"}
 * @editorparams {"name":"readonly","parameterType":"boolean","defaultvalue":false,"description":"设置编辑器是否为只读态"}
 * @ignoreprops overflowMode
 */
export const IBizMPicker = defineComponent({
  name: 'IBizMPicker',
  props: getDataPickerProps<PickerEditorController>(),
  emits: getEditorEmits(),
  setup(props, { emit }) {
    const ns = useNamespace('mpicker');

    const c = props.controller!;

    // 当前表单项绑定值key的集合
    const curValue: Ref<Array<string>> = ref([]);

    // 实体数据集
    const items: Ref<IData[]> = ref([]);

    // 选中项key-value键值对
    const selectItems: Ref<IData[]> = ref([]);

    // 下拉是否打开
    const open = ref(false);

    // 加载中
    const loading: Ref<boolean> = ref(false);

    // 是否编辑态
    const isEditable = ref(false);

    // 编辑器Ref
    const editorRef = ref();

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

    const resetCurValue = () => {
      curValue.value = [];
      selectItems.value = [];
      if (props.value) {
        if (c.model.valueType === 'OBJECTS') {
          (props.value as Array<IData>).forEach((item: IData) => {
            const _item = clone(item);
            Object.assign(_item, {
              [c.keyName]: item[c.objectIdField as string],
              [c.textName]: item[c.objectNameField as string],
            });
            if (c.objectValueField) {
              Object.assign(_item, {
                ...item[c.objectValueField],
              });
              delete _item[c.objectValueField];
            }
            if (_item[c.keyName]) {
              selectItems.value.push(_item);
            }
          });
        } else if (c.objectIdField && c.model.valueSeparator) {
          const values = (props.value as string).split(c.model.valueSeparator);
          values.forEach((value: string) => {
            selectItems.value.push({
              [c.keyName]: value,
            });
          });
        } else {
          try {
            selectItems.value = JSON.parse(props.value as string);
          } catch (error) {
            ibiz.log.error(
              `SIMPLE类型地址栏值格式${props.value}不符合JSON字符串要求`,
            );
          }
        }
        selectItems.value.forEach((item: IData) => {
          curValue.value.push(item[c.keyName]);
          // 选项没有的时候补充选项
          const index = items.value.findIndex(i =>
            Object.is(i[c.keyName], item[c.keyName]),
          );
          if (index < 0) {
            items.value.push({
              [c.keyName]: item[c.keyName],
              [c.textName]: item[c.textName],
            });
          }
        });
      }
    };

    // 监听传入值
    watch(
      () => props.value,
      () => {
        resetCurValue();
      },
      { immediate: true, deep: true },
    );

    // 自动聚焦
    watch(editorRef, newVal => {
      if (props.autoFocus && newVal && newVal.focus) {
        newVal.focus();
      }
    });

    const setEditable = (flag: boolean) => {
      if (flag) {
        isEditable.value = flag;
      } else {
        setTimeout(() => {
          isEditable.value = flag;
        }, 100);
      }
    };

    // 处理视图关闭，往外抛值
    const handleOpenViewClose = (result: IData[]) => {
      // 抛出值集合
      const selects: IData[] = [];
      if (result && Array.isArray(result)) {
        result.forEach((select: IData) => {
          Object.assign(select, {
            [c.keyName]: select[c.keyName] ? select[c.keyName] : select.srfkey,
            [c.textName]: select[c.textName]
              ? select[c.textName]
              : select.srfmajortext,
          });
          if (c.model.valueType === 'OBJECTS') {
            selects.push(c.handleObjectParams(select));
          } else if (c.objectIdField) {
            selects.push(select[c.keyName]);
          } else {
            selects.push({
              [c.keyName]: select[c.keyName],
              [c.textName]: select[c.textName],
            });
          }
          const index = items.value.findIndex(item =>
            Object.is(item[c.keyName], select[c.keyName]),
          );
          if (index < 0) {
            items.value.push(select);
          }
        });
      }
      let value: string | Array<IData> | null = null;
      if (selects.length > 0) {
        if (c.model.valueType === 'OBJECTS') {
          value = selects;
        } else {
          value = c.objectIdField
            ? selects.join(c.model.valueSeparator)
            : JSON.stringify(selects);
        }
      }
      emit('change', value);
      setEditable(false);
    };

    // 打开数据选择视图
    const openPickUpView = async () => {
      let selectedData;
      if (selectItems.value.length) {
        const _selectItems = JSON.parse(JSON.stringify(selectItems.value));
        _selectItems.forEach((item: IData, index: number) => {
          _selectItems[index].srfkey = item[c.keyName];
          _selectItems[index].srfmajortext = item[c.textName];
        });
        selectedData = JSON.stringify(_selectItems);
      }
      const res = await c.openPickUpView(props.data!, selectedData);
      if (res) {
        handleOpenViewClose(res);
      }
    };

    // 下拉选中回调
    const onSelect = (selects: string[]) => {
      setEditable(false);
      if (selects.includes('empty')) {
        resetCurValue();
        return;
      }
      const val: Array<IData> = [];
      let value: string | Array<IData> | null = null;
      selects.forEach((select: string) => {
        let index = items.value.findIndex(item =>
          Object.is(item[c.keyName], select),
        );
        let item: IData = {};
        if (index >= 0) {
          item = items.value[index];
        } else {
          index = selectItems.value.findIndex((selectItem: IData) =>
            Object.is(selectItem[c.keyName], select),
          );
          if (index >= 0) {
            item = selectItems.value[index];
          }
        }
        if (c.model.valueType === 'OBJECTS') {
          val.push(c.handleObjectParams(item));
        } else if (c.objectIdField) {
          val.push(item[c.keyName]);
        } else {
          val.push({
            [c.keyName]: item[c.keyName],
            [c.textName]: item[c.textName],
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
    };

    // 移除标签回调
    const onRemove = (tag: string) => {
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

    // 搜索
    const onSearch = async (query: string) => {
      if (c.model.appDataEntityId) {
        loading.value = true;
        try {
          const trimQuery = query.trim();
          const res = await c.getServiceData(trimQuery, props.data!);
          loading.value = false;
          if (res) {
            items.value = res.data as IData[];
          }
        } catch (error) {
          loading.value = false;
        }
      }
    };

    // 下拉打开
    const onOpenChange = (flag: boolean) => {
      open.value = flag;
      if (open.value) {
        items.value = [];
        onSearch('');
      }
    };

    // 信息展示，只显示名称。
    const valueText = computed(() => {
      return selectItems.value
        .map(item => {
          return item[c.textName];
        })
        .join(',');
    });

    watch(
      valueText,
      (newVal, oldVal) => {
        if (newVal !== oldVal) {
          emit('infoTextChange', newVal);
        }
      },
      { immediate: true },
    );

    // 聚焦
    const onFocus = (e: IData) => {
      emit('focus', e);
      setEditable(true);
    };

    // 失焦
    const onBlur = (e: IData) => {
      emit('blur', e);
      setEditable(false);
    };

    // 处理点击键盘
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e && e.code === 'Enter') {
        emit('enter', e);
      }
    };

    onMounted(() => {
      if (c.objectNameField) {
        onSearch('');
      }
    });

    const renderEmpty = () => {
      if (items.value.length) {
        return;
      }
      return (
        <el-option value={'empty'}>
          <iBizNoData
            class={ns.e('empty')}
            onClick={(event: MouseEvent) => event.stopPropagation()}
          ></iBizNoData>
        </el-option>
      );
    };

    return {
      ns,
      c,
      curValue,
      loading,
      items,
      valueText,
      onSearch,
      onOpenChange,
      onSelect,
      onRemove,
      openPickUpView,
      onFocus,
      onBlur,
      handleKeyUp,
      selectItems,
      editorRef,
      isEditable,
      setEditable,
      showFormDefaultContent,
      renderEmpty,
    };
  },
  render() {
    const overflowMode =
      this.c.editorParams.overflowMode ||
      this.c.editorParams.overflowmode ||
      ibiz.config.pickerEditor.overflowMode;
    const isEllipsis = overflowMode === 'ellipsis';

    // 编辑态内容
    const editContent = [
      !this.readonly && (
        <el-select
          ref='editorRef'
          class={[this.ns.b('select')]}
          v-model={this.curValue}
          filterable
          remote
          multiple
          popper-class={[
            this.ns.e('transfer'),
            this.ns.is('empty', !this.items.length),
          ]}
          teleported={!this.showFormDefaultContent}
          loading={this.loading}
          placeholder={this.c.placeHolder ? this.c.placeHolder : ' '}
          remote-method={this.onSearch}
          onVisibleChange={this.onOpenChange}
          onChange={this.onSelect}
          onRemoveTag={this.onRemove}
          disabled={this.disabled}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onKeyup={this.handleKeyUp}
          fit-input-width={isEllipsis}
          remote-show-suffix={this.c.model.showTrigger}
          {...this.$attrs}
        >
          {this.items.map(item => {
            return (
              <el-option
                title={showTitle(isEllipsis ? item[this.c.textName] : '')}
                key={item[this.c.keyName]}
                value={item[this.c.keyName]}
                label={item[this.c.textName]}
              >
                {{
                  default: () => {
                    if (this.c.acItemProvider) {
                      const component = resolveComponent(
                        this.c.acItemProvider.component,
                      );
                      return h(component, {
                        item,
                        controller: this.c,
                      });
                    }
                    const panel = this.c.deACMode?.itemLayoutPanel;
                    if (panel) {
                      return (
                        <iBizControlShell
                          data={item}
                          modelData={panel}
                          context={this.c.context}
                          params={this.c.params}
                        ></iBizControlShell>
                      );
                    }
                    return (
                      <span>
                        {item[this.c.textName] != null
                          ? item[this.c.textName]
                          : ''}
                      </span>
                    );
                  },
                }}
              </el-option>
            );
          })}
          {this.renderEmpty()}
        </el-select>
      ),
      !this.readonly && (
        <div class={this.ns.e('buns-position')}>
          {this.c.model.pickupAppViewId ? (
            <div class={this.ns.e('btns')} onClick={this.openPickUpView}>
              <ion-icon name='search'></ion-icon>
            </div>
          ) : null}
        </div>
      ),
    ];

    // 只读态内容
    const readonlyContent = (
      <div class={(this.ns.b(), this.ns.m('readonly'))}>{this.valueText}</div>
    );

    // 表单默认内容
    const formDefaultContent = (
      <div class={this.ns.b('form-default-content')}>
        {this.curValue.length > 0 ? (
          this.selectItems.map(item => {
            return (
              <span class={this.ns.b('content-item')}>
                {item[this.c.textName]}
              </span>
            );
          })
        ) : (
          <iBizEditorEmptyText
            showPlaceholder={this.c.emptyShowPlaceholder}
            placeHolder={this.c.placeHolder}
          />
        )}
      </div>
    );

    return (
      <div
        class={[
          this.ns.b(),
          this.disabled ? this.ns.m('disabled') : '',
          this.readonly ? this.ns.m('readonly') : '',
          this.ns.is('editable', this.isEditable),
          this.ns.is('show-default', this.showFormDefaultContent),
        ]}
      >
        {this.showFormDefaultContent && formDefaultContent}
        {this.readonly ? readonlyContent : editContent}
      </div>
    );
  },
});
