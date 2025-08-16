import { ignore } from './special-ignored-values';
import { IModelDSLGenEngineContext } from './imodel-dslgen-engine-context';
import { IModelWriter } from './imodel-writer';
import { calcUniqueTag } from './util';

export class ModelWriterBase implements IModelWriter {
  fillDSL(
    iModelDSLGenEngineContext: IModelDSLGenEngineContext,
    src: any,
    dst: any,
  ) {
    return this.onFillDSL(iModelDSLGenEngineContext, src, dst);
  }

  onFillDSL(
    iModelDSLGenEngineContext: IModelDSLGenEngineContext,
    src: any,
    dst: any,
  ) {
    this.w(dst, 'userParam', src, 'getUserParam');
    this.w(dst, 'userTag', src);
    this.w(dst, 'userTag2', src);
    this.w(dst, 'userTag3', src);
    this.w(dst, 'userTag4', src);

    const name: string = src.name;
    if (name) {
      dst.name = name;
    }

    const id: string | null = calcUniqueTag(src);
    if (id) {
      dst.id = id;
    }

    if (src.appId) {
      dst.appId = src.appId;
    }

    if (id === name) {
      delete dst.name;
    }
  }

  fill(dst: object, key: string, value: any): void {
    if (
      value == null ||
      Object.is(value, false) ||
      Object.is(value, '') ||
      Object.is(value, -1) ||
      Object.is(value, 0)
    ) {
      if (ignore.has(key) === false) {
        return;
      }
      if (ignore.is(key, value)) {
        return;
      }
    }

    dst[key] = value;
  }

  fillId(dst: object, key: string, value: any) {
    if (!value) {
      return;
    }

    const id = calcUniqueTag(value);
    this.fill(dst, key, id);
  }

  fillList(dst: object, key: string, value: any) {
    // if(!value && !(value === false)){
    //     return;
    // }

    // dst[key] = value;
    this.fill(dst, key, value);
  }

  fillIdList(dst: object, key: string, value: any) {
    if (!value && !(value === false)) {
      return;
    }

    const ids: string[] = [];
    value.forEach(item => {
      const id = calcUniqueTag(item);
      if (id) {
        ids.push(id);
      }
    });

    this.fillList(dst, key, ids);
  }

  v(dst: object, key: string, value: any): void {
    this.fill(dst, key, value);
  }

  w(dst: object, key: string, model: any, key2?: string, def?: any): void {
    const modelKey = key2 ? key2 : key;
    const value = model[modelKey];
    if (value == null && def != null) {
      this.fill(dst, key, def);
      return;
    }
    this.fill(dst, key, model[modelKey]);
  }

  x(dst: object, key: string, model: any, key2?: string): void {
    if (!model) {
      return;
    }
    const ignoreCaseKeys: string[] = ['appBISchemeId', 'appBICubeId'];
    const m = model[key2 ? key2 : key];
    let id = calcUniqueTag(m);
    if (ignoreCaseKeys.indexOf(key) !== -1) {
      id = calcUniqueTag(m, false, false);
    }
    this.fill(dst, key, id);
  }

  y(dst: object, key: string, model: any, key2?: string): void {
    const m = model[key2 ? key2 : key];
    return this.fillIdList(dst, key, m);
  }

  g(model: any, key: string): any {
    return model[key];
  }
}
