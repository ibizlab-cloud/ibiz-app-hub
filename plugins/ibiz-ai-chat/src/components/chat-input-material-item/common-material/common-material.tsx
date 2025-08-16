/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useComputed } from '@preact/signals';
import { AiChatController } from '../../../controller';
import { IMaterial } from '../../../interface';
import { Namespace } from '../../../utils';
import { DefaultMaterialSvg } from '../../../icons';
import { isSvg } from '../../../utils/util/util';
import './common-material.scss';

export interface CommonMaterialProps {
  controller: AiChatController;
  material: IMaterial;
}

const ns = new Namespace('common-material');

export const CommonMaterial = (props: CommonMaterialProps) => {
  const targetToolbarItem = props.controller.opts.questionToolbarItems?.find(
    item => {
      return item.id === (props.material.metadata as any).actionId;
    },
  );

  const content = useComputed(() => {
    return (props.material.metadata as any).name;
  });

  return (
    <div className={ns.b()}>
      <div className={ns.b('left')}>
        {targetToolbarItem && targetToolbarItem.icon ? (
          typeof targetToolbarItem.icon === 'function' ? (
            targetToolbarItem.icon()
          ) : (
            targetToolbarItem.icon?.showIcon && (
              <>
                {targetToolbarItem.icon?.cssClass ? (
                  <i className={targetToolbarItem.icon.cssClass} />
                ) : targetToolbarItem.icon?.imagePath ? (
                  isSvg(targetToolbarItem.icon.imagePath) ? (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: targetToolbarItem.icon.imagePath,
                      }}
                    />
                  ) : (
                    <img src={targetToolbarItem.icon.imagePath} />
                  )
                ) : null}
              </>
            )
          )
        ) : (
          <DefaultMaterialSvg></DefaultMaterialSvg>
        )}
      </div>
      <div className={ns.b('right')}>
        <div className={ns.e('name')} title={content}>
          {content}
        </div>
        <div className={ns.e('metadata')}>
          <div>{targetToolbarItem?.label || '素材资源'}</div>
        </div>
      </div>
    </div>
  );
};
