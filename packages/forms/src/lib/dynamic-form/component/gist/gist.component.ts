import { Component, Input, ViewEncapsulation } from '@angular/core';
import { HighlightModule } from 'ngx-highlightjs';
import { MatTabsModule } from '@angular/material/tabs';
import { FileGist } from '../../model/options';
import { NgForOf } from '@angular/common';

@Component( {
  standalone: true,
  selector: 'slf-gist',
  templateUrl: './gist.component.html',
  styleUrls: [
    './gist.component.scss'
  ],
  imports: [
    HighlightModule,
    MatTabsModule,
    NgForOf
  ],
  encapsulation: ViewEncapsulation.None
})
export class GistComponent {
  @Input() fileGists: FileGist[];
  @Input() heading: string;
}
