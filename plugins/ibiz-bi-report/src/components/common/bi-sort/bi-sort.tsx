import { PropType, defineComponent } from 'vue';
import { useNamespace } from '../../../use';
import './bi-sort.scss';
import { IModal } from '@ibiz-template/runtime';

export const BISort = defineComponent({
  name: 'BISort',
  props: {
    value: {
      type: Object as PropType<IData>,
      default: () => {},
    },
    measures: {
      type: Array<IData>,
      default: [],
    },
    dimension: {
      type: Object as PropType<IData>,
      default: () => {},
      required: true,
    },
    modal: { type: Object as PropType<IModal>, required: true },
  },
  emit: ['change'],
  setup(props, { emit }) {
    const ns = useNamespace('bi-sort');

    // 是升序
    const isAsc = (item: IData) => {
      return props.value[`sort@${item.id}`] === 'asc';
    };

    // 是降序
    const isDesc = (item: IData) => {
      return props.value[`sort@${item.id}`] === 'desc';
    };

    // 不排序
    const isNoSort = (item: IData) => {
      return !props.value[`sort@${item.id}`];
    };

    // 排序变动
    const onSortChange = (item: IData) => {
      let tag = null;
      if (props.value[`sort@${item.id}`] === 'asc') {
        tag = 'desc';
      }
      if (props.value[`sort@${item.id}`] === 'desc') {
        tag = null;
      }
      if (!props.value[`sort@${item.id}`]) {
        tag = 'asc';
      }
      emit('change', item.id, tag);
    };

    // 绘制排序项
    const renderSortItem = (item: IData) => {
      return (
        <div class={ns.e('item')} onClick={() => onSortChange(item)}>
          <div class={ns.em('item', 'label')}>{item.name}</div>
          <div
            class={[
              ns.em('item', 'icon'),
              ns.is('no-sort', isNoSort(item)),
              ns.is('asc', isAsc(item)),
              ns.is('desc', isDesc(item)),
            ]}
          >
            <svg
              viewBox='0 0 16 16'
              xmlns='http://www.w3.org/2000/svg'
              height='1em'
              width='1em'
              focusable='false'
              fill='currentColor'
            >
              <g
                id='avt1.Base基础/1.icon图标/5.navigation/sort-positive-sequence'
                stroke-width='1'
                fill-rule='nonzero'
              >
                <path
                  d='M7.173 2.605l-2.625 3A.6.6 0 0 0 5 6.6h5.25a.6.6 0 0 0 .452-.995l-2.625-3a.6.6 0 0 0-.904 0z'
                  id='avt路径'
                ></path>
                <path
                  d='M10.25 9.108H5a.6.6 0 0 0-.452.995l2.625 3a.6.6 0 0 0 .904 0l2.625-3a.6.6 0 0 0-.452-.995z'
                  id='avtsecondary-color'
                ></path>
              </g>
            </svg>
          </div>
        </div>
      );
    };

    // 绘制纬度
    const renderDimension = () => {
      const data: IData = {
        name: props.dimension.pssysbicubedimensionname,
        id: props.dimension.codename,
      };
      return renderSortItem(data);
    };

    // 绘制指标
    const renderMeasure = () => {
      return props.measures.map((measure: IData) => {
        const data: IData = {
          name: measure.pssysbicubemeasurename,
          id: measure.codename,
        };
        return renderSortItem(data);
      });
    };

    // 离开关闭模态
    const onMouseLevel = () => {
      props.modal.dismiss();
    };

    return { ns, renderDimension, renderMeasure, onMouseLevel };
  },
  render() {
    return (
      <div class={this.ns.b()} onMouseleave={this.onMouseLevel}>
        {this.renderDimension()}
        {this.renderMeasure()}
      </div>
    );
  },
});
