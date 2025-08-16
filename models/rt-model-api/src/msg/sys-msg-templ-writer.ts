import { IModelDSLGenEngineContext } from '../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../model-object-writer';

export class SysMsgTemplWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSSysMsgTempl = src

    _.w(d, 'codeName', s);
    _.w(d, 'content', s);
    _.v(
      d,
      'contentLanguageRes',
      c.s('res.LanguageRes[]', s, 'getContentPSLanguageRes'),
    );
    _.w(d, 'contentType', s);
    _.w(d, 'ddcontent', s, 'dDContent');
    _.v(d, 'ddlanguageRes', c.s('res.LanguageRes[]', s, 'getDDPSLanguageRes'));
    _.w(d, 'imcontent', s, 'iMContent');
    _.v(d, 'imlanguageRes', c.s('res.LanguageRes[]', s, 'getIMPSLanguageRes'));
    _.w(d, 'mobTaskUrl', s);
    _.w(d, 'smscontent', s, 'sMSContent');
    _.v(
      d,
      'smslanguageRes',
      c.s('res.LanguageRes[]', s, 'getSMSPSLanguageRes'),
    );
    _.v(
      d,
      'subLanguageRes',
      c.s('res.LanguageRes[]', s, 'getSubPSLanguageRes'),
    );
    _.w(d, 'subject', s);
    _.w(d, 'taskUrl', s);
    _.w(d, 'wxcontent', s, 'wXContent');
    _.v(d, 'wxlanguageRes', c.s('res.LanguageRes[]', s, 'getWXPSLanguageRes'));
    _.w(d, 'mailGroupSend', s);

    super.onFillDSL(c, s, d);
  }
}
