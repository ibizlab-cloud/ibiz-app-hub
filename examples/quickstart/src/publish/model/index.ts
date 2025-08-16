import { CodeListService } from '@ibiz-template/runtime';
import {
  IAppCodeList,
  IAppDataEntity,
  IApplication,
  IAppView,
} from '@ibiz/model-core';

export async function registerCodeList(
  codeListService: CodeListService,
): Promise<void> {
  const setCodeList = (model: IData) => {
    codeListService.setCodeList(model as IAppCodeList);
  };
  setCodeList(await import('./code-list/code-list-46').then(m => m.default));
  setCodeList(await import('./code-list/code-list-81').then(m => m.default));
  setCodeList(await import('./code-list/code-list-82').then(m => m.default));
  setCodeList(await import('./code-list/code-list-83').then(m => m.default));
  setCodeList(await import('./code-list/code-list-85').then(m => m.default));
  setCodeList(await import('./code-list/sys-operator').then(m => m.default));
  setCodeList(await import('./code-list/yes-no').then(m => m.default));
  setCodeList(
    await import('./code-list/mock-cl-categories').then(m => m.default),
  );
  setCodeList(await import('./code-list/mock-cl-region').then(m => m.default));
  setCodeList(await import('./code-list/mock-cl-sample').then(m => m.default));
  setCodeList(await import('./code-list/mock-cl-status').then(m => m.default));
}

export async function getAppDataEntityModel(
  name: string,
): Promise<IAppDataEntity> {
  const _name = name.toLowerCase();
  switch (_name) {
    case 'web.detail':
    case 'detail':
      return import('./entities/detail').then(
        m => m.default as unknown as IAppDataEntity,
      );
    case 'web.attachment':
    case 'attachment':
      return import('./entities/attachment').then(
        m => m.default as unknown as IAppDataEntity,
      );
    case 'web.pscoreprdfunc':
    case 'pscoreprdfunc':
      return import('./entities/ps-core-prd-func').then(
        m => m.default as unknown as IAppDataEntity,
      );
    case 'web.activity':
    case 'activity':
      return import('./entities/activity').then(
        m => m.default as unknown as IAppDataEntity,
      );
    case 'web.comment':
    case 'comment':
      return import('./entities/comment').then(
        m => m.default as unknown as IAppDataEntity,
      );
    case 'web.region':
    case 'region':
      return import('./entities/region').then(
        m => m.default as unknown as IAppDataEntity,
      );
    case 'web.psdeform':
    case 'psdeform':
      return import('./entities/psde-form').then(
        m => m.default as unknown as IAppDataEntity,
      );
    case 'web.master':
    case 'master':
      return import('./entities/master').then(
        m => m.default as unknown as IAppDataEntity,
      );
    case 'web.about':
    case 'about':
      return import('./entities/about').then(
        m => m.default as unknown as IAppDataEntity,
      );
    case 'web.category':
    case 'category':
      return import('./entities/category').then(
        m => m.default as unknown as IAppDataEntity,
      );
    case 'web.detail':
    case 'detail':
      return import('./entities/detail').then(
        m => m.default as unknown as IAppDataEntity,
      );
    case 'web.dyna_dashboard':
    case 'dyna_dashboard':
      return import('./entities/dyna-dashboard').then(
        m => m.default as unknown as IAppDataEntity,
      );
    default:
      throw new Error(`无法找到实体模型：${name}`);
  }
}
export async function getAppViewModel(name: string): Promise<IAppView> {
  const _name = name.toLowerCase();
  switch (_name) {
    case 'top_menu':
      return import('./views/top-menu').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_list_view':
      return import('./views/master-list-view').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_logic_plugin':
      return import('./views/master-logic-plugin').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_editor_date_range':
      return import('./views/master-editor-date-range').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_searchform_advanced':
      return import('./views/master-searchform-advanced').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_toolbar_base':
      return import('./views/master-toolbar-base').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_theme_plugin':
      return import('./views/master-theme-plugin').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_editor_spanlink':
      return import('./views/master-editor-spanlink').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_panel_base':
      return import('./views/master-panel-base').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_counter_dr':
      return import('./views/master-counter-dr').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_counter_exp_grid':
      return import('./views/master-counter-exp-grid').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_card_base':
      return import('./views/master-card-base').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_chart_map':
      return import('./views/master-chart-map').then(
        m => m.default as unknown as IAppView,
      );
    case 'region_medit_view9':
      return import('./views/region-medit-view-9').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_ui_plugin':
      return import('./views/master-ui-plugin').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_calendar_exp_view':
      return import('./views/master-calendar-exp-view').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_editor_markdown':
      return import('./views/master-editor-markdown').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_form_logic':
      return import('./views/master-form-logic').then(
        m => m.default as unknown as IAppView,
      );
    case 'region_card_nav':
      return import('./views/region-card-nav').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_tab_ctrl_federation':
      return import('./views/master-tab-ctrl-federation').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_list_cssandicon':
      return import('./views/master-list-cssandicon').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_editor_plugin':
      return import('./views/master-editor-plugin').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_view_message':
      return import('./views/master-view-message').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_chart_base':
      return import('./views/master-chart-base').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_editor_input':
      return import('./views/master-editor-input').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_edit_view':
      return import('./views/master-edit-view').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_editor_dropdown_list':
      return import('./views/master-editor-dropdown-list').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_calendar_layout':
      return import('./views/master-calendar-layout').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_editor_switch':
      return import('./views/master-editor-switch').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_list_panellogic':
      return import('./views/master-list-panellogic').then(
        m => m.default as unknown as IAppView,
      );
    case 'ps_core_prd_func_tree_exp_view':
      return import('./views/ps-core-prd-func-tree-exp-view').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_data_picker_embed_view':
      return import('./views/master-data-picker-embed-view').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_option_view':
      return import('./views/master-option-view').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_form_mctrl':
      return import('./views/master-form-mctrl').then(
        m => m.default as unknown as IAppView,
      );
    case 'region_grid_nav':
      return import('./views/region-grid-nav').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_tree_contextmenu':
      return import('./views/master-tree-contextmenu').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_panel':
      return import('./views/master-panel').then(
        m => m.default as unknown as IAppView,
      );
    case 'region_detail_grid_view':
      return import('./views/region-detail-grid-view').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_ui_action_logic':
      return import('./views/master-ui-action-logic').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_data_view':
      return import('./views/master-data-view').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_form_hover':
      return import('./views/master-form-hover').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_grid_view':
      return import('./views/master-grid-view').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_de_action_plugin':
      return import('./views/master-de-action-plugin').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_upload_image_preview':
      return import('./views/master-upload-image-preview').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_kanban_view':
      return import('./views/master-kanban-view').then(
        m => m.default as unknown as IAppView,
      );
    case 'region_edit_view':
      return import('./views/region-edit-view').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_grid_value_display':
      return import('./views/master-grid-value-display').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_ui_action':
      return import('./views/master-ui-action').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_wizard':
      return import('./views/master-wizard').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_tab_exp_view':
      return import('./views/master-tab-exp-view').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_data_picker_link':
      return import('./views/master-data-picker-link').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_dropdown_emoji':
      return import('./views/master-dropdown-emoji').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_report_view':
      return import('./views/master-report-view').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_tree_drag':
      return import('./views/master-tree-drag').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_chart_candlestick':
      return import('./views/master-chart-candlestick').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_chart_instrument':
      return import('./views/master-chart-instrument').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_toolbar':
      return import('./views/master-toolbar').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_searchbar':
      return import('./views/master-searchbar').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_editor_date_picker':
      return import('./views/master-editor-date-picker').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_view_open_mode':
      return import('./views/master-view-open-mode').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_list_logic':
      return import('./views/master-list-logic').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_editor_date_range_select':
      return import('./views/master-editor-date-range-select').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_grid_data_picker_link':
      return import('./views/master-grid-data-picker-link').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_counter_plugin':
      return import('./views/master-counter-plugin').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_data_picker_select_view':
      return import('./views/master-data-picker-select-view').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_grid_view_read':
      return import('./views/master-grid-view-read').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_calendar':
      return import('./views/master-calendar').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_calendar_base':
      return import('./views/master-calendar-base').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_pickup_grid_view':
      return import('./views/master-pickup-grid-view').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_kanban_style':
      return import('./views/master-kanban-style').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_toolbar_style':
      return import('./views/master-toolbar-style').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_counter_exp_form':
      return import('./views/master-counter-exp-form').then(
        m => m.default as unknown as IAppView,
      );
    case 'category_option_view':
      return import('./views/category-option-view').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_grid_edit':
      return import('./views/master-grid-edit').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_list_layout':
      return import('./views/master-list-layout').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_searchform_auto':
      return import('./views/master-searchform-auto').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_editor_html':
      return import('./views/master-editor-html').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_pivottable':
      return import('./views/master-pivottable').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_editor_raw':
      return import('./views/master-editor-raw').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_ac_item_plugin':
      return import('./views/master-ac-item-plugin').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_list_base':
      return import('./views/master-list-base').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_chart_view':
      return import('./views/master-chart-view').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_open_mode':
      return import('./views/master-open-mode').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_wizard_view':
      return import('./views/master-wizard-view').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_editor_slider':
      return import('./views/master-editor-slider').then(
        m => m.default as unknown as IAppView,
      );
    case 'ps_core_prd_func_redirect_view':
      return import('./views/ps-core-prd-func-redirect-view').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_list_format':
      return import('./views/master-list-format').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_chart_bar':
      return import('./views/master-chart-bar').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_editor_input_number':
      return import('./views/master-editor-input-number').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_map_built_in_nav':
      return import('./views/master-map-built-in-nav').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_tree_search':
      return import('./views/master-tree-search').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_actions_federation':
      return import('./views/master-actions-federation').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_card_kanbanview':
      return import('./views/master-card-kanbanview').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_layout_view':
      return import('./views/master-layout-view').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_editor_array':
      return import('./views/master-editor-array').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_card_panellogic':
      return import('./views/master-card-panellogic').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_view_message_kind':
      return import('./views/master-view-message-kind').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_grid_filter':
      return import('./views/master-grid-filter').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_chart_exp_view2':
      return import('./views/master-chart-exp-view-2').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_grid_css':
      return import('./views/master-grid-css').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_panel_cssandicon':
      return import('./views/master-panel-cssandicon').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_tree_picker':
      return import('./views/master-tree-picker').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_chart':
      return import('./views/master-chart').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_tab_nav':
      return import('./views/master-tab-nav').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_grid_span':
      return import('./views/master-grid-span').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_runtime_components':
      return import('./views/master-runtime-components').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_card_cssandicon':
      return import('./views/master-card-cssandicon').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_editor_rate':
      return import('./views/master-editor-rate').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_calendar_logic':
      return import('./views/master-calendar-logic').then(
        m => m.default as unknown as IAppView,
      );
    case 'ps_core_prd_func_edit_view':
      return import('./views/ps-core-prd-func-edit-view').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_ui_action_base':
      return import('./views/master-ui-action-base').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_gantt_view':
      return import('./views/master-gantt-view').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_logic_base':
      return import('./views/master-logic-base').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_counter_tree':
      return import('./views/master-counter-tree').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_form_defiupdate':
      return import('./views/master-form-defiupdate').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_modal_edit_view':
      return import('./views/master-modal-edit-view').then(
        m => m.default as unknown as IAppView,
      );
    case 'region_grid_exp_view':
      return import('./views/region-grid-exp-view').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_chart_pie':
      return import('./views/master-chart-pie').then(
        m => m.default as unknown as IAppView,
      );
    case 'region_edit_view2':
      return import('./views/region-edit-view-2').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_panel_logic':
      return import('./views/master-panel-logic').then(
        m => m.default as unknown as IAppView,
      );
    case 'region_m_pickup_view':
      return import('./views/region-m-pickup-view').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_chart_radar':
      return import('./views/master-chart-radar').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_view_message_close_mode':
      return import('./views/master-view-message-close-mode').then(
        m => m.default as unknown as IAppView,
      );
    case 'ps_core_prd_func_installed_grid_view':
      return import('./views/ps-core-prd-func-installed-grid-view').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_tree_grid_ex_view':
      return import('./views/master-tree-grid-ex-view').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_doing_custom_view':
      return import('./views/master-doing-custom-view').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_grid_built_in_nav':
      return import('./views/master-grid-built-in-nav').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_data_transfer_picker':
      return import('./views/master-data-transfer-picker').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_searchform_btncss':
      return import('./views/master-searchform-btncss').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_map_user':
      return import('./views/master-map-user').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_counter_form_group':
      return import('./views/master-counter-form-group').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_counter_tab_exp':
      return import('./views/master-counter-tab-exp').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_editor_span':
      return import('./views/master-editor-span').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_grid':
      return import('./views/master-grid').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_action_plugin':
      return import('./views/master-action-plugin').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_treeview':
      return import('./views/master-treeview').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_editor_autocomplete':
      return import('./views/master-editor-autocomplete').then(
        m => m.default as unknown as IAppView,
      );
    case 'region_grid_view':
      return import('./views/region-grid-view').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_toolbar_item_plugin':
      return import('./views/master-toolbar-item-plugin').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_chart_multiple_sequences':
      return import('./views/master-chart-multiple-sequences').then(
        m => m.default as unknown as IAppView,
      );
    case 'region_edit_view_tab_exp':
      return import('./views/region-edit-view-tab-exp').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_grid_group':
      return import('./views/master-grid-group').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_editor_data_picker':
      return import('./views/master-editor-data-picker').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_upload_image_cropping':
      return import('./views/master-upload-image-cropping').then(
        m => m.default as unknown as IAppView,
      );
    case 'comment_list_view':
      return import('./views/comment-list-view').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_map_view':
      return import('./views/master-map-view').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_treeview_cssandicon':
      return import('./views/master-treeview-cssandicon').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_comment_display':
      return import('./views/master-comment-display').then(
        m => m.default as unknown as IAppView,
      );
    case 'region_sedit_view':
      return import('./views/region-sedit-view').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_editor_check_box':
      return import('./views/master-editor-check-box').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_card_group':
      return import('./views/master-card-group').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_portlet_plugin':
      return import('./views/master-portlet-plugin').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_editor_radio_list':
      return import('./views/master-editor-radio-list').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_ui_action_cssandicon':
      return import('./views/master-ui-action-cssandicon').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_data':
      return import('./views/master-data').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_toolbar_group':
      return import('./views/master-toolbar-group').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_data_picker_dropdown':
      return import('./views/master-data-picker-dropdown').then(
        m => m.default as unknown as IAppView,
      );
    case 'region_edit_view9':
      return import('./views/region-edit-view-9').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_chart_groupbar':
      return import('./views/master-chart-groupbar').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_layout':
      return import('./views/master-layout').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_grid_logic':
      return import('./views/master-grid-logic').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_wizard_view_logic':
      return import('./views/master-wizard-view-logic').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_map_base':
      return import('./views/master-map-base').then(
        m => m.default as unknown as IAppView,
      );
    case 'region_tree_grid_view':
      return import('./views/region-tree-grid-view').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_grid_action_column':
      return import('./views/master-grid-action-column').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_info_view':
      return import('./views/master-info-view').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_grid_aggregation':
      return import('./views/master-grid-aggregation').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_grid_toolbar':
      return import('./views/master-grid-toolbar').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_chart_funnel_plot':
      return import('./views/master-chart-funnel-plot').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_calendar_style_icon':
      return import('./views/master-calendar-style-icon').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_async_activity':
      return import('./views/master-async-activity').then(
        m => m.default as unknown as IAppView,
      );
    case 'region_pickup_grid_view':
      return import('./views/region-pickup-grid-view').then(
        m => m.default as unknown as IAppView,
      );
    case 'region_edit_view3':
      return import('./views/region-edit-view-3').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_edit_view':
      return import('./views/master-edit-view').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_form_info':
      return import('./views/master-form-info').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_chart_scatter':
      return import('./views/master-chart-scatter').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_form_layout':
      return import('./views/master-form-layout').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_upload_file_upload':
      return import('./views/master-upload-file-upload').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_searchbar_base':
      return import('./views/master-searchbar-base').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_data_mpicker':
      return import('./views/master-data-mpicker').then(
        m => m.default as unknown as IAppView,
      );
    case 'region_edit_view4':
      return import('./views/region-edit-view-4').then(
        m => m.default as unknown as IAppView,
      );
    case 'region_pickup_view':
      return import('./views/region-pickup-view').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_wizard_view_style':
      return import('./views/master-wizard-view-style').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_grid_base':
      return import('./views/master-grid-base').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_chart_annular':
      return import('./views/master-chart-annular').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_tree_base':
      return import('./views/master-tree-base').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_treeview_navparams':
      return import('./views/master-treeview-navparams').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_control_plugin':
      return import('./views/master-control-plugin').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_searchform_filter':
      return import('./views/master-searchform-filter').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_map_picker':
      return import('./views/master-map-picker').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_editor_cascader':
      return import('./views/master-editor-cascader').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_list_batchtoolbar':
      return import('./views/master-list-batchtoolbar').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_ui_logic_plugin':
      return import('./views/master-ui-logic-plugin').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_data_view_exp_view':
      return import('./views/master-data-view-exp-view').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_searchform_layout':
      return import('./views/master-searchform-layout').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_panel_item_plugin':
      return import('./views/master-panel-item-plugin').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_search_form':
      return import('./views/master-search-form').then(
        m => m.default as unknown as IAppView,
      );
    case 'about':
      return import('./views/about').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_html_view':
      return import('./views/master-html-view').then(
        m => m.default as unknown as IAppView,
      );
    case 'activity_history_list_view':
      return import('./views/activity-history-list-view').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_tree_datasource':
      return import('./views/master-tree-datasource').then(
        m => m.default as unknown as IAppView,
      );
    case 'welcome':
      return import('./views/welcome').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_view_plugin':
      return import('./views/master-view-plugin').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_claendar_group':
      return import('./views/master-claendar-group').then(
        m => m.default as unknown as IAppView,
      );
    case 'region_list_exp_view':
      return import('./views/region-list-exp-view').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_kanban_base':
      return import('./views/master-kanban-base').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_card_logic':
      return import('./views/master-card-logic').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_map':
      return import('./views/master-map').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_editor_stepper':
      return import('./views/master-editor-stepper').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_calendar_multiple_data':
      return import('./views/master-calendar-multiple-data').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_card_format':
      return import('./views/master-card-format').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_card_layout':
      return import('./views/master-card-layout').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_list_group':
      return import('./views/master-list-group').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_tree_exp':
      return import('./views/master-tree-exp').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_calendar_nav':
      return import('./views/master-calendar-nav').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_gantt_exp_view':
      return import('./views/master-gantt-exp-view').then(
        m => m.default as unknown as IAppView,
      );
    case 'region_view_message_position':
      return import('./views/region-view-message-position').then(
        m => m.default as unknown as IAppView,
      );
    case 'category_category_mgr':
      return import('./views/category-category-mgr').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_panel_event':
      return import('./views/master-panel-event').then(
        m => m.default as unknown as IAppView,
      );
    case 'ps_core_prd_func_market_application_view':
      return import('./views/ps-core-prd-func-market-application-view').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_list_quicktoolbar':
      return import('./views/master-list-quicktoolbar').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_editor_code':
      return import('./views/master-editor-code').then(
        m => m.default as unknown as IAppView,
      );
    case 'region_data_view_exp_view':
      return import('./views/region-data-view-exp-view').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_redirect_view':
      return import('./views/master-redirect-view').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_form_base':
      return import('./views/master-form-base').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_map_exp_view':
      return import('./views/master-map-exp-view').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_editor_input_ip':
      return import('./views/master-editor-input-ip').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_kanban_layout':
      return import('./views/master-kanban-layout').then(
        m => m.default as unknown as IAppView,
      );
    case 'psdeformdesign_modal':
      return import('./views/psdeformdesign-modal').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_panel_format':
      return import('./views/master-panel-format').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_list_nav':
      return import('./views/master-list-nav').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_tree_exp_view':
      return import('./views/master-tree-exp-view').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_depickup_view':
      return import('./views/master-depickup-view').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_ui_logic':
      return import('./views/master-ui-logic').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_color_picker':
      return import('./views/master-color-picker').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_grid_column_plugin':
      return import('./views/master-grid-column-plugin').then(
        m => m.default as unknown as IAppView,
      );
    case 'region_sedit_view9':
      return import('./views/region-sedit-view-9').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_grid_sort':
      return import('./views/master-grid-sort').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_ui_action_parameter':
      return import('./views/master-ui-action-parameter').then(
        m => m.default as unknown as IAppView,
      );
    case 'region_info_view':
      return import('./views/region-info-view').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_form_detail_plugin':
      return import('./views/master-form-detail-plugin').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_upload_image_upload':
      return import('./views/master-upload-image-upload').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_grid_layout':
      return import('./views/master-grid-layout').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_number_range_picker':
      return import('./views/master-number-range-picker').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_editor_check_box_list':
      return import('./views/master-editor-check-box-list').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_form':
      return import('./views/master-form').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_chart_stacked_column':
      return import('./views/master-chart-stacked-column').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_list':
      return import('./views/master-list').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_global_plugin':
      return import('./views/master-global-plugin').then(
        m => m.default as unknown as IAppView,
      );
    case 'region_redirect_view':
      return import('./views/region-redirect-view').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_editor_list_box':
      return import('./views/master-editor-list-box').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_form_value_display':
      return import('./views/master-form-value-display').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_tree_ctrl_federation':
      return import('./views/master-tree-ctrl-federation').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_tab_ctrl_federation2':
      return import('./views/master-tab-ctrl-federation-2').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_chart_line':
      return import('./views/master-chart-line').then(
        m => m.default as unknown as IAppView,
      );
    case 'category_grid_view':
      return import('./views/category-grid-view').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_calendar_view':
      return import('./views/master-calendar-view').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_form_css':
      return import('./views/master-form-css').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_activity_display':
      return import('./views/master-activity-display').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_virtualized_list':
      return import('./views/master-virtualized-list').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_treeview_nav':
      return import('./views/master-treeview-nav').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_grid_view':
      return import('./views/master-grid-view').then(
        m => m.default as unknown as IAppView,
      );
    case 'admin_index':
      return import('./views/admin-index').then(
        m => m.default as unknown as IAppView,
      );
    case 'category_edit_view':
      return import('./views/category-edit-view').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_calendar_toolbar':
      return import('./views/master-calendar-toolbar').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_chart_regional':
      return import('./views/master-chart-regional').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_wizard_base':
      return import('./views/master-wizard-base').then(
        m => m.default as unknown as IAppView,
      );
    case 'master_counter':
      return import('./views/master-counter').then(
        m => m.default as unknown as IAppView,
      );
    default:
      throw new Error(`无法找到视图模型：${name}`);
  }
}

export async function getAppModel(): Promise<IApplication> {
  ibiz.hub.defaultAppIndexViewName = 'admin_index';
  return import('./app/app').then(m => {
    const app = m.default as IData;
    app.appUtils?.forEach((util: IData) => {
      util.appId = app.appId;
    });
    // app.appId = undefined;
    return app as IApplication;
  });
}
