import { Component, defineAsyncComponent } from 'vue';

function calcAppViewId(tag: string): string {
  let id = '';
  if (tag.indexOf('.') !== -1) {
    const ids = tag.split('.');
    id = ids[ids.length - 1];
  } else {
    id = tag.toLowerCase();
  }
  return id;
}

export async function getAppViewComponent(
  name: string,
  appId: string,
): Promise<Component> {
  const _name = calcAppViewId(name).toLowerCase();
  // 子应用视图
  if (appId !== ibiz.env.appId) {
    return defineAsyncComponent(
      () => import('../../components/sub-app-view/sub-app-view.vue'),
    );
  }
  switch (_name) {
    case 'top_menu':
      return defineAsyncComponent(() => import('./top-menu/top-menu.vue'));
    case 'master_list_view':
      return defineAsyncComponent(
        () => import('./master/master-list-view/master-list-view.vue'),
      );
    case 'master_logic_plugin':
      return defineAsyncComponent(
        () => import('./master/master-logic-plugin/master-logic-plugin.vue'),
      );
    case 'master_editor_date_range':
      return defineAsyncComponent(
        () =>
          import(
            './master/master-editor-date-range/master-editor-date-range.vue'
          ),
      );
    case 'master_searchform_advanced':
      return defineAsyncComponent(
        () =>
          import(
            './master/master-searchform-advanced/master-searchform-advanced.vue'
          ),
      );
    case 'master_toolbar_base':
      return defineAsyncComponent(
        () => import('./master/master-toolbar-base/master-toolbar-base.vue'),
      );
    case 'master_theme_plugin':
      return defineAsyncComponent(
        () => import('./master/master-theme-plugin/master-theme-plugin.vue'),
      );
    case 'master_editor_spanlink':
      return defineAsyncComponent(
        () =>
          import('./master/master-editor-spanlink/master-editor-spanlink.vue'),
      );
    case 'master_panel_base':
      return defineAsyncComponent(
        () => import('./master/master-panel-base/master-panel-base.vue'),
      );
    case 'master_counter_dr':
      return defineAsyncComponent(
        () => import('./master/master-counter-dr/master-counter-dr.vue'),
      );
    case 'master_counter_exp_grid':
      return defineAsyncComponent(
        () =>
          import(
            './master/master-counter-exp-grid/master-counter-exp-grid.vue'
          ),
      );
    case 'master_card_base':
      return defineAsyncComponent(
        () => import('./master/master-card-base/master-card-base.vue'),
      );
    case 'master_chart_map':
      return defineAsyncComponent(
        () => import('./master/master-chart-map/master-chart-map.vue'),
      );
    case 'region_medit_view9':
      return defineAsyncComponent(
        () => import('./region/region-medit-view-9/region-medit-view-9.vue'),
      );
    case 'master_ui_plugin':
      return defineAsyncComponent(
        () => import('./master/master-ui-plugin/master-ui-plugin.vue'),
      );
    case 'master_calendar_exp_view':
      return defineAsyncComponent(
        () =>
          import(
            './master/master-calendar-exp-view/master-calendar-exp-view.vue'
          ),
      );
    case 'master_editor_markdown':
      return defineAsyncComponent(
        () =>
          import('./master/master-editor-markdown/master-editor-markdown.vue'),
      );
    case 'master_form_logic':
      return defineAsyncComponent(
        () => import('./master/master-form-logic/master-form-logic.vue'),
      );
    case 'region_card_nav':
      return defineAsyncComponent(
        () => import('./region/region-card-nav/region-card-nav.vue'),
      );
    case 'master_tab_ctrl_federation':
      return defineAsyncComponent(
        () =>
          import(
            './master/master-tab-ctrl-federation/master-tab-ctrl-federation.vue'
          ),
      );
    case 'master_list_cssandicon':
      return defineAsyncComponent(
        () =>
          import('./master/master-list-cssandicon/master-list-cssandicon.vue'),
      );
    case 'master_editor_plugin':
      return defineAsyncComponent(
        () => import('./master/master-editor-plugin/master-editor-plugin.vue'),
      );
    case 'master_view_message':
      return defineAsyncComponent(
        () => import('./master/master-view-message/master-view-message.vue'),
      );
    case 'master_chart_base':
      return defineAsyncComponent(
        () => import('./master/master-chart-base/master-chart-base.vue'),
      );
    case 'master_editor_input':
      return defineAsyncComponent(
        () => import('./master/master-editor-input/master-editor-input.vue'),
      );
    case 'master_edit_view':
      return defineAsyncComponent(
        () => import('./master/master-edit-view/master-edit-view.vue'),
      );
    case 'master_editor_dropdown_list':
      return defineAsyncComponent(
        () =>
          import(
            './master/master-editor-dropdown-list/master-editor-dropdown-list.vue'
          ),
      );
    case 'master_calendar_layout':
      return defineAsyncComponent(
        () =>
          import('./master/master-calendar-layout/master-calendar-layout.vue'),
      );
    case 'master_editor_switch':
      return defineAsyncComponent(
        () => import('./master/master-editor-switch/master-editor-switch.vue'),
      );
    case 'master_list_panellogic':
      return defineAsyncComponent(
        () =>
          import('./master/master-list-panellogic/master-list-panellogic.vue'),
      );
    case 'ps_core_prd_func_tree_exp_view':
      return defineAsyncComponent(
        () =>
          import(
            './ps-core-prd-func/ps-core-prd-func-tree-exp-view/ps-core-prd-func-tree-exp-view.vue'
          ),
      );
    case 'master_data_picker_embed_view':
      return defineAsyncComponent(
        () =>
          import(
            './master/master-data-picker-embed-view/master-data-picker-embed-view.vue'
          ),
      );
    case 'master_option_view':
      return defineAsyncComponent(
        () => import('./master/master-option-view/master-option-view.vue'),
      );
    case 'master_form_mctrl':
      return defineAsyncComponent(
        () => import('./master/master-form-mctrl/master-form-mctrl.vue'),
      );
    case 'region_grid_nav':
      return defineAsyncComponent(
        () => import('./region/region-grid-nav/region-grid-nav.vue'),
      );
    case 'master_tree_contextmenu':
      return defineAsyncComponent(
        () =>
          import(
            './master/master-tree-contextmenu/master-tree-contextmenu.vue'
          ),
      );
    case 'master_panel':
      return defineAsyncComponent(
        () => import('./master/master-panel/master-panel.vue'),
      );
    case 'region_detail_grid_view':
      return defineAsyncComponent(
        () =>
          import(
            './region/region-detail-grid-view/region-detail-grid-view.vue'
          ),
      );
    case 'master_ui_action_logic':
      return defineAsyncComponent(
        () =>
          import('./master/master-ui-action-logic/master-ui-action-logic.vue'),
      );
    case 'master_data_view':
      return defineAsyncComponent(
        () => import('./master/master-data-view/master-data-view.vue'),
      );
    case 'master_form_hover':
      return defineAsyncComponent(
        () => import('./master/master-form-hover/master-form-hover.vue'),
      );
    case 'master_grid_view':
      return defineAsyncComponent(
        () => import('./master/master-grid-view/master-grid-view.vue'),
      );
    case 'master_de_action_plugin':
      return defineAsyncComponent(
        () =>
          import(
            './master/master-de-action-plugin/master-de-action-plugin.vue'
          ),
      );
    case 'master_upload_image_preview':
      return defineAsyncComponent(
        () =>
          import(
            './master/master-upload-image-preview/master-upload-image-preview.vue'
          ),
      );
    case 'master_kanban_view':
      return defineAsyncComponent(
        () => import('./master/master-kanban-view/master-kanban-view.vue'),
      );
    case 'region_edit_view':
      return defineAsyncComponent(
        () => import('./region/region-edit-view/region-edit-view.vue'),
      );
    case 'master_grid_value_display':
      return defineAsyncComponent(
        () =>
          import(
            './master/master-grid-value-display/master-grid-value-display.vue'
          ),
      );
    case 'master_ui_action':
      return defineAsyncComponent(
        () => import('./master/master-ui-action/master-ui-action.vue'),
      );
    case 'master_wizard':
      return defineAsyncComponent(
        () => import('./master/master-wizard/master-wizard.vue'),
      );
    case 'master_tab_exp_view':
      return defineAsyncComponent(
        () => import('./master/master-tab-exp-view/master-tab-exp-view.vue'),
      );
    case 'master_data_picker_link':
      return defineAsyncComponent(
        () =>
          import(
            './master/master-data-picker-link/master-data-picker-link.vue'
          ),
      );
    case 'master_dropdown_emoji':
      return defineAsyncComponent(
        () =>
          import('./master/master-dropdown-emoji/master-dropdown-emoji.vue'),
      );
    case 'master_report_view':
      return defineAsyncComponent(
        () => import('./master/master-report-view/master-report-view.vue'),
      );
    case 'master_tree_drag':
      return defineAsyncComponent(
        () => import('./master/master-tree-drag/master-tree-drag.vue'),
      );
    case 'master_chart_candlestick':
      return defineAsyncComponent(
        () =>
          import(
            './master/master-chart-candlestick/master-chart-candlestick.vue'
          ),
      );
    case 'master_chart_instrument':
      return defineAsyncComponent(
        () =>
          import(
            './master/master-chart-instrument/master-chart-instrument.vue'
          ),
      );
    case 'master_toolbar':
      return defineAsyncComponent(
        () => import('./master/master-toolbar/master-toolbar.vue'),
      );
    case 'master_searchbar':
      return defineAsyncComponent(
        () => import('./master/master-searchbar/master-searchbar.vue'),
      );
    case 'master_editor_date_picker':
      return defineAsyncComponent(
        () =>
          import(
            './master/master-editor-date-picker/master-editor-date-picker.vue'
          ),
      );
    case 'master_view_open_mode':
      return defineAsyncComponent(
        () =>
          import('./master/master-view-open-mode/master-view-open-mode.vue'),
      );
    case 'master_list_logic':
      return defineAsyncComponent(
        () => import('./master/master-list-logic/master-list-logic.vue'),
      );
    case 'master_editor_date_range_select':
      return defineAsyncComponent(
        () =>
          import(
            './master/master-editor-date-range-select/master-editor-date-range-select.vue'
          ),
      );
    case 'master_grid_data_picker_link':
      return defineAsyncComponent(
        () =>
          import(
            './master/master-grid-data-picker-link/master-grid-data-picker-link.vue'
          ),
      );
    case 'master_counter_plugin':
      return defineAsyncComponent(
        () =>
          import('./master/master-counter-plugin/master-counter-plugin.vue'),
      );
    case 'master_data_picker_select_view':
      return defineAsyncComponent(
        () =>
          import(
            './master/master-data-picker-select-view/master-data-picker-select-view.vue'
          ),
      );
    case 'master_grid_view_read':
      return defineAsyncComponent(
        () =>
          import('./master/master-grid-view-read/master-grid-view-read.vue'),
      );
    case 'master_calendar':
      return defineAsyncComponent(
        () => import('./master/master-calendar/master-calendar.vue'),
      );
    case 'master_calendar_base':
      return defineAsyncComponent(
        () => import('./master/master-calendar-base/master-calendar-base.vue'),
      );
    case 'master_pickup_grid_view':
      return defineAsyncComponent(
        () =>
          import(
            './master/master-pickup-grid-view/master-pickup-grid-view.vue'
          ),
      );
    case 'master_kanban_style':
      return defineAsyncComponent(
        () => import('./master/master-kanban-style/master-kanban-style.vue'),
      );
    case 'master_toolbar_style':
      return defineAsyncComponent(
        () => import('./master/master-toolbar-style/master-toolbar-style.vue'),
      );
    case 'master_counter_exp_form':
      return defineAsyncComponent(
        () =>
          import(
            './master/master-counter-exp-form/master-counter-exp-form.vue'
          ),
      );
    case 'category_option_view':
      return defineAsyncComponent(
        () =>
          import('./category/category-option-view/category-option-view.vue'),
      );
    case 'master_grid_edit':
      return defineAsyncComponent(
        () => import('./master/master-grid-edit/master-grid-edit.vue'),
      );
    case 'master_list_layout':
      return defineAsyncComponent(
        () => import('./master/master-list-layout/master-list-layout.vue'),
      );
    case 'master_searchform_auto':
      return defineAsyncComponent(
        () =>
          import('./master/master-searchform-auto/master-searchform-auto.vue'),
      );
    case 'master_editor_html':
      return defineAsyncComponent(
        () => import('./master/master-editor-html/master-editor-html.vue'),
      );
    case 'master_pivottable':
      return defineAsyncComponent(
        () => import('./master/master-pivottable/master-pivottable.vue'),
      );
    case 'master_editor_raw':
      return defineAsyncComponent(
        () => import('./master/master-editor-raw/master-editor-raw.vue'),
      );
    case 'master_ac_item_plugin':
      return defineAsyncComponent(
        () =>
          import('./master/master-ac-item-plugin/master-ac-item-plugin.vue'),
      );
    case 'master_list_base':
      return defineAsyncComponent(
        () => import('./master/master-list-base/master-list-base.vue'),
      );
    case 'master_chart_view':
      return defineAsyncComponent(
        () => import('./master/master-chart-view/master-chart-view.vue'),
      );
    case 'master_open_mode':
      return defineAsyncComponent(
        () => import('./master/master-open-mode/master-open-mode.vue'),
      );
    case 'master_wizard_view':
      return defineAsyncComponent(
        () => import('./master/master-wizard-view/master-wizard-view.vue'),
      );
    case 'master_editor_slider':
      return defineAsyncComponent(
        () => import('./master/master-editor-slider/master-editor-slider.vue'),
      );
    case 'ps_core_prd_func_redirect_view':
      return defineAsyncComponent(
        () =>
          import(
            './ps-core-prd-func/ps-core-prd-func-redirect-view/ps-core-prd-func-redirect-view.vue'
          ),
      );
    case 'master_list_format':
      return defineAsyncComponent(
        () => import('./master/master-list-format/master-list-format.vue'),
      );
    case 'master_chart_bar':
      return defineAsyncComponent(
        () => import('./master/master-chart-bar/master-chart-bar.vue'),
      );
    case 'master_editor_input_number':
      return defineAsyncComponent(
        () =>
          import(
            './master/master-editor-input-number/master-editor-input-number.vue'
          ),
      );
    case 'master_map_built_in_nav':
      return defineAsyncComponent(
        () =>
          import(
            './master/master-map-built-in-nav/master-map-built-in-nav.vue'
          ),
      );
    case 'master_tree_search':
      return defineAsyncComponent(
        () => import('./master/master-tree-search/master-tree-search.vue'),
      );
    case 'master_actions_federation':
      return defineAsyncComponent(
        () =>
          import(
            './master/master-actions-federation/master-actions-federation.vue'
          ),
      );
    case 'master_card_kanbanview':
      return defineAsyncComponent(
        () =>
          import('./master/master-card-kanbanview/master-card-kanbanview.vue'),
      );
    case 'master_layout_view':
      return defineAsyncComponent(
        () => import('./master/master-layout-view/master-layout-view.vue'),
      );
    case 'master_editor_array':
      return defineAsyncComponent(
        () => import('./master/master-editor-array/master-editor-array.vue'),
      );
    case 'master_card_panellogic':
      return defineAsyncComponent(
        () =>
          import('./master/master-card-panellogic/master-card-panellogic.vue'),
      );
    case 'master_view_message_kind':
      return defineAsyncComponent(
        () =>
          import(
            './master/master-view-message-kind/master-view-message-kind.vue'
          ),
      );
    case 'master_grid_filter':
      return defineAsyncComponent(
        () => import('./master/master-grid-filter/master-grid-filter.vue'),
      );
    case 'master_chart_exp_view2':
      return defineAsyncComponent(
        () =>
          import(
            './master/master-chart-exp-view-2/master-chart-exp-view-2.vue'
          ),
      );
    case 'master_grid_css':
      return defineAsyncComponent(
        () => import('./master/master-grid-css/master-grid-css.vue'),
      );
    case 'master_panel_cssandicon':
      return defineAsyncComponent(
        () =>
          import(
            './master/master-panel-cssandicon/master-panel-cssandicon.vue'
          ),
      );
    case 'master_tree_picker':
      return defineAsyncComponent(
        () => import('./master/master-tree-picker/master-tree-picker.vue'),
      );
    case 'master_chart':
      return defineAsyncComponent(
        () => import('./master/master-chart/master-chart.vue'),
      );
    case 'master_tab_nav':
      return defineAsyncComponent(
        () => import('./master/master-tab-nav/master-tab-nav.vue'),
      );
    case 'master_grid_span':
      return defineAsyncComponent(
        () => import('./master/master-grid-span/master-grid-span.vue'),
      );
    case 'master_runtime_components':
      return defineAsyncComponent(
        () =>
          import(
            './master/master-runtime-components/master-runtime-components.vue'
          ),
      );
    case 'master_card_cssandicon':
      return defineAsyncComponent(
        () =>
          import('./master/master-card-cssandicon/master-card-cssandicon.vue'),
      );
    case 'master_editor_rate':
      return defineAsyncComponent(
        () => import('./master/master-editor-rate/master-editor-rate.vue'),
      );
    case 'master_calendar_logic':
      return defineAsyncComponent(
        () =>
          import('./master/master-calendar-logic/master-calendar-logic.vue'),
      );
    case 'ps_core_prd_func_edit_view':
      return defineAsyncComponent(
        () =>
          import(
            './ps-core-prd-func/ps-core-prd-func-edit-view/ps-core-prd-func-edit-view.vue'
          ),
      );
    case 'master_ui_action_base':
      return defineAsyncComponent(
        () =>
          import('./master/master-ui-action-base/master-ui-action-base.vue'),
      );
    case 'master_gantt_view':
      return defineAsyncComponent(
        () => import('./master/master-gantt-view/master-gantt-view.vue'),
      );
    case 'master_logic_base':
      return defineAsyncComponent(
        () => import('./master/master-logic-base/master-logic-base.vue'),
      );
    case 'master_counter_tree':
      return defineAsyncComponent(
        () => import('./master/master-counter-tree/master-counter-tree.vue'),
      );
    case 'master_form_defiupdate':
      return defineAsyncComponent(
        () =>
          import('./master/master-form-defiupdate/master-form-defiupdate.vue'),
      );
    case 'master_modal_edit_view':
      return defineAsyncComponent(
        () =>
          import('./master/master-modal-edit-view/master-modal-edit-view.vue'),
      );
    case 'region_grid_exp_view':
      return defineAsyncComponent(
        () => import('./region/region-grid-exp-view/region-grid-exp-view.vue'),
      );
    case 'master_chart_pie':
      return defineAsyncComponent(
        () => import('./master/master-chart-pie/master-chart-pie.vue'),
      );
    case 'region_edit_view2':
      return defineAsyncComponent(
        () => import('./region/region-edit-view-2/region-edit-view-2.vue'),
      );
    case 'master_panel_logic':
      return defineAsyncComponent(
        () => import('./master/master-panel-logic/master-panel-logic.vue'),
      );
    case 'region_m_pickup_view':
      return defineAsyncComponent(
        () => import('./region/region-m-pickup-view/region-m-pickup-view.vue'),
      );
    case 'master_chart_radar':
      return defineAsyncComponent(
        () => import('./master/master-chart-radar/master-chart-radar.vue'),
      );
    case 'master_view_message_close_mode':
      return defineAsyncComponent(
        () =>
          import(
            './master/master-view-message-close-mode/master-view-message-close-mode.vue'
          ),
      );
    case 'ps_core_prd_func_installed_grid_view':
      return defineAsyncComponent(
        () =>
          import(
            './ps-core-prd-func/ps-core-prd-func-installed-grid-view/ps-core-prd-func-installed-grid-view.vue'
          ),
      );
    case 'master_tree_grid_ex_view':
      return defineAsyncComponent(
        () =>
          import(
            './master/master-tree-grid-ex-view/master-tree-grid-ex-view.vue'
          ),
      );
    case 'master_doing_custom_view':
      return defineAsyncComponent(
        () =>
          import(
            './master/master-doing-custom-view/master-doing-custom-view.vue'
          ),
      );
    case 'master_grid_built_in_nav':
      return defineAsyncComponent(
        () =>
          import(
            './master/master-grid-built-in-nav/master-grid-built-in-nav.vue'
          ),
      );
    case 'master_data_transfer_picker':
      return defineAsyncComponent(
        () =>
          import(
            './master/master-data-transfer-picker/master-data-transfer-picker.vue'
          ),
      );
    case 'master_searchform_btncss':
      return defineAsyncComponent(
        () =>
          import(
            './master/master-searchform-btncss/master-searchform-btncss.vue'
          ),
      );
    case 'master_map_user':
      return defineAsyncComponent(
        () => import('./master/master-map-user/master-map-user.vue'),
      );
    case 'master_counter_form_group':
      return defineAsyncComponent(
        () =>
          import(
            './master/master-counter-form-group/master-counter-form-group.vue'
          ),
      );
    case 'master_counter_tab_exp':
      return defineAsyncComponent(
        () =>
          import('./master/master-counter-tab-exp/master-counter-tab-exp.vue'),
      );
    case 'master_editor_span':
      return defineAsyncComponent(
        () => import('./master/master-editor-span/master-editor-span.vue'),
      );
    case 'master_grid':
      return defineAsyncComponent(
        () => import('./master/master-grid/master-grid.vue'),
      );
    case 'master_action_plugin':
      return defineAsyncComponent(
        () => import('./master/master-action-plugin/master-action-plugin.vue'),
      );
    case 'master_treeview':
      return defineAsyncComponent(
        () => import('./master/master-treeview/master-treeview.vue'),
      );
    case 'master_editor_autocomplete':
      return defineAsyncComponent(
        () =>
          import(
            './master/master-editor-autocomplete/master-editor-autocomplete.vue'
          ),
      );
    case 'region_grid_view':
      return defineAsyncComponent(
        () => import('./region/region-grid-view/region-grid-view.vue'),
      );
    case 'master_toolbar_item_plugin':
      return defineAsyncComponent(
        () =>
          import(
            './master/master-toolbar-item-plugin/master-toolbar-item-plugin.vue'
          ),
      );
    case 'master_chart_multiple_sequences':
      return defineAsyncComponent(
        () =>
          import(
            './master/master-chart-multiple-sequences/master-chart-multiple-sequences.vue'
          ),
      );
    case 'region_edit_view_tab_exp':
      return defineAsyncComponent(
        () =>
          import(
            './region/region-edit-view-tab-exp/region-edit-view-tab-exp.vue'
          ),
      );
    case 'master_grid_group':
      return defineAsyncComponent(
        () => import('./master/master-grid-group/master-grid-group.vue'),
      );
    case 'master_editor_data_picker':
      return defineAsyncComponent(
        () =>
          import(
            './master/master-editor-data-picker/master-editor-data-picker.vue'
          ),
      );
    case 'master_upload_image_cropping':
      return defineAsyncComponent(
        () =>
          import(
            './master/master-upload-image-cropping/master-upload-image-cropping.vue'
          ),
      );
    case 'comment_list_view':
      return defineAsyncComponent(
        () => import('./comment/comment-list-view/comment-list-view.vue'),
      );
    case 'master_map_view':
      return defineAsyncComponent(
        () => import('./master/master-map-view/master-map-view.vue'),
      );
    case 'master_treeview_cssandicon':
      return defineAsyncComponent(
        () =>
          import(
            './master/master-treeview-cssandicon/master-treeview-cssandicon.vue'
          ),
      );
    case 'master_comment_display':
      return defineAsyncComponent(
        () =>
          import('./master/master-comment-display/master-comment-display.vue'),
      );
    case 'region_sedit_view':
      return defineAsyncComponent(
        () => import('./region/region-sedit-view/region-sedit-view.vue'),
      );
    case 'master_editor_check_box':
      return defineAsyncComponent(
        () =>
          import(
            './master/master-editor-check-box/master-editor-check-box.vue'
          ),
      );
    case 'master_card_group':
      return defineAsyncComponent(
        () => import('./master/master-card-group/master-card-group.vue'),
      );
    case 'master_portlet_plugin':
      return defineAsyncComponent(
        () =>
          import('./master/master-portlet-plugin/master-portlet-plugin.vue'),
      );
    case 'master_editor_radio_list':
      return defineAsyncComponent(
        () =>
          import(
            './master/master-editor-radio-list/master-editor-radio-list.vue'
          ),
      );
    case 'master_ui_action_cssandicon':
      return defineAsyncComponent(
        () =>
          import(
            './master/master-ui-action-cssandicon/master-ui-action-cssandicon.vue'
          ),
      );
    case 'master_data':
      return defineAsyncComponent(
        () => import('./master/master-data/master-data.vue'),
      );
    case 'master_toolbar_group':
      return defineAsyncComponent(
        () => import('./master/master-toolbar-group/master-toolbar-group.vue'),
      );
    case 'master_data_picker_dropdown':
      return defineAsyncComponent(
        () =>
          import(
            './master/master-data-picker-dropdown/master-data-picker-dropdown.vue'
          ),
      );
    case 'region_edit_view9':
      return defineAsyncComponent(
        () => import('./region/region-edit-view-9/region-edit-view-9.vue'),
      );
    case 'master_chart_groupbar':
      return defineAsyncComponent(
        () =>
          import('./master/master-chart-groupbar/master-chart-groupbar.vue'),
      );
    case 'master_layout':
      return defineAsyncComponent(
        () => import('./master/master-layout/master-layout.vue'),
      );
    case 'master_grid_logic':
      return defineAsyncComponent(
        () => import('./master/master-grid-logic/master-grid-logic.vue'),
      );
    case 'master_wizard_view_logic':
      return defineAsyncComponent(
        () =>
          import(
            './master/master-wizard-view-logic/master-wizard-view-logic.vue'
          ),
      );
    case 'master_map_base':
      return defineAsyncComponent(
        () => import('./master/master-map-base/master-map-base.vue'),
      );
    case 'region_tree_grid_view':
      return defineAsyncComponent(
        () =>
          import('./region/region-tree-grid-view/region-tree-grid-view.vue'),
      );
    case 'master_grid_action_column':
      return defineAsyncComponent(
        () =>
          import(
            './master/master-grid-action-column/master-grid-action-column.vue'
          ),
      );
    case 'master_info_view':
      return defineAsyncComponent(
        () => import('./master/master-info-view/master-info-view.vue'),
      );
    case 'master_grid_aggregation':
      return defineAsyncComponent(
        () =>
          import(
            './master/master-grid-aggregation/master-grid-aggregation.vue'
          ),
      );
    case 'master_grid_toolbar':
      return defineAsyncComponent(
        () => import('./master/master-grid-toolbar/master-grid-toolbar.vue'),
      );
    case 'master_chart_funnel_plot':
      return defineAsyncComponent(
        () =>
          import(
            './master/master-chart-funnel-plot/master-chart-funnel-plot.vue'
          ),
      );
    case 'master_calendar_style_icon':
      return defineAsyncComponent(
        () =>
          import(
            './master/master-calendar-style-icon/master-calendar-style-icon.vue'
          ),
      );
    case 'master_async_activity':
      return defineAsyncComponent(
        () =>
          import('./master/master-async-activity/master-async-activity.vue'),
      );
    case 'region_pickup_grid_view':
      return defineAsyncComponent(
        () =>
          import(
            './region/region-pickup-grid-view/region-pickup-grid-view.vue'
          ),
      );
    case 'region_edit_view3':
      return defineAsyncComponent(
        () => import('./region/region-edit-view-3/region-edit-view-3.vue'),
      );
    // case 'master_edit_view':
    //   return defineAsyncComponent(
    //     () => import('./master/master-edit-view/master-edit-view.vue'),
    //   );
    case 'master_form_info':
      return defineAsyncComponent(
        () => import('./master/master-form-info/master-form-info.vue'),
      );
    case 'master_chart_scatter':
      return defineAsyncComponent(
        () => import('./master/master-chart-scatter/master-chart-scatter.vue'),
      );
    case 'master_form_layout':
      return defineAsyncComponent(
        () => import('./master/master-form-layout/master-form-layout.vue'),
      );
    case 'master_upload_file_upload':
      return defineAsyncComponent(
        () =>
          import(
            './master/master-upload-file-upload/master-upload-file-upload.vue'
          ),
      );
    case 'master_searchbar_base':
      return defineAsyncComponent(
        () =>
          import('./master/master-searchbar-base/master-searchbar-base.vue'),
      );
    case 'master_data_mpicker':
      return defineAsyncComponent(
        () => import('./master/master-data-mpicker/master-data-mpicker.vue'),
      );
    case 'region_edit_view4':
      return defineAsyncComponent(
        () => import('./region/region-edit-view-4/region-edit-view-4.vue'),
      );
    case 'region_pickup_view':
      return defineAsyncComponent(
        () => import('./region/region-pickup-view/region-pickup-view.vue'),
      );
    case 'master_wizard_view_style':
      return defineAsyncComponent(
        () =>
          import(
            './master/master-wizard-view-style/master-wizard-view-style.vue'
          ),
      );
    case 'master_grid_base':
      return defineAsyncComponent(
        () => import('./master/master-grid-base/master-grid-base.vue'),
      );
    case 'master_chart_annular':
      return defineAsyncComponent(
        () => import('./master/master-chart-annular/master-chart-annular.vue'),
      );
    case 'master_tree_base':
      return defineAsyncComponent(
        () => import('./master/master-tree-base/master-tree-base.vue'),
      );
    case 'master_treeview_navparams':
      return defineAsyncComponent(
        () =>
          import(
            './master/master-treeview-navparams/master-treeview-navparams.vue'
          ),
      );
    case 'master_control_plugin':
      return defineAsyncComponent(
        () =>
          import('./master/master-control-plugin/master-control-plugin.vue'),
      );
    case 'master_searchform_filter':
      return defineAsyncComponent(
        () =>
          import(
            './master/master-searchform-filter/master-searchform-filter.vue'
          ),
      );
    case 'master_map_picker':
      return defineAsyncComponent(
        () => import('./master/master-map-picker/master-map-picker.vue'),
      );
    case 'master_editor_cascader':
      return defineAsyncComponent(
        () =>
          import('./master/master-editor-cascader/master-editor-cascader.vue'),
      );
    case 'master_list_batchtoolbar':
      return defineAsyncComponent(
        () =>
          import(
            './master/master-list-batchtoolbar/master-list-batchtoolbar.vue'
          ),
      );
    case 'master_ui_logic_plugin':
      return defineAsyncComponent(
        () =>
          import('./master/master-ui-logic-plugin/master-ui-logic-plugin.vue'),
      );
    case 'master_data_view_exp_view':
      return defineAsyncComponent(
        () =>
          import(
            './master/master-data-view-exp-view/master-data-view-exp-view.vue'
          ),
      );
    case 'master_searchform_layout':
      return defineAsyncComponent(
        () =>
          import(
            './master/master-searchform-layout/master-searchform-layout.vue'
          ),
      );
    case 'master_panel_item_plugin':
      return defineAsyncComponent(
        () =>
          import(
            './master/master-panel-item-plugin/master-panel-item-plugin.vue'
          ),
      );
    case 'master_search_form':
      return defineAsyncComponent(
        () => import('./master/master-search-form/master-search-form.vue'),
      );
    case 'about':
      return defineAsyncComponent(() => import('./about/about/about.vue'));
    case 'master_html_view':
      return defineAsyncComponent(
        () => import('./master/master-html-view/master-html-view.vue'),
      );
    case 'activity_history_list_view':
      return defineAsyncComponent(
        () =>
          import(
            './activity/activity-history-list-view/activity-history-list-view.vue'
          ),
      );
    case 'master_tree_datasource':
      return defineAsyncComponent(
        () =>
          import('./master/master-tree-datasource/master-tree-datasource.vue'),
      );
    case 'welcome':
      return defineAsyncComponent(() => import('./about/welcome/welcome.vue'));
    case 'master_view_plugin':
      return defineAsyncComponent(
        () => import('./master/master-view-plugin/master-view-plugin.vue'),
      );
    case 'master_claendar_group':
      return defineAsyncComponent(
        () =>
          import('./master/master-claendar-group/master-claendar-group.vue'),
      );
    case 'region_list_exp_view':
      return defineAsyncComponent(
        () => import('./region/region-list-exp-view/region-list-exp-view.vue'),
      );
    case 'master_kanban_base':
      return defineAsyncComponent(
        () => import('./master/master-kanban-base/master-kanban-base.vue'),
      );
    case 'master_card_logic':
      return defineAsyncComponent(
        () => import('./master/master-card-logic/master-card-logic.vue'),
      );
    case 'master_map':
      return defineAsyncComponent(
        () => import('./master/master-map/master-map.vue'),
      );
    case 'master_editor_stepper':
      return defineAsyncComponent(
        () =>
          import('./master/master-editor-stepper/master-editor-stepper.vue'),
      );
    case 'master_calendar_multiple_data':
      return defineAsyncComponent(
        () =>
          import(
            './master/master-calendar-multiple-data/master-calendar-multiple-data.vue'
          ),
      );
    case 'master_card_format':
      return defineAsyncComponent(
        () => import('./master/master-card-format/master-card-format.vue'),
      );
    case 'master_card_layout':
      return defineAsyncComponent(
        () => import('./master/master-card-layout/master-card-layout.vue'),
      );
    case 'master_list_group':
      return defineAsyncComponent(
        () => import('./master/master-list-group/master-list-group.vue'),
      );
    case 'master_tree_exp':
      return defineAsyncComponent(
        () => import('./master/master-tree-exp/master-tree-exp.vue'),
      );
    case 'master_calendar_nav':
      return defineAsyncComponent(
        () => import('./master/master-calendar-nav/master-calendar-nav.vue'),
      );
    case 'master_gantt_exp_view':
      return defineAsyncComponent(
        () =>
          import('./master/master-gantt-exp-view/master-gantt-exp-view.vue'),
      );
    case 'region_view_message_position':
      return defineAsyncComponent(
        () =>
          import(
            './region/region-view-message-position/region-view-message-position.vue'
          ),
      );
    case 'category_category_mgr':
      return defineAsyncComponent(
        () =>
          import('./category/category-category-mgr/category-category-mgr.vue'),
      );
    case 'master_panel_event':
      return defineAsyncComponent(
        () => import('./master/master-panel-event/master-panel-event.vue'),
      );
    case 'ps_core_prd_func_market_application_view':
      return defineAsyncComponent(
        () =>
          import(
            './ps-core-prd-func/ps-core-prd-func-market-application-view/ps-core-prd-func-market-application-view.vue'
          ),
      );
    case 'master_list_quicktoolbar':
      return defineAsyncComponent(
        () =>
          import(
            './master/master-list-quicktoolbar/master-list-quicktoolbar.vue'
          ),
      );
    case 'master_editor_code':
      return defineAsyncComponent(
        () => import('./master/master-editor-code/master-editor-code.vue'),
      );
    case 'region_data_view_exp_view':
      return defineAsyncComponent(
        () =>
          import(
            './region/region-data-view-exp-view/region-data-view-exp-view.vue'
          ),
      );
    case 'master_redirect_view':
      return defineAsyncComponent(
        () => import('./master/master-redirect-view/master-redirect-view.vue'),
      );
    case 'master_form_base':
      return defineAsyncComponent(
        () => import('./master/master-form-base/master-form-base.vue'),
      );
    case 'master_map_exp_view':
      return defineAsyncComponent(
        () => import('./master/master-map-exp-view/master-map-exp-view.vue'),
      );
    case 'master_editor_input_ip':
      return defineAsyncComponent(
        () =>
          import('./master/master-editor-input-ip/master-editor-input-ip.vue'),
      );
    case 'master_kanban_layout':
      return defineAsyncComponent(
        () => import('./master/master-kanban-layout/master-kanban-layout.vue'),
      );
    case 'psdeformdesign_modal':
      return defineAsyncComponent(
        () =>
          import('./psde-form/psdeformdesign-modal/psdeformdesign-modal.vue'),
      );
    case 'master_panel_format':
      return defineAsyncComponent(
        () => import('./master/master-panel-format/master-panel-format.vue'),
      );
    case 'master_list_nav':
      return defineAsyncComponent(
        () => import('./master/master-list-nav/master-list-nav.vue'),
      );
    case 'master_tree_exp_view':
      return defineAsyncComponent(
        () => import('./master/master-tree-exp-view/master-tree-exp-view.vue'),
      );
    case 'master_depickup_view':
      return defineAsyncComponent(
        () => import('./master/master-depickup-view/master-depickup-view.vue'),
      );
    case 'master_ui_logic':
      return defineAsyncComponent(
        () => import('./master/master-ui-logic/master-ui-logic.vue'),
      );
    case 'master_color_picker':
      return defineAsyncComponent(
        () => import('./master/master-color-picker/master-color-picker.vue'),
      );
    case 'master_grid_column_plugin':
      return defineAsyncComponent(
        () =>
          import(
            './master/master-grid-column-plugin/master-grid-column-plugin.vue'
          ),
      );
    case 'region_sedit_view9':
      return defineAsyncComponent(
        () => import('./region/region-sedit-view-9/region-sedit-view-9.vue'),
      );
    case 'master_grid_sort':
      return defineAsyncComponent(
        () => import('./master/master-grid-sort/master-grid-sort.vue'),
      );
    case 'master_ui_action_parameter':
      return defineAsyncComponent(
        () =>
          import(
            './master/master-ui-action-parameter/master-ui-action-parameter.vue'
          ),
      );
    case 'region_info_view':
      return defineAsyncComponent(
        () => import('./region/region-info-view/region-info-view.vue'),
      );
    case 'master_form_detail_plugin':
      return defineAsyncComponent(
        () =>
          import(
            './master/master-form-detail-plugin/master-form-detail-plugin.vue'
          ),
      );
    case 'master_upload_image_upload':
      return defineAsyncComponent(
        () =>
          import(
            './master/master-upload-image-upload/master-upload-image-upload.vue'
          ),
      );
    case 'master_grid_layout':
      return defineAsyncComponent(
        () => import('./master/master-grid-layout/master-grid-layout.vue'),
      );
    case 'master_number_range_picker':
      return defineAsyncComponent(
        () =>
          import(
            './master/master-number-range-picker/master-number-range-picker.vue'
          ),
      );
    case 'master_editor_check_box_list':
      return defineAsyncComponent(
        () =>
          import(
            './master/master-editor-check-box-list/master-editor-check-box-list.vue'
          ),
      );
    case 'master_form':
      return defineAsyncComponent(
        () => import('./master/master-form/master-form.vue'),
      );
    case 'master_chart_stacked_column':
      return defineAsyncComponent(
        () =>
          import(
            './master/master-chart-stacked-column/master-chart-stacked-column.vue'
          ),
      );
    case 'master_list':
      return defineAsyncComponent(
        () => import('./master/master-list/master-list.vue'),
      );
    case 'master_global_plugin':
      return defineAsyncComponent(
        () => import('./master/master-global-plugin/master-global-plugin.vue'),
      );
    case 'region_redirect_view':
      return defineAsyncComponent(
        () => import('./region/region-redirect-view/region-redirect-view.vue'),
      );
    case 'master_editor_list_box':
      return defineAsyncComponent(
        () =>
          import('./master/master-editor-list-box/master-editor-list-box.vue'),
      );
    case 'master_form_value_display':
      return defineAsyncComponent(
        () =>
          import(
            './master/master-form-value-display/master-form-value-display.vue'
          ),
      );
    case 'master_tree_ctrl_federation':
      return defineAsyncComponent(
        () =>
          import(
            './master/master-tree-ctrl-federation/master-tree-ctrl-federation.vue'
          ),
      );
    case 'master_tab_ctrl_federation2':
      return defineAsyncComponent(
        () =>
          import(
            './master/master-tab-ctrl-federation-2/master-tab-ctrl-federation-2.vue'
          ),
      );
    case 'master_chart_line':
      return defineAsyncComponent(
        () => import('./master/master-chart-line/master-chart-line.vue'),
      );
    case 'category_grid_view':
      return defineAsyncComponent(
        () => import('./category/category-grid-view/category-grid-view.vue'),
      );
    case 'master_calendar_view':
      return defineAsyncComponent(
        () => import('./master/master-calendar-view/master-calendar-view.vue'),
      );
    case 'master_form_css':
      return defineAsyncComponent(
        () => import('./master/master-form-css/master-form-css.vue'),
      );
    case 'master_activity_display':
      return defineAsyncComponent(
        () =>
          import(
            './master/master-activity-display/master-activity-display.vue'
          ),
      );
    case 'master_virtualized_list':
      return defineAsyncComponent(
        () =>
          import(
            './master/master-virtualized-list/master-virtualized-list.vue'
          ),
      );
    case 'master_treeview_nav':
      return defineAsyncComponent(
        () => import('./master/master-treeview-nav/master-treeview-nav.vue'),
      );
    // case 'master_grid_view':
    //   return defineAsyncComponent(
    //     () => import('./master/master-grid-view/master-grid-view.vue'),
    //   );
    case 'admin_index':
      return defineAsyncComponent(
        () => import('./admin-index/admin-index.vue'),
      );
    case 'category_edit_view':
      return defineAsyncComponent(
        () => import('./category/category-edit-view/category-edit-view.vue'),
      );
    case 'master_calendar_toolbar':
      return defineAsyncComponent(
        () =>
          import(
            './master/master-calendar-toolbar/master-calendar-toolbar.vue'
          ),
      );
    case 'master_chart_regional':
      return defineAsyncComponent(
        () =>
          import('./master/master-chart-regional/master-chart-regional.vue'),
      );
    case 'master_wizard_base':
      return defineAsyncComponent(
        () => import('./master/master-wizard-base/master-wizard-base.vue'),
      );
    case 'master_counter':
      return defineAsyncComponent(
        () => import('./master/master-counter/master-counter.vue'),
      );
    default:
      throw new Error(`无法找到视图模型：${name}`);
  }
}
