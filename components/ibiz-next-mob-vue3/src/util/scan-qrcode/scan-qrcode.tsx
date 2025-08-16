import { defineComponent, PropType, ref } from 'vue';
import {
  OverlayContainer,
  useNamespace,
  useUIStore,
} from '@ibiz-template/vue3-util';
import { QrcodeStream } from 'vue-qrcode-reader';
import { IModalOptions, IOverlayContainer } from '@ibiz-template/runtime';
import './scan-qrcode.scss';

export const ScanQrcodeComponent = defineComponent({
  components: {
    QrcodeStream,
  },
  props: {
    opts: {
      type: Object as PropType<IParams>,
      default: () => ({}),
    },
  },
  setup(props, { emit }) {
    const ns = useNamespace('scan-qrcode');

    const { zIndex } = useUIStore();
    const overlayZIndex = zIndex.increment();

    // 相机配置选项: 'user'|'environment' （默认：environment）
    const constraintsConfig = ref({ facingMode: 'environment' });

    /**
     * 错误提示
     *
     * @author ljx
     * @date 2024-12-10 10:12:50
     * @param {IParams} error
     * @return {*}
     */
    const onError = (error: IParams) => {
      let errorText = `[${error.name}]: `;
      switch (error.name) {
        case 'NotAllowedError':
          errorText += ibiz.i18n.t('util.scanQrcode.notAllowedError');
          break;
        case 'NotFoundError':
          errorText += ibiz.i18n.t('util.scanQrcode.notFoundError');
          break;
        case 'NotSupportedError':
          errorText += ibiz.i18n.t('util.scanQrcode.notSupportedError');
          break;
        case 'NotReadableError':
          errorText += ibiz.i18n.t('util.scanQrcode.notReadableError');
          break;
        case 'OverconstrainedError':
          errorText += ibiz.i18n.t('util.scanQrcode.overconstrainedError');
          break;
        case 'StreamApiNotSupportedError':
          errorText += ibiz.i18n.t(
            'util.scanQrcode.streamApiNotSupportedError',
          );
          break;
        case 'InsecureContextError':
          errorText += ibiz.i18n.t('util.scanQrcode.insecureContextError');
          break;
        default:
          errorText += error.message;
      }
      ibiz.notification.error({ desc: errorText });
    };

    /**
     * 解码完成 交给父组件处理
     *
     * @author ljx
     * @date 2024-12-10 10:12:50
     * @param {string} value
     * @return {*}
     */
    const onDecode = (value: string) => {
      emit('dismiss', { ok: true, value });
    };

    /**
     * 一旦用户相机的流被加载，它就会显示出来并不断扫描二维码
     *
     * @author ljx
     * @date 2024-12-10 10:12:50
     * @param {IData[]} detectedCodes
     * @return {*}
     */
    const onDetect = (detectedCodes: IData[]) => {
      if (detectedCodes.length > 0) {
        onDecode(detectedCodes[0]?.rawValue);
      }
    };

    /**
     * 关闭弹框
     *
     * @author ljx
     * @date 2024-12-10 10:12:50
     * @return {*}
     */
    const onClose = () => {
      emit('dismiss', { ok: false, value: '' });
    };

    return {
      ns,
      overlayZIndex,
      constraintsConfig,
      onDetect,
      onError,
      onClose,
    };
  },
  render() {
    return (
      <div class={this.ns.b()} style={{ zIndex: this.overlayZIndex }}>
        <qrcode-stream
          class='qrcode-wrap'
          constraints={this.constraintsConfig}
          onError={this.onError}
          onDetect={this.onDetect}
          {...this.opts}
        >
          <div class={this.ns.e('scanner')}>
            <div class={this.ns.e('line-box')}>
              <div class={this.ns.em('line-box', 'row')}>
                <div class={this.ns.em('line-box', 'line')}></div>
              </div>
            </div>
            <div
              class={this.ns.e('close')}
              title={ibiz.i18n.t('app.close')}
              onClick={this.onClose}
            >
              <van-icon name='clear' />
            </div>
          </div>
        </qrcode-stream>
      </div>
    );
  },
});

/**
 * 创建模态框
 *
 * @author ljx
 * @date 2024-12-10 10:12:50
 * @export
 * @param {(IModalOptions | undefined)} [opts]
 * @return {*}  {IOverlayContainer}
 */
export function createScanQrcode(
  opts?: IModalOptions | undefined,
): IOverlayContainer {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return new OverlayContainer(ScanQrcodeComponent, {} as any, opts);
}
