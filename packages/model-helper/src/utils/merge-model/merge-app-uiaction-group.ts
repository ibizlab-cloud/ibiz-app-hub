/* eslint-disable no-useless-return */
import { IUIActionGroup, IUIActionGroupDetail } from '@ibiz/model-core';

export function mergeAppDEUIActionGroup(
  dst: IUIActionGroup | undefined,
  src: IUIActionGroup | undefined,
): void {
  if (!dst || !src) {
    return;
  }
  // 合并界面行为组项
  if (src.uiactionGroupDetails) {
    if (!dst.uiactionGroupDetails) {
      dst.uiactionGroupDetails = [];
    }
    src.uiactionGroupDetails.forEach((item: IUIActionGroupDetail) => {
      dst.uiactionGroupDetails!.push(item);
    });
  }
}
