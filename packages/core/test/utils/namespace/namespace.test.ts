import { describe, it, expect } from 'vitest';
import { Namespace } from '../../../src/utils/namespace/namespace';

// bem class 命名测试
describe('Namespace', () => {
  const ns = new Namespace('layout');
  it('ns.b', () => {
    expect(ns.b()).toBe('ibiz-layout');
    expect(ns.b('header')).toBe('ibiz-layout-header');
  });
  it('ns.e', () => {
    expect(ns.e('')).toBe('');
    expect(ns.e('header')).toBe('ibiz-layout__header');
  });
  it('ns.m', () => {
    expect(ns.m('')).toBe('');
    expect(ns.m('right')).toBe('ibiz-layout--right');
  });
  it('ns.be', () => {
    expect(ns.be('', '')).toBe('');
    expect(ns.be('header', 'title')).toBe('ibiz-layout-header__title');
  });
  it('ns.em', () => {
    expect(ns.em('', '')).toBe('');
    expect(ns.em('title', 'right')).toBe('ibiz-layout__title--right');
  });
  it('ns.bm', () => {
    expect(ns.bm('', '')).toBe('');
    expect(ns.bm('header', 'right')).toBe('ibiz-layout-header--right');
  });
  it('ns.bem', () => {
    expect(ns.bem('', '', '')).toBe('');
    expect(ns.bem('header', 'title', 'right')).toBe(
      'ibiz-layout-header__title--right',
    );
  });
  // 状态 class 样式命名
  it('ns.is', () => {
    expect(ns.is('loading', false)).toBe('');
    expect(ns.is('loading', true)).toBe('is-loading');
  });
  it('ns.cssVar、ns.cssVarBlock、ns.cssVarName、ns.cssVarBlockName', () => {
    // css 变量 style 对象
    expect(
      ns.cssVar({ 'background-color': 'red', 'form-font-size': '22px' }),
    ).toEqual({
      '--ibiz-background-color': 'red',
      '--ibiz-form-font-size': '22px',
    });
    expect(
      ns.cssVarBlock({ 'background-color': 'blue', 'form-font-size': '22px' }),
    ).toEqual({
      '--ibiz-layout-background-color': 'blue',
      '--ibiz-layout-form-font-size': '22px',
    });
    // css var 变量名称拼接
    expect(ns.cssVarName('color')).toBe('--ibiz-color');
    expect(ns.cssVarBlockName('color')).toBe('--ibiz-layout-color');
  });
});
