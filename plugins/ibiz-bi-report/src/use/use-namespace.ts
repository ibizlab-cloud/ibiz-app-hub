// eslint-disable-next-line import/no-extraneous-dependencies
import { Namespace } from '@ibiz-template/core';

/**
 * css 命名空间
 *
 * @author tony001
 * @date 2024-05-21 14:05:55
 * @export
 * @param {string} block
 * @return {*}  {Namespace}
 */
export function useNamespace(block: string): Namespace {
  return new Namespace(block);
}
