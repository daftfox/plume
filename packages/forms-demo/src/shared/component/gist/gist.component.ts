import { Component, Input, ViewEncapsulation } from '@angular/core';
import { HighlightModule } from 'ngx-highlightjs';
import { MatTabsModule } from '@angular/material/tabs';
import { NgForOf } from '@angular/common';

export interface FileGist {
  name: string;
  code: string;
}

@Component({
  standalone: true,
  selector: 'demo-gist',
  templateUrl: './gist.component.html',
  styleUrls: ['./gist.component.scss'],
  imports: [HighlightModule, MatTabsModule, NgForOf],
  encapsulation: ViewEncapsulation.None,
})
export class GistComponent {
  @Input() fileGists: FileGist[];
  @Input() heading: string;
}
