import { Component, OnInit } from '@angular/core';
import { DynamicFormModule, IDynamicFormElement } from '@plume-org/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { AsideService } from '../../service/aside.service';
import { HighlightModule } from 'ngx-highlightjs';
import { ObserveVisibilityDirective } from '../../directive/observe-visibility.directive';
import { FlexLayoutModule } from '@angular/flex-layout';
import { GistComponent } from '../../../shared/component/gist/gist.component';

export interface Example {
  heading: string;
  subtitle?: string;
  description?: string;
  key: string;
  panelOpen: boolean;
  formElements: IDynamicFormElement[];
  fileGists: { name: string; code: string }[];
}

@Component({
  standalone: true,
  templateUrl: './abstract-demo.component.html',
  imports: [
    CommonModule,
    DynamicFormModule,
    MatButtonModule,
    MatExpansionModule,
    HighlightModule,
    ObserveVisibilityDirective,
    FlexLayoutModule,
    GistComponent,
  ],
})
export abstract class AbstractDemoComponent implements OnInit {
  public title = '';
  public description = '';
  public examples: Example[] = [];

  constructor(protected asideService: AsideService) {}

  ngOnInit() {
    this.asideService.setContent({
      title: this.title,
      items: this.examples.map(({ key, heading, subtitle }) => ({
        key,
        label: heading,
        subtitle,
      })),
    });
  }

  setActiveFragment(fragment: string) {
    this.asideService.setActiveFragment(fragment);
  }
}
