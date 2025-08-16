import { describe, it, expect, vi } from 'vitest';
import { Modal } from '../../../src';

describe('modal', () => {
  it('modal.hooks', async () => {
    const modal = new Modal({ dismiss: () => {} });
    // 是否执行shouldHook钩子
    let isShouldHook = false;
    // 是否执行beforeHook钩子
    let isBeforeHook = false;
    // shouldHook钩子
    const shouldHook = vi.fn(async _context => {
      isShouldHook = true;
    });
    // beforeHook钩子
    const beforeHook = vi.fn(async _data => {
      isBeforeHook = true;
    });
    // 注册hook钩子
    modal.hooks.shouldDismiss.tapPromise(shouldHook.getMockImplementation()!);
    modal.hooks.beforeDismiss.tapPromise(beforeHook.getMockImplementation()!);
    // 执行关闭操作，触发注册的hook钩子
    await modal.dismiss();
    expect(isShouldHook).toBe(true);
    expect(isBeforeHook).toBe(true);
  });
  it('modal.ignoreDismissCheck', async () => {
    const modal = new Modal({ dismiss: () => {} });
    // 忽略关闭检查（不执行shouldDismiss注册的钩子）
    modal.ignoreDismissCheck = true;
    // 是否执行shouldHook钩子
    let isShouldHook = false;
    // 是否执行beforeHook钩子
    let isBeforeHook = false;
    // shouldHook钩子
    const shouldHook = vi.fn(async _context => {
      isShouldHook = true;
    });
    // beforeHook钩子
    const beforeHook = vi.fn(async _data => {
      isBeforeHook = true;
    });
    // 注册hook钩子
    modal.hooks.shouldDismiss.tapPromise(shouldHook.getMockImplementation()!);
    modal.hooks.beforeDismiss.tapPromise(beforeHook.getMockImplementation()!);
    // 执行关闭操作，触发注册的hook钩子
    await modal.dismiss();
    expect(isShouldHook).toBe(false);
    expect(isBeforeHook).toBe(true);
  });
  it('modal.dismiss: context.allowClose值为true', async () => {
    // 是否执行dismiss钩子
    let isDismiss = false;
    // dismiss钩子
    const dismiss = vi.fn(() => {
      isDismiss = true;
    });
    const modal = new Modal({ dismiss: dismiss.getMockImplementation() });
    // shouldHook钩子
    const shouldHook = vi.fn(async _context => {});
    // 注册hook钩子
    modal.hooks.shouldDismiss.tapPromise(shouldHook.getMockImplementation()!);
    // 执行关闭操作，触发注册的hook钩子
    const result = await modal.dismiss();
    // 关闭成功
    expect(result).toBe(true);
    expect(isDismiss).toBe(true);
  });
  it('modal.dismiss: context.allowClose值为false', async () => {
    // 是否执行dismiss钩子
    let isDismiss = false;
    // dismiss钩子
    const dismiss = vi.fn(() => {
      isDismiss = true;
    });
    const modal = new Modal({ dismiss: dismiss.getMockImplementation() });
    // 是否执行shouldHook钩子
    let isShouldHook = false;
    // 是否执行beforeHook钩子
    let isBeforeHook = false;
    // shouldHook钩子
    const shouldHook = vi.fn(async context => {
      context.allowClose = false;
      isShouldHook = true;
    });
    // beforeHook钩子
    const beforeHook = vi.fn(async _data => {
      isBeforeHook = true;
    });
    // 注册hook钩子
    modal.hooks.shouldDismiss.tapPromise(shouldHook.getMockImplementation()!);
    modal.hooks.beforeDismiss.tapPromise(beforeHook.getMockImplementation()!);
    // 执行关闭操作，触发注册的hook钩子
    const result = await modal.dismiss();
    // 关闭中断
    expect(result).toBe(false);
    expect(isShouldHook).toBe(true);
    expect(isBeforeHook).toBe(false);
    expect(isDismiss).toBe(false);
  });
});
