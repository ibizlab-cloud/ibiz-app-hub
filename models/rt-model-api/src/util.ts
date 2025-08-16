// 预定义界面行为映射关系
const sysUIActionMapping: Map<string, string> = new Map([
  ['app_login', 'login'],
  ['app_logout', 'logout'],
  ['app_relogin', 'relogin'],
  ['data_cancelchanges', 'cancelchanges'],
  ['data_createobject', 'createobject'],
  ['data_removeobject', 'removeobject'],
  ['data_savechanges', 'savechanges'],
  ['data_synchronize', 'synchronize'],
  ['editview_copyaction', 'copy'],
  ['editview_exitaction', 'exit'],
  ['editview_firstrecordaction', 'firstrecord'],
  ['editview_helpaction', 'help'],
  ['editview_lastrecordaction', 'lastrecord'],
  ['editview_newaction', 'new'],
  ['editview_nextrecordaction', 'nextrecord'],
  ['editview_prevrecordaction', 'prevrecord'],
  ['editview_printaction', 'print'],
  ['editview_refreshaction', 'refresh'],
  ['editview_removeandexitaction', 'removeandexit'],
  ['editview_rollbackwfaction', 'rollbackwf'],
  ['editview_saveaction', 'save'],
  ['editview_saveandexitaction', 'saveandexit'],
  ['editview_saveandnewaction', 'saveandnew'],
  ['editview_saveandstartwfaction', 'saveandstart'],
  ['editview_viewwfstepactoraction', 'viewwfstep'],
  ['gridview_copyaction', 'copy'],
  ['gridview_editaction', 'edit'],
  ['gridview_exportaction', 'exportexcel'],
  ['gridview_exportxmlaction', 'exportmodel'],
  ['gridview_helpaction', 'help'],
  ['gridview_importbar', 'import'],
  ['gridview_newaction', 'new'],
  ['gridview_newrowaction', 'newrow'],
  ['gridview_printaction', 'print'],
  ['gridview_refreshaction', 'refresh'],
  ['gridview_removeaction', 'remove'],
  ['gridview_roweditaction', 'togglerowedit'],
  ['gridview_saverowaction', 'saverow'],
  ['gridview_searchbar', 'togglefilter'],
  ['gridview_viewaction', 'view'],
  ['treeview_refreshallaction', 'refreshall'],
  ['treeview_refreshparentaction', 'refreshparent'],
  ['util_addall', 'addall'],
  ['util_addselection', 'addselection'],
  ['util_bottomnavzone', 'togglebottomnavzone'],
  ['util_collapse', 'collapse'],
  ['util_collapseall', 'collapseall'],
  ['util_expand', 'expand'],
  ['util_expandall', 'expandall'],
  ['util_finish', 'finish'],
  ['util_nextstep', 'nextstep'],
  ['util_prevstep', 'prevstep'],
  ['util_removeall', 'removeall'],
  ['util_removeselection', 'removeselection'],
  ['util_reset', 'reset'],
  ['util_rightnavzone', 'togglerightnavzone'],
  ['util_search', 'search'],
  ['view_cancelaction', 'cancel'],
  ['view_noaction', 'no'],
  ['view_okaction', 'ok'],
  ['view_useraction', 'useraction'],
  ['view_useraction2', 'useraction2'],
  ['view_useraction3', 'useraction3'],
  ['view_useraction4', 'useraction4'],
  ['view_useraction5', 'useraction5'],
  ['view_useraction6', 'useraction6'],
  ['view_yesaction', 'yes'],
]);

/**
 * 递归修改模型所归属的应用
 *
 * @author chitanda
 * @date 2023-12-06 17:12:33
 * @export
 * @param {string} appId
 * @param {(IModel | IModel[])} model
 */
export function deepUpdateAppId(appId: string, model: IModel | IModel[]): void {
  if (typeof model !== 'object') {
    return;
  }
  if (Array.isArray(model)) {
    model.forEach(item => {
      deepUpdateAppId(appId, item);
    });
  } else {
    model.appId = appId;
    const keys = Object.keys(model);
    keys.forEach(key => {
      const val = model[key];
      deepUpdateAppId(appId, val);
    });
  }
}

/**
 * 计算给入模型唯一标识
 *
 * @author chitanda
 * @date 2023-04-16 18:04:15
 * @export
 * @param {*} m
 * @return {*}  {(string | null)}
 */
export function calcModelId(m: any): string | null {
  if (!m) {
    return null;
  }
  const id = m.path || m.dynaModelFilePath || m.id || m.codeName || m.name;
  if (!id) {
    // 插件的转 id 特殊处理
    return m.pluginCode;
  }
  // 预定义界面行为特殊处理，使用predefinedType
  if (m.uIActionMode && m.uIActionMode == 'SYS' && m.predefinedType) {
    if (sysUIActionMapping.has(m.predefinedType.toLowerCase())) {
      const sysActionTag = sysUIActionMapping.get(
        m.predefinedType.toLowerCase(),
      );
      if (sysActionTag && sysActionTag === id.toLowerCase()) {
        return m.predefinedType;
      }
    }
  }
  return id;
}

/**
 * 计算模型唯一标识
 *
 * @author tony001
 * @date 2024-06-29 10:06:34
 * @export
 * @param {*} model
 * @param {boolean} [bSimple=false] 简单模式
 * @param {boolean} [ignoreCase=true] 忽略大小写,默认忽略，统一转小写
 * @return {*}  {(string | null)}
 */
export function calcUniqueTag(
  model: any,
  bSimple: boolean = false,
  ignoreCase: boolean = true,
): string | null {
  let strId: string = calcModelId(model);
  if (!strId) {
    return null;
  }
  // 当 id 是 path 时截掉后缀
  if (strId.endsWith('.json')) {
    strId = strId.replace('.json', '');
  }

  if (!strId) {
    return null;
  }

  const ids = strId.split('/');
  if (ids.length > 1) {
    if (bSimple) {
      if (ignoreCase) {
        return ids[ids.length - 1].toLowerCase();
      } else {
        return ids[ids.length - 1];
      }
    }
    let sb = '';
    for (let i = 1; i < ids.length; i++) {
      if (i % 2 == 0) {
        if (i !== ids.length - 1) {
          sb += '.';
        }
      } else {
        sb += ids[i];
      }
    }
    return ignoreCase ? sb.toLowerCase() : sb;
  } else {
    return ignoreCase ? strId.toLowerCase() : strId;
  }
}
