import { describe, expect, it, vi } from 'vitest';
import {
  eventPath,
  isEventInside,
  listenJSEvent,
} from '../../../src/utils/event/event';

describe('event', () => {
  it('eventPath', () => {
    // 初始化元素dom
    const app = document.createElement('div');
    app.classList.add('event-app');
    app.innerHTML = `
      <div class='event-content' style='height: 300px;display: flex;'>
        <div class='event-left' style='flex: 1 1 0;'>
          <div class='event-left-content'></div>
        </div>
        <div class='event-right' style='flex: 1 1 0;'>
          <div class='event-right-content'></div>
        </div>
      </div>
    `;
    document.body.insertAdjacentElement('afterbegin', app);

    const left = document.querySelector('.event-left') as HTMLElement;
    const leftContent = document.querySelector(
      '.event-left-content',
    ) as HTMLElement;
    const right = document.querySelector('.event-right') as HTMLElement;
    const rightContent = document.querySelector(
      '.event-right-content',
    ) as HTMLElement;

    // 监听left元素点击
    const handleLeftClick = (e: MouseEvent) => {
      // 包含目标元素
      expect(eventPath(e).includes(left)).toBe(true);

      // 不包含外部元素
      expect(eventPath(e).includes(right)).toBe(false);
    };

    // 监听left-content元素点击
    const handleLeftContentClick = (e: MouseEvent) => {
      // 包含目标元素
      expect(eventPath(e).includes(left)).toBe(true);

      // 包含目标元素的子元素
      expect(eventPath(e).includes(leftContent)).toBe(true);

      // 不包含外部元素
      expect(eventPath(e).includes(right)).toBe(false);

      // 不包含外部元素
      expect(eventPath(e).includes(rightContent)).toBe(false);
    };

    // 触发left元素click事件
    left.addEventListener('click', handleLeftClick);
    left.click();
    left.removeEventListener('click', handleLeftClick);

    // 触发left-content元素click事件
    leftContent.addEventListener('click', handleLeftContentClick);
    leftContent.click();
    leftContent.removeEventListener('click', handleLeftContentClick);

    document.body.removeChild(app);
  });
  it('listenJSEvent', () => {
    // 初始化元素dom
    const app = document.createElement('div');
    app.classList.add('event-app');
    app.innerHTML = `
      <div class='event-content' style='height: 300px;display: flex;'></div>
    `;
    document.body.insertAdjacentElement('afterbegin', app);

    const content = document.querySelector('.event-content') as HTMLElement;
    const handleClick = vi.fn();
    const removeEventListener = listenJSEvent(content, 'click', handleClick);

    // 触发click事件
    content.click();
    expect(handleClick).toHaveBeenCalledTimes(1);

    // 移除事件监听器
    removeEventListener();
    content.click();
    expect(handleClick).toHaveBeenCalledTimes(1);

    document.body.removeChild(app);
  });
  it('isEventInside', () => {
    // 初始化元素dom
    const app = document.createElement('div');
    app.classList.add('event-app');
    app.innerHTML = `
      <div class='event-content' style='height: 300px;display: flex;'>
        <div class='event-left' style='flex: 1 1 0;'>
          <div class='event-left-content'></div>
        </div>
        <div class='event-right' style='flex: 1 1 0;'>
          <div class='event-right-content'></div>
        </div>
      </div>
    `;
    document.body.insertAdjacentElement('afterbegin', app);

    const left = document.querySelector('.event-left') as HTMLElement;
    const leftContent = document.querySelector(
      '.event-left-content',
    ) as HTMLElement;
    const right = document.querySelector('.event-right') as HTMLElement;
    const rightContent = document.querySelector(
      '.event-right-content',
    ) as HTMLElement;

    // 监听left元素点击
    const handleLeftClick = (e: MouseEvent) => {
      // 包含目标元素
      expect(isEventInside(e, left)).toBe(true);

      // 不包含外部元素
      expect(isEventInside(e, right)).toBe(false);
    };
    const handleLeftContentClick = (e: MouseEvent) => {
      // 包含目标元素
      expect(isEventInside(e, left)).toBe(true);

      // 包含目标元素的子元素
      expect(isEventInside(e, leftContent)).toBe(true);

      // 不包含外部元素
      expect(isEventInside(e, right)).toBe(false);

      // 不包含外部元素
      expect(isEventInside(e, rightContent)).toBe(false);
    };

    // 触发left元素click事件
    left.addEventListener('click', handleLeftClick);
    left.click();
    left.removeEventListener('click', handleLeftClick);

    // 触发left-content元素click事件
    leftContent.addEventListener('click', handleLeftContentClick);
    leftContent.click();
    leftContent.removeEventListener('click', handleLeftContentClick);

    document.body.removeChild(app);
  });
});
