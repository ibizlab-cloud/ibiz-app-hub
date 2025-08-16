import { IAppBICubeHierarchy } from './iapp-bicube-hierarchy';
import { IModelObject } from '../../imodel-object';

/**
 *
 * 应用智能立方体维度模型对象接口
 * @export
 * @interface IAppBICubeDimension
 */
export interface IAppBICubeDimension extends IModelObject {
  /**
   * 代码标识
   * @type {string}
   * 来源  getCodeName
   */
  codeName?: string;

  /**
   * 维度公式
   * @type {string}
   * 来源  getDimensionFormula
   */
  dimensionFormula?: string;

  /**
   * 维度标记
   * @type {string}
   * 来源  getDimensionTag
   */
  dimensionTag?: string;

  /**
   * 维度标记2
   * @type {string}
   * 来源  getDimensionTag2
   */
  dimensionTag2?: string;

  /**
   * 维度类型
   * @description 值模式 [多维分析维度类别] {COMMON：常规、 CALCULATED：动态计算 }
   * @type {( string | 'COMMON' | 'CALCULATED')}
   * 来源  getDimensionType
   */
  dimensionType?: string | 'COMMON' | 'CALCULATED';

  /**
   * 智能立方体维度体系集合
   *
   * @type {IAppBICubeHierarchy[]}
   * 来源  getPSAppBICubeHierarchies
   */
  appBICubeHierarchies?: IAppBICubeHierarchy[];

  /**
   * 应用代码表对象
   *
   * @type {string}
   * 来源  getPSAppCodeList
   */
  appCodeListId?: string;

  /**
   * 相关应用属性
   *
   * @type {string}
   * 来源  getPSAppDEField
   */
  appDEFieldId?: string;

  /**
   * 参数配置界面行为对象
   *
   * @type {string}
   * 来源  getParamPSAppDEUIAction
   */
  paramAppDEUIActionId?: string;

  /**
   * 标准数据类型
   * @description 值模式 [标准数据类型] {0：UNKNOWN、 1：BIGINT、 2：BINARY、 3：BIT、 4：CHAR、 5：DATETIME、 6：DECIMAL、 7：FLOAT、 8：IMAGE、 9：INT、 10：MONEY、 11：NCHAR、 12：NTEXT、 13：NVARCHAR、 14：NUMERIC、 15：REAL、 16：SMALLDATETIME、 17：SMALLINT、 18：SMALLMONEY、 19：SQL_VARIANT、 20：SYSNAME、 21：TEXT、 22：TIMESTAMP、 23：TINYINT、 24：VARBINARY、 25：VARCHAR、 26：UNIQUEIDENTIFIER、 27：DATE、 28：TIME、 29：BIGDECIMAL }
   * @type {( number | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29)}
   * @default 0
   * 来源  getStdDataType
   */
  stdDataType?:
    | number
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 17
    | 18
    | 19
    | 20
    | 21
    | 22
    | 23
    | 24
    | 25
    | 26
    | 27
    | 28
    | 29;

  /**
   * 文本应用属性
   *
   * @type {string}
   * 来源  getTextPSAppDEField
   */
  textAppDEFieldId?: string;

  /**
   * 文本绘制模板
   * @type {string}
   * 来源  getTextTemplate
   */
  textTemplate?: string;

  /**
   * 提示绘制模板
   * @type {string}
   * 来源  getTipTemplate
   */
  tipTemplate?: string;
}
