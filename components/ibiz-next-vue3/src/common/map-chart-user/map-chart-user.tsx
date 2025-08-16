/* eslint-disable eqeqeq */
import { defineComponent, onMounted, PropType, computed } from 'vue';
import { isNil, mergeDeepLeft, mergeDeepWithKey } from 'ramda';
import { useNamespace } from '@ibiz-template/vue3-util';
import { IMapData, MapController } from '@ibiz-template/runtime';
import {
  defaultOpts,
  getAreaOption,
  getAreaStaticOption,
  getPointOption,
  getPointStaticOption,
  getTooltip,
  getVisualMap,
  MapOptions,
} from './map-chart-user.util';
import { useMapManager } from './map-user-manager';
import './map-chart-user.scss';

export const IBizMapChartUser = defineComponent({
  name: 'IBizMapChartUser',
  props: {
    areaData: {
      type: Array<IMapData>,
    },
    pointData: {
      type: Array<IMapData>,
    },
    options: {
      type: Object as PropType<Partial<MapOptions>>,
      default: () => ({}),
    },
    controller: {
      type: MapController,
      required: true,
    },
  },
  setup(props) {
    const ns = useNamespace('map-chart-user');
    const c = props.controller;
    let option: IData = defaultOpts;
    if (c.controlParams.defaultopts) {
      const data = JSON.parse(c.controlParams.defaultopts);
      option = mergeDeepLeft(data, option);
    }
    const options = computed<MapOptions>(() => {
      // 后一个的undefined不覆盖
      return mergeDeepWithKey(
        (_key, x, z) => {
          return isNil(z) ? x : z;
        },
        option,
        props.options,
      );
    });

    const { chartRef, historyNames, changeMap, getCityInfo, goBack } =
      useMapManager(props.controller, options, mapName => {
        const areaData = props.areaData || [];
        const pointData = props.pointData || [];

        const tooltip = getTooltip();
        const visualMap = getVisualMap(options.value);
        const cityInfo = getCityInfo();
        const pointOption = {
          ...getPointStaticOption(options.value),
          ...getPointOption(pointData, areaData),
        };
        const areaOption = {
          ...getAreaStaticOption(options.value),
          ...getAreaOption(mapName, pointData, areaData, cityInfo),
        };

        const result: IData = {
          geo: {
            map: mapName,
          },
          tooltip,
          visualMap,
          series: [
            // 地图区块序列
            areaOption,
            // 地图散点序列
            pointOption,
          ],
        };
        return result;
      });

    onMounted(() => {
      const name = options.value.defaultAreaCode;
      const areaCode = c.state.strAreaCode ? `${name}` : Number(name);
      c.state.areaCode = areaCode;
      changeMap(name, areaCode, true);
    });

    return { ns, chartRef, historyNames, goBack };
  },
  render() {
    return (
      <div class={this.ns.b()}>
        <div class={this.ns.e('chart')} ref='chartRef'></div>
        {this.historyNames.length > 1 && (
          <div
            class={this.ns.e('goback')}
            onClick={() => {
              this.goBack();
            }}
          >
            {ibiz.i18n.t('app.return')}
          </div>
        )}
      </div>
    );
  },
});

export default IBizMapChartUser;
