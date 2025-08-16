/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  ComponentInternalInstance,
  getCurrentInstance,
  nextTick,
  onActivated,
  onDeactivated,
  onMounted,
  onUnmounted,
  ref,
  Ref,
} from 'vue';

const observers: Map<HTMLElement, MutationObserver> = new Map();

const hexReg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
const rgbReg = /^(rgb|rgba|RGB|RGBA)/;

type AnyFunction = () => void;

/**
 * @description 颜色验证器
 * @param {string} color Hex|Rgb|Rgba color 或 关键字
 * @return {string|boolean} 有效颜色或错误
 */
const validator = (color: string): string => {
  const isHex = hexReg.test(color);
  const isRgb = rgbReg.test(color);
  const tempColor = color;
  if (isHex || isRgb) return tempColor;
  if (!color) {
    console.error('Color: Invalid color!');
    return '';
  }

  return tempColor;
};

/**
 * @description 获取十六进制颜色的rgb值
 * @param { } color Hex color
 * @return {number[]} 颜色的Rgb值
 */
const getRgbValueFromHex = (color: string): number[] => {
  const tempColor = color.replace('#', '');
  const red = parseInt(tempColor.substring(0, 2), 16);
  const green = parseInt(tempColor.substring(2, 4), 16);
  const blue = parseInt(tempColor.substring(4, 6), 16);
  return [red, green, blue];
};

/**
 * @description 获取rgb/rgba颜色的rgb值
 * @param {string} color Hex color
 * @return {number[]} 颜色的Rgb值
 */

const getRgbValueFromRgb = (color: string): number[] => {
  return color
    .replace(/rgb\(|rgba\(|\)/g, '')
    .split(',')
    .slice(0, 3)
    .map(function (n: string) {
      return parseInt(n, 10);
    });
};

/**
 * @description 获取颜色的Rgb值
 * @param {string} color Hex|Rgb|Rgba 颜色或颜色关键字
 * @return {number[]|Boolean} 颜色的Rgb值（无效输入将返回false）
 */
const getRgbValue = (color: string) => {
  if (!color) {
    console.error('getRgbValue: Missing parameters!');
    return false;
  }

  const tempColor = validator(color);
  if (!tempColor) return false;
  const isHex = hexReg.test(tempColor);
  const isRgb = rgbReg.test(tempColor);
  const lowerColor = tempColor.toLowerCase();
  if (isHex) return getRgbValueFromHex(lowerColor);
  if (isRgb) return getRgbValueFromRgb(lowerColor);
};

/**
 * @description 从Rgb获取颜色| Rgb值
 * @param {number[]} value Rgb|Rgba 颜色值
 * @return {string|Boolean} Rgb|Rgba颜色（无效输入将返回false）
 */

const getColorFromRgbValue = (value: number[]) => {
  if (!value) {
    console.error('getColorFromRgbValue: Missing parameters!');
    return false;
  }

  const valueLength = value.length;

  if (valueLength !== 3 && valueLength !== 4) {
    console.error('getColorFromRgbValue: Value is illegal!');
    return false;
  }

  let color: string = valueLength === 3 ? 'rgb(' : 'rgba(';
  color += `${value.join(',')})`;
  return color;
};

/**
 * @description 调整颜色不透明度
 * @param {String} color   十六进制| Rgb | Rgb颜色或颜色关键字
 * @param {Number} Percent 不透明度
 * @return {String|Boolean} Rgba颜色（无效输入将返回false）
 */
const fade = (color: string, Percent: number) => {
  const percent = Percent || 100;
  if (!color) {
    console.error('fade: Missing parameters!');
    return false;
  }

  const rgbValue = getRgbValue(color);
  if (!rgbValue) return false;
  const rgbaValue = [...rgbValue, percent / 100];
  return getColorFromRgbValue(rgbaValue);
};

/**
 * @description 合并color
 * @param {string[]} defaultColors 默认颜色
 * @param {string[]} color 传递颜色
 * @return {string[]} 边框颜色
 */
const deepMerge = (defaultColors: string[], color: string[]) => {
  const tempDefaultColor: string[] = [];
  defaultColors.forEach((item: string, index: number) => {
    if (color[index]) {
      tempDefaultColor.push(color[index]);
    } else {
      tempDefaultColor.push(item);
    }
  });
  return tempDefaultColor;
};

/**
 * @description 挂载
 * @param {HTMLElement} dom dom节点
 */
const bindDomResizeCallback = (dom: HTMLElement, initWH: AnyFunction) => {
  if (dom && !observers.has(dom)) {
    const MutationObserver =
      window.MutationObserver ||
      (window as IParams).WebKitMutationObserver ||
      (window as IParams).MozMutationObserver;
    const observer = new MutationObserver(() => {
      initWH();
    });
    observer.observe(dom as Node, {
      attributes: true,
      childList: true,
      attributeFilter: ['style'],
      attributeOldValue: true,
      subtree: true,
      characterData: true,
    });
    observers.set(dom, observer);
  }
};

/**
 * @description 卸载
 * @param {HTMLElement} dom dom节点
 */
const unbindDomResizeCallback = (dom: HTMLElement) => {
  if (dom && observers.has(dom)) {
    const domObserver = observers.get(dom) as MutationObserver;
    domObserver.disconnect();
    domObserver.takeRecords();
    observers.delete(dom);
  }
};

/**
 * @description 获取主题色
 * @return {string} 颜色
 */
const getThemeVar = () => {
  const root = document.documentElement;
  if (!root) {
    return null;
  }
  const style = getComputedStyle(root);

  const primary = style.getPropertyValue('--ibiz-color-primary');
  return primary;
};

/**
 * @description 过滤不为number
 * @param {IData} array
 * @return {number[]}
 */
const filterNonNumber = (array: IData) => {
  return array.filter((n: string | number) => {
    return typeof n === 'number';
  });
};

/**
 * @description 累加
 * @param {IData} nums
 * @return {number}
 */
const mulAdd = (nums: IData) => {
  const tempNums = filterNonNumber(nums);
  return tempNums.reduce((all: number, num: number) => {
    return all + num;
  }, 0);
};

/**
 * @description 获取两点间的距离
 * @param {IData} pointOne
 * @param {IData} pointTwo
 * @return {number}
 */
const getTwoPointDistance = (pointOne: IData, pointTwo: IData) => {
  const minusX = Math.abs(pointOne[0] - pointTwo[0]);
  const minusY = Math.abs(pointOne[1] - pointTwo[1]);
  return Math.sqrt(minusX * minusX + minusY * minusY);
};

/**
 * @description 获取线长度
 * @param {IData} points
 * @return {number} 线长度
 */
const getPolylineLength = (points: IData) => {
  const lineSegments = new Array(points.length - 1)
    .fill(0)
    .map((foo: IParams, i: number) => {
      return [points[i], points[i + 1]];
    });
  const lengths = lineSegments.map(item => {
    return getTwoPointDistance(item[0], item[1]);
  });
  return mulAdd(lengths);
};

export {
  fade,
  deepMerge,
  bindDomResizeCallback,
  unbindDomResizeCallback,
  getThemeVar,
  getPolylineLength,
};

export function randomExtend(minNum: number, maxNum: number) {
  if (arguments.length === 1) {
    return parseInt(`${Math.random() * minNum + 1}`, 10);
  }
  return parseInt(`${Math.random() * (maxNum - minNum + 1) + minNum}`, 10);
}

export function debounce(
  delay: number,
  callback: Function,
  that: ComponentInternalInstance,
  args: IParams | null,
) {
  let lastTime: NodeJS.Timeout | null = null;

  return function () {
    clearTimeout(lastTime as NodeJS.Timeout);
    lastTime = setTimeout(() => {
      callback.apply(that, args);
    }, delay);
  };
}

export function observerDomResize(
  dom: HTMLElement,
  callback: MutationCallback,
) {
  const MutationObserver =
    window.MutationObserver ||
    (window as IParams).WebKitMutationObserver ||
    (window as IParams).MozMutationObserver;
  const observer = new MutationObserver(callback);

  observer.observe(dom, {
    attributes: true,
    childList: true,
    attributeFilter: ['style'],
    attributeOldValue: true,
    subtree: true,
    characterData: true,
  });

  return observer;
}

export function autoResize(
  dom: Ref<HTMLElement | null>,
  onResize?: () => void,
  afterAutoResizeMixinInit?: () => void,
) {
  const width = ref(0);
  const height = ref(0);

  let debounceInitWHFun: () => void;
  let domObserver: MutationObserver | null = null;
  let domHtml: HTMLElement | null = null;

  const initWH = (resize = true) => {
    return new Promise(resolve => {
      nextTick(() => {
        domHtml = dom.value;
        width.value = dom.value ? dom.value.clientWidth : 0;
        height.value = dom.value ? dom.value.clientHeight : 0;

        if (!dom.value)
          console.warn(
            'DataV: Failed to get dom node, component rendering may be abnormal!',
          );
        else if (!width.value || !height.value)
          console.warn(
            'DataV: Component width or height is 0px, rendering abnormality may occur!',
          );

        if (typeof onResize === 'function' && resize) onResize();
        resolve(true);
      });
    });
  };
  const getDebounceInitWHFun = () => {
    debounceInitWHFun = debounce(
      200,
      initWH,
      getCurrentInstance() as ComponentInternalInstance,
      null,
    );
  };
  const bindDomResizeCallback = () => {
    domObserver = observerDomResize(domHtml!, debounceInitWHFun);

    window.addEventListener(
      'resize',
      debounceInitWHFun as EventListenerOrEventListenerObject,
    );
  };
  const unbindDomResizeCallback = () => {
    if (!domObserver) return;

    domObserver.disconnect();
    domObserver.takeRecords();
    domObserver = null;
  };

  const autoResizeMixinInit = async () => {
    await initWH(false);

    getDebounceInitWHFun();

    bindDomResizeCallback();

    if (typeof afterAutoResizeMixinInit === 'function')
      afterAutoResizeMixinInit();
  };

  onMounted(() => {
    autoResizeMixinInit();
  });

  onUnmounted(() => {
    unbindDomResizeCallback();
  });

  onActivated(autoResizeMixinInit);

  onDeactivated(unbindDomResizeCallback);

  return {
    width,
    height,
    initWH,
  };
}

export function $RandomSplit(total: number, nums: number): number[] {
  let rest = total;
  const result = Array.from({ length: nums }, (n, i) => nums - i).map(n => {
    const v = 1 + Math.floor(Math.random() * ((rest / n) * 2 - 1));
    rest -= v;
    return v;
  });
  result[nums - 1] += rest;
  return result;
}

export function $NormalSort(arr: number[]): number[] {
  const temp: number[] = [];
  let i = 0;
  const l = arr.length;
  const leftTo = 0;
  const rightTo = 0;

  // Sort the array in descending order
  const sortArr = arr.sort((a, b) => b - a);

  while (sortArr.length > 1) {
    const a = sortArr.pop()!;
    const b = sortArr.pop()!;

    // Determine where to place the elements based on the current state of `leftTo` and `rightTo`
    if (leftTo < rightTo) {
      temp[i] = b;
      temp[l - (i + 1)] = a;
    } else {
      temp[i] = b;
      temp[l - (i + 1)] = a;
    }

    // eslint-disable-next-line no-plusplus
    i++;
  }

  // If there is an odd number of elements, add the last element to the end of the `temp` array
  if (sortArr.length === 1) {
    temp[i] = sortArr.pop()!;
  }

  return temp;
}

export function $Normal(mean: number, sigma: number): number {
  let u = 0.0;
  let v = 0.0;
  let w = 0.0;
  let c = 0.0;
  do {
    // Obtain two independent random variables in the range (-1, 1)
    u = Math.random() * 2 - 1.0;
    v = Math.random() * 2 - 1.0;
    w = u * u + v * v;
  } while (w === 0.0 || w >= 1.0);
  c = Math.sqrt((-2 * Math.log(w)) / w);
  return mean + u * c * sigma;
}

// 随机颜色
export function $RandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r},${g},${b})`;
}

export function getRandomColorFromArray(colors: string[]) {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}
