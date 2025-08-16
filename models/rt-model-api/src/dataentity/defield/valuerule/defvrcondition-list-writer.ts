import { ModelListWriterBase } from '../../../model-list-writer-base';
import { IModelDSLGenEngineContext } from '../../../imodel-dslgen-engine-context';

export class DEFVRConditionListWriter extends ModelListWriterBase {
  onFillDSLList(c: IModelDSLGenEngineContext, src: any[], dst: any[]): void {
    const _ = this;
    src.forEach(item => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
    //super.onFillDSLList(context, src, dst)
  }

  onFillDSL(c: IModelDSLGenEngineContext, src: any, dst: any): void {
    switch (src['condType']) {
      case 'GROUP':
        c.fillDSL('dataentity.defield.valuerule.DEFVRGroupCondition', src, dst);
        return;
      case 'QUERYCOUNT':
        c.fillDSL(
          'dataentity.defield.valuerule.DEFVRQueryCountCondition',
          src,
          dst,
        );
        return;
      case 'REGEX':
        c.fillDSL('dataentity.defield.valuerule.DEFVRRegExCondition', src, dst);
        return;
      case 'SIMPLE':
        c.fillDSL(
          'dataentity.defield.valuerule.DEFVRSimpleCondition',
          src,
          dst,
        );
        return;
      case 'STRINGLENGTH':
        c.fillDSL(
          'dataentity.defield.valuerule.DEFVRStringLengthCondition',
          src,
          dst,
        );
        return;
      case 'SYSVALUERULE':
        c.fillDSL(
          'dataentity.defield.valuerule.DEFVRSysValueRuleCondition',
          src,
          dst,
        );
        return;
      case 'VALUERANGE':
        c.fillDSL(
          'dataentity.defield.valuerule.DEFVRValueRangeCondition',
          src,
          dst,
        );
        return;
      case 'VALUERANGE2':
        c.fillDSL(
          'dataentity.defield.valuerule.DEFVRValueRange2Condition',
          src,
          dst,
        );
        return;
      case 'VALUERANGE3':
        c.fillDSL(
          'dataentity.defield.valuerule.DEFVRValueRange3Condition',
          src,
          dst,
        );
        return;
      case 'VALUERECURSION':
        c.fillDSL(
          'dataentity.defield.valuerule.DEFVRValueRecursionCondition',
          src,
          dst,
        );
        return;
    }

    //super.onFillDSL(context, src, dst)
  }
}
