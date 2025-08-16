/**
 * 合并DrCtrl控件
 *
 * @author tony001
 * @date 2024-04-29 19:04:44
 * @export
 * @param {IModel} dstDRCtrl
 * @param {IModel} srcDRCtrl
 * @return {*}  {void}
 */
export function mergeDEDrControl(dstDRCtrl: IModel, srcDRCtrl: IModel): void {
  if (!srcDRCtrl) {
    return;
  }
  // 合并分组（相同name替换，没有则附加）
  if (srcDRCtrl.dedrbarGroups) {
    srcDRCtrl.dedrbarGroups.forEach((item1: IModel) => {
      let index: number = 0;
      const result = dstDRCtrl.dedrbarGroups?.find(
        (item2: IModel, index2: number) => {
          index = index2;
          return item1.name === item2.name;
        },
      );
      if (result) {
        dstDRCtrl.dedrbarGroups[index] = item1;
      } else {
        dstDRCtrl.dedrbarGroups.push(item1);
      }
    });
  }
  // 合并分组项（相同id替换，没有则附加）
  if (srcDRCtrl.dedrctrlItems) {
    srcDRCtrl.dedrctrlItems.forEach((item1: IModel) => {
      let index: number = 0;
      const result = dstDRCtrl.dedrctrlItems.find(
        (item2: IModel, index2: number) => {
          index = index2;
          return item1.id === item2.id;
        },
      );
      if (result) {
        dstDRCtrl.dedrctrlItems[index] = item1;
      } else {
        dstDRCtrl.dedrctrlItems.push(item1);
      }
    });
  }

  // 合并分组项（相同id替换，如果tab成员项定义成员标记（格式如：BEFORE/AFTER:目标项id）,则需要找到目标项，则根据位置在目标项前后附加），没有则附加到尾部
  if (srcDRCtrl.dedrtabPages) {
    srcDRCtrl.dedrtabPages.forEach((item1: IModel) => {
      let index: number = 0;
      const result = dstDRCtrl.dedrtabPages.find(
        (item2: IModel, index2: number) => {
          index = index2;
          return item1.id === item2.id;
        },
      );
      if (result) {
        dstDRCtrl.dedrtabPages[index] = item1;
      } else if (item1.itemTag) {
        const [targetPosition, targetTag] = item1.itemTag.split(':');
        if (!targetTag || !targetPosition) {
          dstDRCtrl.dedrtabPages.push(item1);
        } else {
          const targetIndex = dstDRCtrl.dedrtabPages.findIndex(
            (item3: IModel) => item3.id === targetTag,
          );
          if (targetIndex !== -1) {
            if (targetPosition === 'BEFORE') {
              dstDRCtrl.dedrtabPages.splice(targetIndex, 0, item1);
            } else if (targetPosition === 'AFTER') {
              dstDRCtrl.dedrtabPages.splice(targetIndex + 1, 0, item1);
            } else {
              dstDRCtrl.dedrtabPages.push(item1);
            }
          } else {
            dstDRCtrl.dedrtabPages.push(item1);
          }
        }
      } else {
        dstDRCtrl.dedrtabPages.push(item1);
      }
    });
  }
}
