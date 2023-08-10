import { SPACER } from '../spacer.enum';

export interface FileGist {
  name: string;
  code: string;
}

export interface DynamicFormGistOptions {
  fileGists: FileGist[];
  spacer?: SPACER;
}
