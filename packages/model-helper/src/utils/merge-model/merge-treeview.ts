import { IDETree } from '@ibiz/model-core';

/**
 * 合并树部件
 *
 * @author tony001
 * @date 2024-09-26 17:09:25
 * @export
 * @param {IDETree} dst
 * @param {IDETree} source
 */
export function mergeTreeView(dst: IDETree, source: IDETree): void {
  if (!dst || !source) return;
  // 合并树节点
  if (source.detreeNodes && source.detreeNodes.length > 0) {
    if (!dst.detreeNodes) {
      dst.detreeNodes = [];
    }
    source.detreeNodes.forEach(sourceNode => {
      const isExist = dst.detreeNodes!.find(dstNode => {
        return dstNode.id === sourceNode.id;
      });
      if (!isExist) {
        dst.detreeNodes?.push(sourceNode);
      }
    });
  }
  // 合并树节点关系
  if (source.detreeNodeRSs && source.detreeNodeRSs.length > 0) {
    if (!dst.detreeNodeRSs) {
      dst.detreeNodeRSs = [];
    }
    source.detreeNodeRSs.forEach(sourceNodeRs => {
      const isExist = dst.detreeNodeRSs!.find(dstNodeRs => {
        return (
          dstNodeRs.parentDETreeNodeId === sourceNodeRs.parentDETreeNodeId &&
          dstNodeRs.childDETreeNodeId === sourceNodeRs.childDETreeNodeId
        );
      });
      if (!isExist) {
        dst.detreeNodeRSs?.push(sourceNodeRs);
      }
    });
  }
}
