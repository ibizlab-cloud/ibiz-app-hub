import { describe, expect, it } from 'vitest';
import { HistoryList } from '../../../src/utils/history-list/history-list';

describe('history-list', () => {
  const historyList = new HistoryList({ a: 1 });
  it('historyList.assign', () => {
    // 修改对象（添加历史记录）
    historyList.assign({ b: 2 });
    expect(historyList.data).toEqual({ a: 1, b: 2 });
    historyList.assign({ c: 3 });
    expect(historyList.data).toEqual({ a: 1, b: 2, c: 3 });
  });
  it('historyList.prev', () => {
    // 返回上一个历史记录
    historyList.prev();
    expect(historyList.data).toEqual({ a: 1, b: 2 });
    historyList.prev();
    expect(historyList.data).toEqual({ a: 1 });

    // 到达第一个历史记录后，不能再后退
    historyList.prev();
    expect(historyList.data).toEqual({ a: 1 });
  });
  it('historyList.next', () => {
    // 前进一个历史记录
    historyList.next();
    expect(historyList.data).toEqual({ a: 1, b: 2 });
    historyList.next();
    expect(historyList.data).toEqual({ a: 1, b: 2, c: 3 });

    // 到达最后一个历史记录后，不能再前进
    historyList.next();
    expect(historyList.data).toEqual({ a: 1, b: 2, c: 3 });

    // 修改对象（中间添加历史记录），修改历史记录列表
    historyList.prev();
    expect(historyList.data).toEqual({ a: 1, b: 2 });
    historyList.prev();
    expect(historyList.data).toEqual({ a: 1 });
    historyList.assign({ c: 3 });
    expect(historyList.data).toEqual({ a: 1, c: 3 });
    historyList.next();
    expect(historyList.data).toEqual({ a: 1, c: 3 });
  });
  it('historyList.destroy', () => {
    // 清空历史记录列表
    historyList.destroy();
    expect(historyList.data).toEqual({});
  });
});
