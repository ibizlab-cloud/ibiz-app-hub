/**
 * 拖动画布数据接口，用于存储拖动画布的位置、尺寸和日期范围等信息
 */
interface IDragBackdropData {
  dateRangeHeight: number; // 日期范围显示区域的高度
  top: number; // 拖动画布上边缘距离父容器的距离
  left: number; // 拖动画布左边缘距离父容器的距离
  width: number; // 拖动画布的宽度
  widht: number; // 拼写错误，应与width统一
  height: number; // 拖动画布的高度
  startDate: string; // 开始日期字符串
  endDate: string; // 结束日期字符串
  isSliderDrag: boolean; // 是否正在进行滑块拖拽操作
}

/**
 * 遮罩层样式接口，定义遮罩层的CSS样式属性
 */
interface IMaskStyle {
  top: string; // 顶部位置，带单位的字符串
  left: string; // 左侧位置，带单位的字符串
  width: string; // 宽度，带单位的字符串
  height: string; // 高度，带单位的字符串
  display: string; // 显示状态，控制遮罩层是否可见
}

/**
 * 日期范围样式接口，定义日期范围显示区域的CSS样式属性
 */
interface IRangeStyle {
  top: string; // 顶部位置，带单位的字符串
  height: string; // 高度，带单位的字符串
}

/**
 * 拖动画布类，用于管理拖动画布的数据和样式
 */
export default class DragBackdrop {
  /**
   * 拖动画布的私有数据对象，存储所有相关属性
   */
  private _data = {
    dateRangeHeight: 0,
    top: 0,
    left: 0,
    width: 0,
    widht: 0, // 拼写错误，应与width统一
    height: 0,
    startDate: '',
    endDate: '',
    isSliderDrag: false,
  };

  /**
   * 获取拖动画布的原始数据
   * @returns 拖动画布数据对象
   */
  get data(): IDragBackdropData {
    return this._data;
  }

  /**
   * 获取拖动画布遮罩层的样式对象
   * @returns 遮罩层样式对象，包含top、left、width、height和display属性
   */
  get style(): IMaskStyle {
    return {
      top: `${this._data.top}px`,
      left: `${this._data.left}px`,
      width: `${this._data.width}px`,
      height: `${this._data.height}px`,
      display: this._data.isSliderDrag ? 'block' : 'none',
    };
  }

  /**
   * 获取日期范围显示区域的样式对象
   * @returns 日期范围样式对象，包含top和height属性
   */
  get rangeStyle(): IRangeStyle {
    return {
      top: `0px`,
      height: `${this._data.dateRangeHeight}px`,
    };
  }

  /**
   * 更新拖动画布的数据
   * @param data - 可选的更新数据对象，将被合并到现有数据中
   */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  updateData(data?: any): void {
    if (data) Object.assign(this._data, data);
  }
}
