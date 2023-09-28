import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MatListModule} from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {AsideContent, AsideService} from "../../service/aside.service";
import {Observable} from "rxjs";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";

@Component( {
  standalone: true,
  selector: 'demo-aside',
  imports: [ MatListModule, RouterLink, AsyncPipe, NgIf, NgForOf, RouterLinkActive ],
  styleUrls: ['./aside.component.scss'],
  template: `
    <div class="aside" *ngIf="(content | async) as content">
      <div class="slider"></div>
      <span class="heading"
            routerLink="./"
            [class.active]="(activeFragment | async) === content.title"
            [fragment]="content.title">{{ content.title }}</span>
      <ul>
        <li *ngFor="let item of content.items"
            [class.active]="(activeFragment | async) === item.key"
            routerLink="./"
            [fragment]="item.key">
          <div matListItemTitle>{{ item.label }}</div>
        </li>
      </ul>
    </div>`,
  encapsulation: ViewEncapsulation.None
})
export class AsideComponent implements OnInit {
  content: Observable<AsideContent>;
  activeFragment: Observable<string>;

  constructor( private asideService: AsideService ) {}

  ngOnInit() {
    this.content = this.asideService.getContent();
    this.activeFragment = this.asideService.getActiveFragment();
  }
}
