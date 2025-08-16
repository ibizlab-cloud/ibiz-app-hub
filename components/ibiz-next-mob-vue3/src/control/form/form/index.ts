import { App } from 'vue';
import { withInstall } from '@ibiz-template/vue3-util';
import { FormControl } from './form';
import {
  IBizFormButton,
  IBizFormDRUIPart,
  IBizFormGroupPanel,
  IBizFormItem,
  IBizFormPage,
  IBizFormRawItem,
  IBizFormTabPanel,
  IBizFormTabPage,
  IBizFormMDCtrl,
  IBizFormButtonList,
} from '../form-detail';

export const IBizFormControl = withInstall(FormControl, function (v: App) {
  v.component(FormControl.name, FormControl);
  v.use(IBizFormPage);
  v.use(IBizFormItem);
  v.use(IBizFormGroupPanel);
  v.use(IBizFormButton);
  v.use(IBizFormDRUIPart);
  v.use(IBizFormRawItem);
  v.use(IBizFormTabPanel);
  v.use(IBizFormTabPage);
  v.use(IBizFormMDCtrl);
  v.use(IBizFormButtonList);
});

export default IBizFormControl;
