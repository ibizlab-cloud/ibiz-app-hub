import { ModelDSLGenEngine } from './model-dslgen-engine';
import { deepUpdateAppId } from './util';

/**
 * dsl 模型转换辅助
 *
 * @author chitanda
 * @date 2023-04-13 14:04:08
 * @export
 * @class DSLHelper
 */
export class DSLHelper {
  protected engine: ModelDSLGenEngine = new ModelDSLGenEngine();

  /**
   * 换代码表
   *
   * @author chitanda
   * @date 2023-04-13 14:04:13
   * @param {ModelObject} src
   * @param {IModel} [dst={}]
   * @return {*}  {IModel}
   */
  appCodeList(src: ModelObject, dst: IModel = {}): IModel {
    this.engine.fillDSL('app.codelist.AppCodeList', src, dst);
    return dst;
  }

  /**
   * 计数器
   *
   * @author chitanda
   * @date 2023-04-13 17:04:45
   * @param {ModelObject} src
   * @param {IModel} [dst={}]
   * @return {*}  {IModel}
   */
  appCounter(src: ModelObject, dst: IModel = {}): IModel {
    this.engine.fillDSL('app.control.AppCounter', src, dst);
    return dst;
  }

  /**
   * 应用实体
   *
   * @author chitanda
   * @date 2023-04-13 17:04:58
   * @param {ModelObject} src
   * @param {IModel} [dst={}]
   * @return {*}  {IModel}
   */
  appDataEntity(src: ModelObject, dst: IModel = {}): IModel {
    this.engine.fillDSL('app.dataentity.AppDataEntity', src, dst);
    return dst;
  }

  /**
   * 应用实体关系
   *
   * @author chitanda
   * @date 2023-04-17 15:04:59
   * @param {ModelObject} src
   * @param {IModel} [dst={}]
   * @return {*}  {IModel}
   */
  appDERS(src: ModelObject, dst: IModel = {}): IModel {
    const list = this.appDERSs([src]);
    if (list.length > 0) {
      Object.assign(dst, list[0]);
    }
    return dst;
  }

  /**
   * 应用实体关系组
   *
   * @author chitanda
   * @date 2023-04-17 15:04:44
   * @param {ModelObject[]} src
   * @param {IModel[]} [list=[]]
   * @return {*}  {IModel[]}
   */
  appDERSs(src: ModelObject[], list: IModel[] = []): IModel[] {
    this.engine.fillDSLList('app.dataentity.AppDERS[]', src, list);
    return list;
  }

  /**
   * 应用
   *
   * @author chitanda
   * @date 2023-04-13 17:04:07
   * @param {ModelObject} src
   * @param {IModel} [dst={}]
   * @return {*}  {IModel}
   */
  application(src: ModelObject, dst: IModel = {}): IModel {
    this.engine.fillDSL('app.Application', src, dst);
    if (dst.subAppRefs) {
      (dst.subAppRefs as IModel[]).forEach(item => {
        deepUpdateAppId(item.id, item);
      });
    }
    return dst;
  }

  /**
   * 部件
   *
   * @author chitanda
   * @date 2023-04-13 17:04:16
   * @param {ModelObject} src
   * @param {IModel} [dst={}]
   * @return {*}  {IModel}
   */
  control(src: ModelObject, dst: IModel = {}): IModel {
    const list = this.controls([src]);
    if (list.length > 0) {
      Object.assign(dst, list[0]);
    }
    return dst;
  }

  /**
   * 部件组
   *
   * @author chitanda
   * @date 2023-04-13 17:04:24
   * @param {ModelObject[]} src
   * @param {IModel[]} [list=[]]
   * @return {*}  {IModel[]}
   */
  controls(src: ModelObject[], list: IModel[] = []): IModel[] {
    this.engine.fillDSLList('control.Control[]', src, list);
    return list;
  }

  /**
   * 编辑器
   *
   * @author chitanda
   * @date 2023-04-13 17:04:31
   * @param {ModelObject} src
   * @param {IModel} [dst={}]
   * @return {*}  {IModel}
   */
  editor(src: ModelObject, dst: IModel = {}): IModel {
    const list = this.editors([src]);
    if (list.length > 0) {
      Object.assign(dst, list[0]);
    }
    return dst;
  }

  /**
   * 编辑器组
   *
   * @author chitanda
   * @date 2023-04-13 17:04:37
   * @param {ModelObject[]} src
   * @param {IModel[]} [list=[]]
   * @return {*}  {IModel[]}
   */
  editors(src: ModelObject[], list: IModel[] = []): IModel[] {
    this.engine.fillDSLList('control.Editor[]', src, list);
    return list;
  }

  /**
   * 视图
   *
   * @author chitanda
   * @date 2023-04-13 17:04:40
   * @param {ModelObject} src
   * @param {IModel} [dst={}]
   * @return {*}  {IModel}
   */
  appView(src: ModelObject, dst: IModel = {}): IModel {
    const list = this.appViews([src]);
    if (list.length > 0) {
      Object.assign(dst, list[0]);
    }
    return dst;
  }

  /**
   * 视图组
   *
   * @author chitanda
   * @date 2023-04-13 17:04:44
   * @param {ModelObject[]} src
   * @param {IModel[]} [list=[]]
   * @return {*}  {IModel[]}
   */
  appViews(src: ModelObject[], list: IModel[] = []): IModel[] {
    this.engine.fillDSLList('app.view.AppView[]', src, list);
    return list;
  }

  /**
   * UI逻辑
   *
   * @author chitanda
   * @date 2023-04-13 17:04:48
   * @param {ModelObject} src
   * @param {IModel} [dst={}]
   * @return {*}  {IModel}
   */
  appUiLogic(src: ModelObject, dst: IModel = {}): IModel {
    this.engine.fillDSL('app.logic.AppUILogic', src, dst);
    return dst;
  }

  /**
   * UI逻辑组
   *
   * @author chitanda
   * @date 2023-04-13 17:04:58
   * @param {ModelObject[]} src
   * @param {IModel[]} [list=[]]
   * @return {*}  {IModel[]}
   */
  appUiLogics(src: ModelObject[], list: IModel[] = []): IModel[] {
    this.engine.fillDSLList('app.logic.AppUILogic[]', src, list);
    return list;
  }

  /**
   * 插件引用
   *
   * @author tony001
   * @date 2024-11-26 18:11:49
   * @param {ModelObject} src
   * @param {IModel} [dst={}]
   * @return {*}  {IModel}
   */
  appPFPluginRef(src: ModelObject, dst: IModel = {}): IModel {
    this.engine.fillDSL('app.res.AppPFPluginRef', src, dst);
    return dst;
  }

  /**
   * 插件引用集合
   *
   * @author tony001
   * @date 2024-11-26 17:11:46
   * @param {ModelObject[]} src
   * @param {IModel[]} [list=[]]
   * @return {*}  {IModel[]}
   */
  appPFPluginRefs(src: ModelObject[], list: IModel[] = []): IModel[] {
    this.engine.fillDSLList('app.res.AppPFPluginRef[]', src, list);
    return list;
  }

  /**
   * 应用多语言转换
   *
   * @author chitanda
   * @date 2023-08-24 21:08:18
   * @param {ModelObject} src
   * @param {IModel} [dst={}]
   * @return {*}  {IModel}
   */
  appLan(src: ModelObject, dst: IModel = {}): IModel {
    this.engine.fillDSL('app.AppLan', src, dst);
    return dst;
  }

  /**
   * 应用智能报表体系转化
   *
   * @author tony001
   * @date 2024-06-04 14:06:05
   * @param {ModelObject} src
   * @param {IModel} [dst={}]
   * @return {*}  {IModel}
   */
  appBIScheme(src: ModelObject, dst: IModel = {}): IModel {
    this.engine.fillDSL('app.bi.AppBIScheme', src, dst);
    return dst;
  }

  /**
   * 应用智能报表立方体转化
   *
   * @author tony001
   * @date 2024-06-04 16:06:48
   * @param {ModelObject} src
   * @param {IModel} [dst={}]
   * @return {*}  {IModel}
   */
  appBICube(src: ModelObject, dst: IModel = {}): IModel {
    this.engine.fillDSL('app.bi.AppBICube', src, dst);
    return dst;
  }

  /**
   * 应用智能报表转化
   *
   * @author tony001
   * @date 2024-06-04 16:06:44
   * @param {ModelObject} src
   * @param {IModel} [dst={}]
   * @return {*}  {IModel}
   */
  appBIReport(src: ModelObject, dst: IModel = {}): IModel {
    this.engine.fillDSL('app.bi.AppBIReport', src, dst);
    return dst;
  }

  /**
   * 界面行为组转化
   *
   * @author tony001
   * @date 2024-09-09 14:09:59
   * @param {ModelObject} src
   * @param {IModel} [dst={}]
   * @return {*}  {IModel}
   */
  uiActionGroups(src: ModelObject, dst: IModel = {}): IModel {
    this.engine.fillDSL('view.UIActionGroup[]', src, dst);
    return dst;
  }

  /**
   * 子应用引用转化
   *
   * @param {ModelObject} src
   * @param {IModel} [dst={}]
   * @returns {*}  {IModel}
   * @memberof DSLHelper
   */
  subAppRef(src: ModelObject, dst: IModel = {}): IModel {
    this.engine.fillDSL('app.SubAppRef', src, dst);
    return dst;
  }

  /**
   * 子应用引用集合转化
   * @param {ModelObject[]} src
   * @param {IModel[]} [list=[]]
   * @returns {*}  {IModel}
   * @memberof DSLHelper
   */
  subAppRefs(src: ModelObject[], list: IModel[] = []): IModel {
    this.engine.fillDSL('app.SubAppRef[]', src, list);
    return list;
  }
}
