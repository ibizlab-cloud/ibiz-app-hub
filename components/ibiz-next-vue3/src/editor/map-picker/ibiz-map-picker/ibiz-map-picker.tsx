/* eslint-disable @typescript-eslint/no-explicit-any */
import { computed, defineComponent, nextTick, onUnmounted, ref } from 'vue';
import {
  useNamespace,
  getEditorEmits,
  getMapPickerProps,
} from '@ibiz-template/vue3-util';
import AMapLoader from '@amap/amap-jsapi-loader';
import { ElInput } from 'element-plus';
import { MapPickerEditorController } from '../map-picker-editor.controller';
import './ibiz-map-picker.scss';

/**
 * 地图选择器
 *
 * @description 通过高德地图选择具体位置，然后填充名称、经度和纬度。支持编辑器类型包含：`地图选择器`
 * @primary
 * @editorparams {"name":"readonly","parameterType":"boolean","defaultvalue":false,"description":"设置编辑器是否为只读态"}
 * @ignoreprops autoFocus | overflowMode
 * @ignoreemits blur | focus | enter | infoTextChange
 */
export const IBizMapPicker: ReturnType<typeof defineComponent> =
  defineComponent({
    name: 'IBizMapPicker',
    props: getMapPickerProps<MapPickerEditorController>(),
    emits: getEditorEmits(),
    setup(props, { emit }) {
      const ns = useNamespace('map-picker');

      // 控制器
      const c = props.controller;

      // 值项
      const editorItem = c.model.editorItems?.[0];

      // 输入框组件引用
      const inputRef = ref<InstanceType<typeof ElInput>>();

      // 搜索输入框元素
      const searchInputRef = ref<HTMLDivElement>();

      // 地图容器元素
      const mapContainerRef = ref<HTMLDivElement>();

      // 搜索结果容器元素
      const searchResultContainerRef = ref<HTMLDivElement>();

      // 对话框是否显示
      const dialogVisible = ref(false);

      // 是否正在加载中
      const isLoading = ref(false);

      // 搜索值
      const searchValue = ref('');

      // 是否显示表单默认内容
      const showFormDefaultContent = computed(() => {
        if (
          props.controlParams &&
          props.controlParams.editmode === 'hover' &&
          !props.readonly
        ) {
          return true;
        }
        return false;
      });

      // 地图对象
      let map: IData | undefined;

      // 标记对象
      let marker: IData | undefined;

      // poi选择器
      let poiPicker: IData | undefined;

      // 地址信息
      const addressInfo: {
        address: string;
        longitude?: number | null;
        latitude?: number | null;
      } = {
        address: '',
        longitude: null,
        latitude: null,
      };

      // 清除标记
      const clearMarker = () => {
        if (marker) {
          marker.setMap(null);
          marker = undefined;
        }
      };

      // 添加标记
      const addMarker = (lng: number, lat: number) => {
        const AMap = (window as IData).AMap;
        if (!AMap) {
          return;
        }
        clearMarker();
        marker = new AMap.Marker({
          position: [lng, lat],
        });
      };

      // 获取位置
      const getAddress = (lng: number, lat: number) => {
        const AMap = (window as IData).AMap;
        if (!AMap) {
          return;
        }
        if (!marker) {
          return;
        }
        const geocoder = new AMap.Geocoder({});
        const currentMarker = marker;
        geocoder.getAddress([lng, lat], (status: string, result: IData) => {
          if (!marker || marker !== currentMarker) {
            return;
          }
          if (
            status === 'complete' &&
            result.info === 'OK' &&
            result.regeocode
          ) {
            const regeocode = result.regeocode;
            const address = regeocode.formattedAddress;
            const markerContent = document.createElement('div');
            const markerImg = document.createElement('img');
            markerImg.style.width = '25px';
            markerImg.src =
              '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png';
            markerContent.appendChild(markerImg);
            const markerText = document.createElement('span');
            markerText.className = ns.b('dialog-map-marker-text');
            markerText.textContent = address;
            markerContent.appendChild(markerText);
            marker.setContent(markerContent);
            marker.setMap(map);
            addressInfo.address = address;
            addressInfo.longitude = lng;
            addressInfo.latitude = lat;
            searchValue.value = address;
          }
        });
      };

      // 加载地图
      const loadMap = async () => {
        try {
          isLoading.value = true;
          (window as IData)._AMapSecurityConfig = {
            securityJsCode: ibiz.env.aMapSecurityJsCode,
          };
          await AMapLoader.load({
            key: ibiz.env.aMapKey!,
            version: '2.0',
            plugins: ['AMap.PlaceSearch', 'AMap.Geocoder'],
            AMapUI: {
              version: '1.1',
              plugins: ['misc/PoiPicker'],
            },
          });
        } finally {
          isLoading.value = false;
        }
      };

      // 初始化地图
      const initMap = () => {
        const AMap = (window as IData).AMap;
        if (!AMap) {
          return;
        }
        if (!mapContainerRef.value) {
          return;
        }
        map = new AMap.Map(mapContainerRef.value, {
          viewMode: '3D',
          zoom: 11,
        });
        map?.on('click', (e: IData) => {
          const lnglat = e.lnglat;
          const lng = lnglat.lng;
          const lat = lnglat.lat;
          if (lng != null && lat != null) {
            addMarker(lng, lat);
            getAddress(lng, lat);
          }
        });
        const AMapUI = (window as IData).AMapUI;
        if (!AMapUI) {
          return;
        }
        if (!searchInputRef.value || !searchResultContainerRef.value) {
          return;
        }
        AMapUI.loadUI(['misc/PoiPicker'], function (PoiPicker: any) {
          if (
            !searchInputRef.value ||
            !searchResultContainerRef.value ||
            !PoiPicker
          ) {
            return;
          }
          poiPicker = new PoiPicker({
            input: searchInputRef.value,
            placeSearchOptions: {
              map,
            },
            searchResultsContainer: searchResultContainerRef.value,
          });
          poiPicker?.on('poiPicked', function (poiResult: IData) {
            clearMarker();
            const item = poiResult.item;
            if (item) {
              addressInfo.address = item.name;
              addressInfo.longitude = item.location?.lng;
              addressInfo.latitude = item.location?.lat;
              searchValue.value = item.name;
              if (poiResult.source !== 'search') {
                poiPicker?.searchByKeyword(item.name);
              }
            }
          });
        });
      };

      // 处理对话框显示
      const handleShow = () => {
        dialogVisible.value = true;
        inputRef.value?.blur();
        nextTick(async () => {
          if (!(window as IData).AMap) {
            await loadMap();
          }
          if (!map || !mapContainerRef.value?.children.length) {
            map?.destroy();
            initMap();
          }
          searchValue.value = props.value || '';
          if (editorItem && editorItem.id) {
            const [longitudeName, latitudeName] = editorItem.id.split(',');
            if (props.data) {
              const longitude = props.data[longitudeName];
              const latitude = props.data[latitudeName];
              if (longitude && latitude) {
                map?.setCenter([longitude, latitude], true);
                addMarker(longitude, latitude);
                getAddress(longitude, latitude);
              }
            }
          }
        });
      };

      // 处理确认按钮点击
      const handleConfirm = () => {
        dialogVisible.value = false;
        if (editorItem && editorItem.id) {
          const [longitudeName, latitudeName] = editorItem.id.split(',');
          if (longitudeName) {
            emit(
              'change',
              addressInfo.longitude != null ? addressInfo.longitude : null,
              longitudeName,
            );
          }
          if (latitudeName) {
            emit(
              'change',
              addressInfo.latitude != null ? addressInfo.latitude : null,
              latitudeName,
            );
          }
        }
        emit('change', addressInfo.address || '');
      };

      // 处理对话框关闭
      const handleClose = () => {
        if (poiPicker) {
          poiPicker.clearSuggest();
          poiPicker.clearSearchResults();
        }
        searchValue.value = '';
        addressInfo.address = '';
        addressInfo.longitude = null;
        addressInfo.latitude = null;
        clearMarker();
      };

      // 处理输入框清空按钮点击
      const handleClear = () => {
        if (editorItem && editorItem.id) {
          const [longitudeName, latitudeName] = editorItem.id.split(',');
          if (longitudeName) {
            emit('change', null, longitudeName);
          }
          if (latitudeName) {
            emit('change', null, latitudeName);
          }
        }
        emit('change', '');
      };

      // 处理搜索输入框清空按钮点击
      const handleSearchClear = () => {
        searchValue.value = '';
        addressInfo.address = '';
        addressInfo.longitude = null;
        addressInfo.latitude = null;
        clearMarker();
      };

      onUnmounted(() => {
        map?.destroy();
      });

      return {
        ns,
        c,
        inputRef,
        searchInputRef,
        mapContainerRef,
        searchResultContainerRef,
        dialogVisible,
        isLoading,
        searchValue,
        showFormDefaultContent,
        handleShow,
        handleConfirm,
        handleClose,
        handleClear,
        handleSearchClear,
      };
    },
    render() {
      const icon = (
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1024 1024'>
          <path
            fill='currentColor'
            d='m466.752 512-90.496-90.496a32 32 0 0 1 45.248-45.248L512 466.752l90.496-90.496a32 32 0 1 1 45.248 45.248L557.248 512l90.496 90.496a32 32 0 1 1-45.248 45.248L512 557.248l-90.496 90.496a32 32 0 0 1-45.248-45.248z'
          ></path>
          <path
            fill='currentColor'
            d='M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768m0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896'
          ></path>
        </svg>
      );
      let content;
      if (this.readonly) {
        content = this.value;
      } else {
        content = [
          <el-input
            class={this.ns.b('input')}
            ref='inputRef'
            model-value={this.value}
            placeholder={this.c.placeHolder}
            disabled={this.disabled}
            onFocus={this.handleShow}
          >
            {{
              suffix: () => {
                if (!this.value || this.disabled) {
                  return;
                }
                return (
                  <i
                    class='el-icon el-input__icon el-input__clear'
                    onClick={e => {
                      e.stopPropagation();
                      this.handleClear();
                    }}
                  >
                    {icon}
                  </i>
                );
              },
            }}
          </el-input>,
          <el-dialog
            class={this.ns.b('dialog')}
            v-model={this.dialogVisible}
            title={ibiz.i18n.t('editor.mapPicker.title')}
            append-to-body={true}
            align-center={true}
            width={'80%'}
            onClose={this.handleClose}
          >
            {{
              default: () => {
                return (
                  <div class={this.ns.b('dialog-content')}>
                    <div
                      class={`el-input el-input--suffix ${this.ns.b(
                        'dialog-search-input',
                      )} ${this.isLoading ? 'is-disabled' : ''}`}
                    >
                      <div class='el-input__wrapper' tabindex='-1'>
                        <input
                          ref='searchInputRef'
                          class='el-input__inner'
                          type='text'
                          autocomplete='off'
                          tabindex='0'
                          placeholder={ibiz.i18n.t(
                            'editor.mapPicker.searchPlaceholder',
                          )}
                          disabled={this.isLoading}
                          v-model={this.searchValue}
                        />
                        {this.searchValue ? (
                          <span class='el-input__suffix'>
                            <span class='el-input__suffix-inner'>
                              <i
                                class='el-icon el-input__icon el-input__clear'
                                onClick={e => {
                                  e.stopPropagation();
                                  this.handleSearchClear();
                                }}
                              >
                                {icon}
                              </i>
                            </span>
                          </span>
                        ) : null}
                      </div>
                    </div>
                    <div
                      class={this.ns.b('dialog-map-content')}
                      v-loading={this.isLoading}
                    >
                      <div
                        class={this.ns.b('dialog-map-container')}
                        ref='mapContainerRef'
                      ></div>
                      <div
                        class={this.ns.b('dialog-search-result-container')}
                        ref='searchResultContainerRef'
                      ></div>
                    </div>
                  </div>
                );
              },
              footer: () => {
                return (
                  <div class={this.ns.b('dialog-footer')}>
                    <el-button
                      type='primary'
                      disabled={this.isLoading}
                      onClick={this.handleConfirm}
                    >
                      {ibiz.i18n.t('editor.common.confirm')}
                    </el-button>
                  </div>
                );
              },
            }}
          </el-dialog>,
        ];
      }

      const formDefaultContent = (
        <div class={this.ns.b('form-default-content')}>
          {this.value ? (
            this.value
          ) : (
            <iBizEditorEmptyText
              showPlaceholder={this.c.emptyShowPlaceholder}
              placeHolder={this.c.placeHolder}
            />
          )}
        </div>
      );

      return (
        <div
          class={[
            this.ns.b(),
            this.disabled ? this.ns.m('disabled') : '',
            this.readonly ? this.ns.m('readonly') : '',
            this.ns.is('show-default', this.showFormDefaultContent),
          ]}
        >
          {this.showFormDefaultContent && formDefaultContent}
          {content}
        </div>
      );
    },
  });
