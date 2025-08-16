import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ValueItemEditorWriter } from './value-item-editor-writer';

export class FileUploaderWriter extends ValueItemEditorWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSFileUploader = src

    _.w(d, 'fileExts', s);
    _.w(d, 'maxFileCount', s);
    _.w(d, 'maxFileSize', s);
    _.w(d, 'minFileCount', s);
    _.w(d, 'osscat', s, 'oSSCat');

    super.onFillDSL(c, s, d);
  }
}
