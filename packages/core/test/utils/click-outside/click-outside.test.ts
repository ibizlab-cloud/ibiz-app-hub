import { describe, expect, it, vi } from 'vitest';
import { onClickOutside } from '../../../src/utils/click-outside/click-outside';

describe('click-outside', () => {
  it('onClickOutside', () => {
    // 初始化元素dom
    const app = document.createElement('div');
    app.classList.add('click-outside-app');
    app.innerHTML = `
      <div class='click-outside-content' style='height: 300px;display: flex;'>
        <div class='click-outside-left' style='flex: 1 1 0;'>
          <div class='click-outside-left-content'></div>
        </div>
        <div class='click-outside-right' style='flex: 1 1 0;'>
          <div class='click-outside-right-content'></div>
        </div>
        <div class='click-outside-toolbar' style='flex: 1 1 0;'></div>
      </div>
    `;
    document.body.insertAdjacentElement('afterbegin', app);

    const left = document.querySelector('.click-outside-left') as HTMLElement;
    const leftContent = document.querySelector(
      '.click-outside-left-content',
    ) as HTMLElement;
    const right = document.querySelector('.click-outside-right') as HTMLElement;
    const rightContent = document.querySelector(
      '.click-outside-right-content',
    ) as HTMLElement;
    const toolbar = document.querySelector(
      '.click-outside-toolbar',
    ) as HTMLElement;
    const handleClick = vi.fn();
    const handler = onClickOutside(left, handleClick, {
      ignore: [toolbar],
    });

    // 监听目标元素点击
    left.click();
    expect(handleClick).toHaveBeenCalledTimes(0);

    // 监听目标元素的子元素点击
    leftContent.click();
    expect(handleClick).toHaveBeenCalledTimes(0);

    // 监听外部元素点击
    right.click();
    expect(handleClick).toHaveBeenCalledTimes(1);

    // 监听目标元素的子元素点击
    leftContent.click();
    expect(handleClick).toHaveBeenCalledTimes(1);

    // 监听外部元素点击
    rightContent.click();
    expect(handleClick).toHaveBeenCalledTimes(2);

    // 监听目标元素点击
    left.click();
    expect(handleClick).toHaveBeenCalledTimes(2);

    // 暂停监听
    handler.pause();
    right.click();
    expect(handleClick).toHaveBeenCalledTimes(2);

    rightContent.click();
    expect(handleClick).toHaveBeenCalledTimes(2);

    // 继续监听
    handler.proceed();
    right.click();
    expect(handleClick).toHaveBeenCalledTimes(3);

    rightContent.click();
    expect(handleClick).toHaveBeenCalledTimes(4);

    // 触发指定忽略的元素
    toolbar.click();
    expect(handleClick).toHaveBeenCalledTimes(4);

    // 移除监听
    handler.stop();
    right.click();
    expect(handleClick).toHaveBeenCalledTimes(4);

    rightContent.click();
    expect(handleClick).toHaveBeenCalledTimes(4);

    document.body.removeChild(app);
  });
});
