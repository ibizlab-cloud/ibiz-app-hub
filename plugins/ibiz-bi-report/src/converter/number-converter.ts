import { BaseConverter } from './base-converter';

export class NumberConverter extends BaseConverter {
  /**
   * 数据翻译为模型 todo
   *
   * @param {(IData | undefined)} data
   * @param {IModel} model
   * @param {IData} [opts={}]
   * @return {*}  {(Promise<IModel | undefined>)}
   * @memberof NumberConverter
   */
  async translateDataToModel(
    _data: IData | undefined,
    _model: IModel,
    _opts: IData = {},
  ): Promise<IModel | undefined> {
    return _model;
  }
}
