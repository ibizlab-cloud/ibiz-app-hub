import { IDETreeDataSetNode } from '@ibiz/model-core';
import { CodeListItem, ITreeNodeData } from '../../../interface';
import { calcDeCodeNameById } from '../../../model';
import { TreeNodeData } from './tree-node-data';

/**
 * 实体动态代码表树节点数据
 *
 * @export
 * @class TreeCodeListNodeData
 * @extends {TreeNodeData}
 * @implements {ITreeNodeData}
 */
export class TreeCodeListNodeData
  extends TreeNodeData
  implements ITreeNodeData
{
  _text: string;

  _id!: string;

  _value: string;

  constructor(
    model: IDETreeDataSetNode,
    parentNodeData: ITreeNodeData | undefined,
    opts: {
      data: CodeListItem;
      leaf: boolean;
      defaultExpand: boolean;
      navContext?: IParams;
      navParams?: IParams;
    },
  ) {
    super(model, parentNodeData, opts);
    const { data } = opts;
    this._text = data.text;
    this._value = data.value as string;

    // id小写
    const selfId = `${model.id}@${this._value}`.toLowerCase();
    Object.defineProperty(this, '_id', {
      get() {
        return this._parent ? `${this._parent._id}:${selfId}` : selfId;
      },
      enumerable: true,
      configurable: true,
    });

    // 实体节点额外添加上自己的实体上下文
    if (model.appDataEntityId) {
      const deName = calcDeCodeNameById(model.appDataEntityId);
      this._context = Object.assign(this._context || {}, {
        [deName]: this._value,
      });
    }

    this.srfkey = this._value;
    this.srfmajortext = this._text;

    this._icon = this.calcIcon(model);
  }
}
