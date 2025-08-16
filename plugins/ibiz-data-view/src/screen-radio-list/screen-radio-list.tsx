import {
  computed,
  defineComponent,
  onBeforeMount,
  onMounted,
  ref,
  watch,
} from 'vue';
import {
  getEditorEmits,
  getRadioProps,
  useFocusAndBlur,
  useNamespace,
  useCodeListListen,
  useAutoFocusBlur,
} from '@ibiz-template/vue3-util';
import './screen-radio-list.scss';
import { notNilEmpty } from 'qx-util';
import { CodeListItem } from '@ibiz-template/runtime';
import { ScreenRadioListEditorController } from './screen-radio-list.controller';

export const ScreenRadioList = defineComponent({
  name: 'ScreenRadioList',
  // @ts-ignore
  props: getRadioProps<ScreenRadioListEditorController>(),
  emits: getEditorEmits(),
  setup(props, { emit }) {
    const ns = useNamespace('screen-radio-list');

    const c = props.controller;

    const editorModel = c.model;

    let timer: NodeJS.Timeout | null = null;

    // 绘制模式
    let renderMode = 'radio';
    // 按钮圆角显示
    let isBtnRoundCorner = false;
    if (editorModel.editorParams) {
      if (editorModel.editorParams.renderMode) {
        renderMode = editorModel.editorParams.renderMode;
      }
      if (editorModel.editorParams.isBtnRoundCorner) {
        isBtnRoundCorner = c.toBoolean(
          editorModel.editorParams.isBtnRoundCorner,
        );
      }
    }

    const { useInFocusAndBlur, useInValueChange } = useAutoFocusBlur(
      props,
      emit,
    );

    const onSelectValueChange = (value: string | number) => {
      emit('change', value);
      useInValueChange();
    };

    // 代码表
    const items = ref<readonly IData[]>([]);

    const loopselect = () => {
      const index = items.value.findIndex((item: IData) => {
        return item.value === props.value;
      });
      if (items.value && items.value.length > 0) {
        if (index < items.value.length - 1) {
          emit('change', items.value[index + 1].value);
        } else {
          emit('change', items.value[0].value);
        }
      }
    };

    onMounted(() => {
      if (c.enablecirculate) {
        timer = setInterval(() => {
          loopselect();
        }, c.intervaltime);
      }
    });

    onBeforeMount(() => {
      if (timer) {
        clearInterval(timer);
      }
    });

    watch(
      () => props.data,
      newVal => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        c.loadCodeList(newVal).then((_codeList: any) => {
          items.value = _codeList;
        });
      },
      {
        immediate: true,
        deep: true,
      },
    );

    const fn = (data: CodeListItem[] | undefined) => {
      if (data) {
        items.value = data;
      }
    };

    useCodeListListen(c.model.appCodeListId, c.context.srfappid, fn);

    const valueText = computed(() => {
      // eslint-disable-next-line eqeqeq
      return items.value.find(item => item.value == props.value)?.text || '';
    });

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
      valueText,
      (newVal, oldVal) => {
        if (newVal !== oldVal) {
          emit('infoTextChange', newVal);
        }
      },
      { immediate: true },
    );

    // 聚焦失焦事件
    const { componentRef: editorRef } = useFocusAndBlur(
      () => emit('focus'),
      () => useInFocusAndBlur(),
    );

    return {
      timer,
      ns,
      editorModel,
      items,
      valueText,
      onSelectValueChange,
      editorRef,
      renderMode,
      isBtnRoundCorner,
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
          this.ns.is('grid-layout', !!this.controller.rowNumber),
        ]}
        style={
          this.controller.rowNumber
            ? `--ibiz-radio-group-row-number:${this.controller.rowNumber}`
            : ''
        }
        ref='editorRef'
      >
        {this.readonly ? (
          this.valueText
        ) : (
          <el-radio-group
            class={this.ns.e('group')}
            model-value={notNilEmpty(this.value) ? String(this.value) : ''}
            onChange={this.onSelectValueChange}
            {...this.$attrs}
          >
            {this.items.map((_item, index: number) =>
              this.renderMode === 'radio' ? (
                <el-radio
                  key={index}
                  label={notNilEmpty(_item.value) ? String(_item.value) : ''}
                  disabled={this.disabled || _item.disableSelect === true}
                >
                  <span class={this.ns.e('text')}>{_item.text}</span>
                </el-radio>
              ) : (
                <el-radio-button
                  key={index}
                  class={[
                    this.ns.e('button'),
                    this.isBtnRoundCorner
                      ? this.ns.em('button', 'round-corner')
                      : '',
                  ]}
                  label={notNilEmpty(_item.value) ? String(_item.value) : ''}
                  disabled={this.disabled || _item.disableSelect === true}
                >
                  <span class={this.ns.em('button', 'text')}>{_item.text}</span>
                </el-radio-button>
              ),
            )}
          </el-radio-group>
        )}
      </div>
    );
  },
});
