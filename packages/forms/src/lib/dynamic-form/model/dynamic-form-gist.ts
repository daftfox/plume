import { SPACER } from './spacer.enum';
import { DynamicFormGistOptions, FileGist } from './options';

export class DynamicFormGist {
  fileGists?: FileGist[];
  spacer?: SPACER;

  constructor(options: DynamicFormGistOptions) {
    this.fileGists = options.fileGists;
    this.spacer = options.spacer;
  }
}
