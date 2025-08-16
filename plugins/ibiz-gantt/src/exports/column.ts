import Column from 'components/column/index.vue';
import {
  type ColumnEmits,
  type ColumnMethods,
  type ColumnProps,
} from 'types/column/prop';
import { withInstall } from '../utils/install';
import { Variables } from '../constants/vars';

const XGanttColumn = withInstall<ColumnProps, ColumnMethods, ColumnEmits>(
  Variables.name.column,
  Column,
);

export default XGanttColumn;
