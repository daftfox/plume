import { Component } from '@angular/core';
import { GistComponent } from '../../../shared/component/gist/gist.component';

@Component({
  standalone: true,
  templateUrl: './landing.component.html',
  imports: [GistComponent],
  styleUrls: ['./landing.component.html'],
})
export class LandingComponent {}
