import { defineComponent, PropType } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import './searchform-buttons.scss';
import { IPanelRawItem } from '@ibiz/model-core';
import { ElMessageBox } from 'element-plus';
import { SearchFormButtonsController } from './searchform-buttons.controller';

/**
 * 搜索表单按钮
 * @primary
 * @description 搜索表单使用，提供了搜索按钮，重置按钮以及保存搜索条件的按钮，根据配置显示对应的按钮。
 */
export const SearchFormButtons = defineComponent({
  name: 'IBizSearchFormButtons',
  props: {
    /**
     * @description 搜索表单按钮模型数据
     */
    modelData: {
      type: Object as PropType<IPanelRawItem>,
      required: true,
    },
    /**
     * @description 搜索表单按钮控制器
     */
    controller: {
      type: SearchFormButtonsController,
      required: true,
    },
  },
  setup(prop) {
    const ns = useNamespace('searchform-buttons');
    const c = prop.controller;

    // 是否处于设计预览状态
    const isDesignPreview = c.panel?.context?.srfrunmode === 'DESIGN';

    const onSearchButtonClick = () => {
      if (isDesignPreview) {
        return;
      }
      c.onSearchButtonClick();
    };

    const onResetButtonClick = () => {
      c.onResetButtonClick();
    };

    const saveFilterConfirm = () => {
      ElMessageBox.prompt(
        ibiz.i18n.t('panelComponent.searchformButtons.enterPrompt'),
        ibiz.i18n.t('panelComponent.searchformButtons.queryPrompt'),
        {
          confirmButtonText: ibiz.i18n.t('app.save'),
          cancelButtonText: ibiz.i18n.t('app.cancel'),
        },
      ).then(({ value }) => {
        c.searchFrom.storeFilter(value);
      });
    };

    const onAdvanceSearch = () => {
      c.searchFrom.evt.emit('openAdvanceSearch', undefined);
    };

    return {
      c,
      ns,
      onSearchButtonClick,
      onResetButtonClick,
      saveFilterConfirm,
      onAdvanceSearch,
    };
  },
  render() {
    return (
      <div
        class={[
          this.ns.b(),
          this.ns.m(this.modelData.id),
          ...this.controller.containerClass,
        ]}
      >
        {this.controller.searchButtonStyle === 'SEARCHONLY' ? (
          <el-button onClick={this.onSearchButtonClick}>
            {ibiz.i18n.t('app.search')}
          </el-button>
        ) : (
          <el-dropdown
            split-button
            type='primary'
            onClick={this.onSearchButtonClick}
          >
            {{
              default: () => (
                <span class={this.ns.b('label')}>
                  {ibiz.i18n.t('app.search')}
                </span>
              ),
              dropdown: () => {
                return (
                  <el-dropdown-menu>
                    <el-dropdown-item onClick={this.onResetButtonClick}>
                      {ibiz.i18n.t('app.reset')}
                    </el-dropdown-item>
                    {this.controller.searchFrom.state.enableStoredFilters && (
                      <el-dropdown-item onClick={this.saveFilterConfirm}>
                        {ibiz.i18n.t(
                          'panelComponent.searchformButtons.saveCondition',
                        )}
                      </el-dropdown-item>
                    )}
                    {this.controller.storedFilters.length > 0 &&
                      this.controller.storedFilters.map((item, index) => {
                        return (
                          <el-dropdown-item
                            class={this.ns.b('filter-item')}
                            onClick={() => {
                              this.controller.searchFrom.applyStoredFilter(
                                index,
                              );
                            }}
                          >
                            <span class={this.ns.be('filter-item', 'text')}>
                              {item.name}
                              <ion-icon
                                class={this.ns.be('filter-item', 'remove')}
                                onClick={(event: MouseEvent) => {
                                  event.stopPropagation();
                                  this.controller.searchFrom.removeStoredFilter(
                                    index,
                                  );
                                }}
                                name='close-outline'
                              ></ion-icon>
                            </span>
                          </el-dropdown-item>
                        );
                      })}
                  </el-dropdown-menu>
                );
              },
            }}
          </el-dropdown>
        )}
        {this.controller.advanceSearch && (
          <el-button onClick={this.onAdvanceSearch}>
            {ibiz.i18n.t('app.advanceSearch')}
          </el-button>
        )}
      </div>
    );
  },
});
