import {
  IDrawerOptions,
  IFloatWindowOptions,
  IModal,
  IModalData,
  IModalOptions,
  IPopoverOptions,
} from '@ibiz-template/runtime';
import { h, resolveComponent, VNode } from 'vue';

export function createOverlayView(props?: IParams): (modal: IModal) => VNode {
  return (modal: IModal) => {
    const viewShell = resolveComponent('IBizViewShell');
    return h(viewShell, {
      ...props,
      modal,
    });
  };
}

export async function openViewModal(
  props?: IParams,
  opts?: IModalOptions,
): Promise<IModalData> {
  const overlay = ibiz.overlay.createModal(
    createOverlayView(props),
    undefined,
    opts,
  );
  overlay.present();
  const result: IModalData = await overlay.onWillDismiss();
  return result || { ok: false };
}

export async function openViewFloatWindow(
  props?: IParams,
  opts?: IFloatWindowOptions,
): Promise<IModalData> {
  const overlay = ibiz.overlay.createFloatWindow(
    createOverlayView(props),
    undefined,
    opts,
  );
  overlay.present();
  const result: IModalData = await overlay.onWillDismiss();
  return result || { ok: false };
}

export async function openViewDrawer(
  props?: IParams,
  opts?: IDrawerOptions,
): Promise<IModalData> {
  const overlay = ibiz.overlay.createDrawer(
    createOverlayView(props),
    undefined,
    opts,
  );
  await overlay.present();
  const result: IModalData = await overlay.onWillDismiss();
  return result || { ok: false };
}

export async function openViewPopover(
  event: MouseEvent,
  props?: IParams,
  opts?: IPopoverOptions,
): Promise<IModalData> {
  const overlay = ibiz.overlay.createPopover(
    createOverlayView(props),
    undefined,
    opts,
  );
  overlay.present(event.target as HTMLElement);
  const result: IModalData = await overlay.onWillDismiss();
  return result || { ok: false };
}

const PlacementMap: IData = {
  DRAWER_LEFT: 'left',
  DRAWER_RIGHT: 'right',
  DRAWER_TOP: 'top',
  DRAWER_BOTTOM: 'bottom',
};

export function getDrawerPlacement(
  openMode: string,
): IDrawerOptions['placement'] {
  return PlacementMap[openMode] || 'right';
}
