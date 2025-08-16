import { XDate } from '@/models/param/date';
import { useStore } from '@/store';

export default (): any => {
  const store = useStore();

  // 获取甘特头首行及第二行高度
  const getHeaderRelateHeight = () => {
    if (store.ganttHeaderRef.value) {
      const thead = store.ganttHeaderRef.value.querySelector('thead');
      const allRows = thead?.getElementsByTagName('tr');
      if (allRows && allRows.length >= 2) {
        const firstRowRect = allRows[0].getBoundingClientRect(); // 第一个 tr
        const secondRowRect = allRows[1].getBoundingClientRect(); // 第二个 tr
        return {
          firstRowHeight: firstRowRect.height,
          secondRowHeight: secondRowRect.height,
        };
      }
    }
  };

  // 获取甘特内容区高度及宽度
  const getGanttBodyRect = () => {
    if (store.ganttBodyRef.value) {
      return store.ganttBodyRef.value.getBoundingClientRect();
    }
  };

  // 更新甘特拖动背景数据
  const updateDragBackdrop = (_args: {
    sliderLeft: number;
    sliderWidth: number;
    isDrag: boolean;
    startDate: XDate;
    endDate: XDate;
  }) => {
    const { sliderLeft, sliderWidth, isDrag, startDate, endDate } = _args;
    const _data: any = {
      isSliderDrag: isDrag,
    };
    if (!isDrag) {
      store.dragBackdrop.updateData(_data);
      return;
    }

    const ganttBodyRect = getGanttBodyRect();
    const headerRelateHeight = getHeaderRelateHeight();
    // 计算距离顶部的定位
    Object.assign(_data, {
      left: sliderLeft,
      width: sliderWidth,
    });
    if (ganttBodyRect) {
      Object.assign(_data, {
        height: ganttBodyRect.height,
      });
    }
    if (headerRelateHeight) {
      const { firstRowHeight, secondRowHeight } = headerRelateHeight;
      if (firstRowHeight)
        Object.assign(_data, {
          top: firstRowHeight,
        });
      if (secondRowHeight) {
        Object.assign(_data, {
          dateRangeHeight: secondRowHeight,
          height: _data.height + secondRowHeight,
        });
      }
    }
    const dateFormat = store.ganttHeader.unit === 'hour' ? 'HH' : 'MM-DD';
    if (startDate)
      Object.assign(_data, {
        startDate: startDate.toString(dateFormat),
      });
    if (endDate)
      Object.assign(_data, {
        endDate: endDate.toString(dateFormat),
      });
    store.dragBackdrop.updateData(_data);
  };
  return {
    dragBackdrop: store.dragBackdrop,
    updateDragBackdrop,
  };
};
