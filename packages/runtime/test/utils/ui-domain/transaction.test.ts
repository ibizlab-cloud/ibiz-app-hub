import { Transaction } from '../../../src/utils/ui-domain/transaction';
import { describe, expect, test, vi } from 'vitest';


describe('Transaction', () => {
    test('测试开启事务', () => {
        const transaction = new Transaction();
        // 开启事务
        transaction.open();
        // 事务状态为在事务中
        expect(transaction.state.isOpen).toBe(true);
    });

    test('是否应该以相反的顺序添加和提交更改', () => {
        const transaction = new Transaction();

        const mockCommit1 = vi.fn();
        const mockCommit2 = vi.fn();

        // 开启事务
        transaction.open();
        // 新增变更事务回调事务1
        transaction.change('1', mockCommit1);
        // 新增变更事务回调事务2
        transaction.change('2', mockCommit2);
        // 提交事务
        transaction.commit();
        // 执行事务2
        expect(mockCommit2).toHaveBeenCalled();
        // 执行事务1
        expect(mockCommit1).toHaveBeenCalled();
        // 事务变更状态为否
        expect(transaction.state.isChange).toBe(false);
    });

    test('测试回滚事务', () => {
        const transaction = new Transaction();

        const mockCommit = vi.fn();

        // 开启事务
        transaction.open();
        // 新增变更事务回调事务1
        transaction.change('1', mockCommit);
        // 回滚事务，清空待提交队列
        transaction.rollback();
        // 提交事务
        transaction.commit();
        // 事务1被清空，未调用
        expect(mockCommit).not.toHaveBeenCalled();
        // 事务变更状态为否
        expect(transaction.state.isChange).toBe(false);
    });

    test('测试关闭事务', () => {
        const transaction = new Transaction();

        // 开启事务 
        transaction.open();
        // 新增变更事务回调事务1 
        transaction.change('1', vi.fn());
        // 关闭事务，有事务未提交报错
        expect(() => {
            transaction.close();
        }).toThrowError('当前事务未提交，不可以直接关闭事务');
        expect(transaction.state.isOpen).toBe(true);
        // 提交事务
        transaction.commit();
        // 关闭事务 未报错
        expect(() => {
            transaction.close();
        }).not.toThrowError('当前事务未提交，不可以直接关闭事务');
        // 事务变更状态为否
        expect(transaction.state.isChange).toBe(false);
    });
});