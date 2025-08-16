import { describe, it, expect, vi } from 'vitest';
import { ErrorHandlerCenter } from '../../../src';

describe('error-handler-center', () => {
  it('errorHandlerCenter.handle', () => {
    const errorHandlerCenter = new ErrorHandlerCenter();
    // 处理器
    const successHandle = { handle: () => true };
    const failHandle = { handle: () => false };

    // mock 函数, 用于监听方法是否触发
    const success = vi.spyOn(successHandle, 'handle');
    const fail = vi.spyOn(failHandle, 'handle');

    // 注册处理器（后注册的优先级更高）
    errorHandlerCenter.register(failHandle);
    errorHandlerCenter.register(successHandle);

    // 按顺序执行处理器，处理器返回true后，不再执行后续的处理器
    errorHandlerCenter.handle(new Error());
    expect(success).toHaveBeenCalled();
    expect(fail).not.toHaveBeenCalled();
  });
});
