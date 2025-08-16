import { IAppDataEntity, IAppDEDataImport } from '@ibiz/model-core';
import { useNamespace } from '@ibiz-template/vue3-util';
import { defineComponent, ref, PropType } from 'vue';

import './data-import.scss';
import {
  downloadImportTemplate,
  selectAndImport,
} from '@ibiz-template/runtime';

export const DataImport = defineComponent({
  name: 'DataImport',
  props: {
    dismiss: {
      type: Function as PropType<() => void>,
      required: true,
    },
    appDataEntity: {
      type: Object as PropType<IAppDataEntity>,
      required: true,
    },
    dataImport: {
      type: Object as PropType<IAppDEDataImport>,
      required: false,
    },
    context: {
      type: Object as PropType<IContext>,
      required: false,
    },
    params: {
      type: Object as PropType<IParams>,
      required: false,
    },
  },
  setup(props) {
    const ns = useNamespace('data-import');
    const message = ref<{
      state: 'ready' | 'over' | 'error';
      message: string;
    }>({
      state: 'ready',
      message: '',
    });

    const errorMessage = ref('');

    const isLoading = ref(false);

    const onCancelButtonClick = () => {
      props.dismiss();
    };

    // 下载模板文件
    const onLinkClick = async () => {
      downloadImportTemplate(
        props.appDataEntity,
        props.dataImport,
        props.context,
        props.params,
      );
    };

    const selectFile = async () => {
      isLoading.value = true;
      const result = await selectAndImport({
        appDataEntity: props.appDataEntity,
        dataImport: props.dataImport,
        context: props.context,
        params: props.params,
      });

      // 取消上传的时候
      if (result.cancel) {
        isLoading.value = false;
        return;
      }

      if (!result.isAsync) {
        if (result.errorMessage) {
          errorMessage.value = result.errorMessage;
        } else {
          const { success, total, message: _message } = result;
          const totalNum = total ? Number(total) : 0;
          const successNum = success ? Number(success) : 0;
          const errorNum = total! - success!;
          message.value.state = _message ? 'error' : 'over';
          message.value.message =
            _message ||
            ibiz.i18n.t('component.dataImport.importSuccess', {
              totalNum,
              successNum,
              errorNum,
            });
        }
      }
      isLoading.value = false;
      if (result.isAsync) {
        onCancelButtonClick();
      }
    };

    return {
      ns,
      onLinkClick,
      selectFile,
      onCancelButtonClick,
      isLoading,
      message,
      errorMessage,
    };
  },
  render() {
    return (
      <div class={this.ns.b()} v-loading={this.isLoading}>
        <div class={this.ns.e('caption')}>
          {ibiz.i18n.t('component.dataImport.importData')}
        </div>
        {this.message.state === 'ready' ? (
          <div class={this.ns.b('upload')} onClick={this.selectFile}>
            <img
              class={this.ns.be('upload', 'img')}
              src='./assets/images/icon-import.svg'
            ></img>
            <span class={this.ns.be('upload', 'text')}>
              {ibiz.i18n.t('component.dataImport.clickToUpload')}
            </span>
          </div>
        ) : (
          <div class={[this.ns.b('message')]}>
            <div class={this.ns.be('message', 'title')}>
              {ibiz.i18n.t('component.dataImport.importResults')}
            </div>
            <div
              class={[
                this.ns.be('message', 'content'),
                this.ns.is('error', this.message.state === 'error'),
              ]}
            >
              {this.message.message}
            </div>
          </div>
        )}
        {this.errorMessage && (
          <div class={this.ns.b('error-message')}>{this.errorMessage}</div>
        )}
        <div class={this.ns.e('template-container')}>
          <div class={this.ns.e('template-description')}>
            {ibiz.i18n.t('component.dataImport.downloadTemplate')}
          </div>
          <div class={this.ns.e('template-link')} onClick={this.onLinkClick}>
            <ion-icon class={this.ns.e('link-icon')} name='link' />
            {this.appDataEntity.logicName}
            {ibiz.i18n.t('component.dataImport.templateFile')}
          </div>
        </div>
        <div class={this.ns.e('button-bar')}>
          <el-button onClick={this.onCancelButtonClick}>
            {ibiz.i18n.t('app.cancel')}
          </el-button>
          {this.message.state !== 'ready' && (
            <el-button onClick={this.selectFile}>
              {ibiz.i18n.t('component.dataImport.continue')}
            </el-button>
          )}
        </div>
      </div>
    );
  },
});
