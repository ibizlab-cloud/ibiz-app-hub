/* eslint-disable @typescript-eslint/no-explicit-any */
import { useComputed } from '@preact/signals';
import { AiChatController } from '../../../controller';
import { IMaterial } from '../../../interface';
import { Namespace } from '../../../utils';
import './ossfile-material.scss';
import { FileSvg } from '../../../icons';

export interface OssfileMaterialProps {
  controller: AiChatController;
  material: IMaterial;
}

const ns = new Namespace('ossfile-material');

export const OssfileMaterial = (props: OssfileMaterialProps) => {
  const content = useComputed(() => (props.material.data as any).name);
  const size = useComputed(() => (props.material.metadata as any).size);
  const state = useComputed(() => {
    const tempState = (props.material.metadata as any).state;
    if (tempState === 'successed') {
      return '上传成功';
    }
    if (tempState === 'uploading') {
      return '上传中';
    }
    if (tempState === 'failed') {
      return '上传失败';
    }
    return '未知状态';
  });

  const stateColor = useComputed(() => {
    const tempState = (props.material.metadata as any).state;
    switch (tempState) {
      case 'successed':
        return '#1890ff'; // 蓝色
      case 'uploading':
        return '#52c41a'; // 绿色
      case 'failed':
        return '#ff4d4f'; // 红色
      default:
        return '#ff4d4f'; // 未知状态红色
    }
  });

  return (
    <div className={ns.b()}>
      <div className={ns.b('left')}>
        <FileSvg />
      </div>
      <div className={ns.b('right')}>
        <div className={ns.e('name')} title={content}>
          {content}
        </div>
        <div className={ns.e('metadata')}>
          <div>{size}B</div>
          <div style={{ color: stateColor.value }}>{state}</div>
        </div>
      </div>
    </div>
  );
};
