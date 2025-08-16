import { Namespace } from '@ibiz-template/core';
import { IControlController } from '@ibiz-template/runtime';
import { useNamespace } from '../../use';

/**
 * 部件UI组件准备参数
 * @author lxm
 * @date 2023-06-15 09:51:23
 * @export
 * @param {IControlController} c
 * @return {*}
 */
export function prepareControl(c: IControlController): {
  controlClass: string[];
  ns: Namespace;
} {
  const commonNs = useNamespace('control');
  const { controlType, sysCss, codeName } = c.model;
  const typeClass = controlType!.toLowerCase();
  const sysCssName = sysCss?.cssName;
  const ns = useNamespace(`control-${typeClass}`);

  const controlClass = [
    commonNs.b(),
    commonNs.b(typeClass),
    commonNs.m(codeName),
  ];
  if (sysCssName) {
    controlClass.push(sysCssName);
  }

  return { controlClass, ns };
}
