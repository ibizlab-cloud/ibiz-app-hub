import qs from 'qs';

/**
 * 获取实体的jsonschema
 * @author lxm
 * @date 2023-12-29 04:03:58
 * @export
 * @param {string} entityId
 * @param {IContext} context
 * @return {*}  {Promise<IData>}
 */
export async function getEntitySchema(
  entityId: string,
  context: IContext,
  params: IParams = {},
): Promise<IData> {
  const strParams = qs.stringify(params);
  const app = ibiz.hub.getApp(context.srfappid);
  const entity = await ibiz.hub.getAppDataEntity(entityId, context.srfappid);
  let url = `/jsonschema/${entity.name}`;
  if (entity.dynaSysMode === 0 && ibiz.appData) {
    url += `?dynamodeltag=${ibiz.appData.dynamodeltag}${strParams ? `&${strParams}` : ''}`;
  } else {
    url += `${strParams ? `?${strParams}` : ''}`;
  }
  const res = await app.net.get(url);
  return res.data;
}
