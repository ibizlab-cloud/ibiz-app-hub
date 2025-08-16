export declare type DropType = 'before' | 'after' | 'inner' | 'none';

export declare interface DropProps {
  draggingNode: any;
  dropNode: any;
  type: DropType;
}
