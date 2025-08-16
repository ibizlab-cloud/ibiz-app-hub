import { useStore } from '@/store';
import { DropType } from '@/typings/drop';

export default () => {
  const store = useStore();

  const allowDrag = (draggingNode: any): boolean => {
    if (store.$param.allowDrag) {
      return store.$param.allowDrag(draggingNode);
    }
    return true;
  };

  const getAllowDropType = (type: DropType) => {
    let allowDropType = type as string;
    if (type === 'before') {
      allowDropType = 'prev'
    } else if (type === 'after') {
      allowDropType = 'next'
    }
    return allowDropType
  }

  const allowDrop = (
    draggingNode: any,
    dropNode: any,
    type: DropType,
  ): boolean => {
    if (store.$param.allowDrop) {
      return store.$param.allowDrop(draggingNode, dropNode, getAllowDropType(type));
    }
    return true;
  };

  return {
    allowDrag,
    allowDrop,
  };
};
