/* eslint-disable no-prototype-builtins */
import { ModelError, RuntimeModelError } from '@ibiz-template/core';
import { IDELogicLinkSingleCond } from '@ibiz/model-core';
import { testCond } from '../../../utils';
import { DELogicContext } from '../../de-logic-context';
import { DELogicLinkCond } from '../de-logic-link-cond/de-logic-link-cond';

/**
 * 界面逻辑连接条件项
 *
 * @author lxm
 * @date 2023-02-10 15:02:34
 * @export
 * @class DELogicLinkSingleCond
 * @extends {DELogicLinkCond}
 */
export class DELogicLinkSingleCond extends DELogicLinkCond {
  /**
   * 源参数
   *
   * @author lxm
   * @date 2023-02-15 18:02:51
   * @type {string}
   */
  readonly srcParam?: string;

  /**
   * 目标参数
   *
   * @author lxm
   * @date 2023-02-15 18:02:36
   * @type {string}
   */
  readonly dstParam: string;

  get dstField(): string {
    return this.model.dstFieldName!.toLowerCase();
  }

  get op(): string {
    return this.model.condOP!;
  }

  /**
   * 条件值类型
   * @author lxm
   * @date 2023-06-14 03:35:39
   * @readonly
   */
  get type(): string | undefined {
    return this.model.paramType;
  }

  /**
   * 条件值
   * @author lxm
   * @date 2023-06-14 03:36:45
   * @readonly
   */
  get value(): string | undefined {
    return this.model.paramValue;
  }

  constructor(public model: IDELogicLinkSingleCond) {
    super();
    this.srcParam = model.srcLogicParamId;
    this.dstParam = model.dstLogicParamId!;
  }

  /**
   * 执行逻辑检测
   *
   * @author lxm
   * @date 2023-02-15 18:02:05
   * @param {DELogicContext} ctx
   * @param {IContext} context
   * @param {IData} data
   * @return {*}  {boolean}
   */
  test(ctx: DELogicContext, context: IContext, data: IData): boolean {
    const dst = ctx.params[this.dstParam];
    let result;
    let compareValue;
    if (this.op === 'CONTAINS') {
      const dstObj: unknown = dst;
      if (dstObj && typeof dstObj === 'object' && this.dstField) {
        result = dstObj.hasOwnProperty(this.dstField);
      } else {
        result = false;
      }
      ibiz.log.debug(
        ibiz.i18n.t(
          'runtime.deLogic.deLogicLink.entityLogicalContainsConnection',
          {
            name: this.model.name,
            dstField: this.dstField,
          },
        ),
        dst[this.dstField],
        ibiz.i18n.t('runtime.deLogic.deLogicLink.comparisonCondition', {
          op: this.op,
        }),
        ibiz.i18n.t('runtime.deLogic.deLogicLink.compareResults'),
        result,
      );
      return result;
    }
    switch (this.type) {
      case 'ENTITYFIELD': {
        if (!this.value) {
          throw new RuntimeModelError(
            this.model,
            ibiz.i18n.t('runtime.deLogic.deLogicLink.missingConditionValue'),
          );
        }
        // 数据对象属性
        const value =
          data[this.value] != null ? data[this.value] : context[this.value];
        compareValue = value;
        result = testCond(dst[this.dstField], this.op, value);
        break;
      }
      case 'SRCENTITYFIELD': {
        if (!this.value) {
          throw new RuntimeModelError(
            this.model,
            ibiz.i18n.t(
              'runtime.deLogic.deLogicLink.sourceDataMissingConditionValue',
            ),
          );
        }
        // 源数据对象属性
        const src = ctx.params[this.srcParam!];
        compareValue = src[this.value];
        result = testCond(dst[this.dstField], this.op, src[this.value]);
        break;
      }
      case 'CURTIME': // 当前时间
        throw new ModelError(
          this.model,
          ibiz.i18n.t('runtime.deLogic.deLogicLink.noSupportedTime'),
        );
      default: // 直接使用目标对象参数属性和值做对比
        compareValue = this.value;
        result = testCond(dst[this.dstField], this.op, this.value);
    }
    ibiz.log.debug(
      ibiz.i18n.t('runtime.deLogic.deLogicLink.entityLogicalConnection', {
        name: this.model.name,
        type: this.type,
        dstField: this.dstField,
      }),
      dst[this.dstField],
      ibiz.i18n.t('runtime.deLogic.deLogicLink.comparisonCondition', {
        op: this.op,
      }),
      ibiz.i18n.t('runtime.deLogic.deLogicLink.comparisonValue'),
      compareValue,
      ibiz.i18n.t('runtime.deLogic.deLogicLink.compareResults'),
      result,
    );
    return result;
  }
}
