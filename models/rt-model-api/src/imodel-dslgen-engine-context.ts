export interface IModelDSLGenEngineContext {
  // indent :string

  // write(writerCls: string, writer: string , list: object[], indent: string)

  // write2(writerCls: string, writer: string, iPSModelObject: object, indent: string )

  // /**
  //  * 导出指定模型到指定根目录
  //  * @param writerCls
  //  * @param root
  //  * @param list
  //  * @throws Exception
  //  */
  // export(writerCls: string, list: object[] )

  // /**
  //  * 导出指定模型到指定根目录
  //  * @param writerCls
  //  * @param root
  //  * @param iPSModelObject
  //  * @param defaultType
  //  * @throws Exception
  //  */
  // export2(writerCls: string , iPSModelObject: object, defaultType: String)

  // /**
  //  * 判断传入模型指定属性是否导出为文件
  //  * @param modelCls
  //  * @param modelProperty
  //  * @param def
  //  * @return
  //  */
  // isExportModelFile(modelCls: string, modelProperty: String, def: boolean) : boolean;

  /**
   * 填充DSL模型对象
   * @param writerCls
   * @param src
   * @param dst
   */
  fillDSL(writerCls: string, src: any, dst: any): boolean;

  /**
   * 填充DSL模型对象列表
   * @param writerCls
   * @param src
   * @param dst
   */
  fillDSLList(writerCls: string, src: any, dst: any): boolean;

  s(writerCls: string, src: any, key: string, dst?: any): any;

  m(writerCls: string, src: any, key: string, dst?: any): any;
}
