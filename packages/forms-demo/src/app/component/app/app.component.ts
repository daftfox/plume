import { Component, ViewChild } from '@angular/core';
import {NavigationEnd, Router, RouterModule} from '@angular/router';
import { FlexModule } from '@angular/flex-layout';
import { MatDrawerContent, MatSidenavModule } from '@angular/material/sidenav';
import { HeaderComponent } from '../header/header.component';
import { SidebarNavigationComponent } from '../sidebar-navigation.component/sidebar-navigation.component';
import { AsideService } from '../../service/aside.service';
import { ViewportScroller } from '@angular/common';

@Component({
  standalone: true,
  imports: [ RouterModule, FlexModule, MatSidenavModule, HeaderComponent, SidebarNavigationComponent ],
  providers: [ AsideService ],
  selector: 'demo-root',
  styleUrls: ['./app.component.scss'],
  template: `
    <header>
      <demo-header></demo-header>
    </header>

    <mat-drawer-container [hasBackdrop]="false">
      <mat-drawer [disableClose]="true" [opened]="true">
        <demo-sidebar-navigation></demo-sidebar-navigation>
      </mat-drawer>
      <mat-drawer-content #content>
        <main>
          <router-outlet></router-outlet>
        </main>
      </mat-drawer-content>
    </mat-drawer-container>

    <aside>
      <router-outlet name="aside"></router-outlet>
    </aside>
  `
})
export class AppComponent {

  @ViewChild('content') content: MatDrawerContent;

  constructor( private router: Router, private asideService: AsideService ) {

    router.events.subscribe(s => {
      if (s instanceof NavigationEnd) {
        const tree = router.parseUrl(router.url);
        if (tree.fragment) {
          const element = document.querySelector("#" + tree.fragment);
          if (element) {
            element.scrollIntoView({
              block: 'start',
              behavior: 'smooth'
            });
          this.asideService.setActiveFragment( tree.fragment );
          }
        } else {
          this.content.scrollTo({start: 0, top: 0});
        }
      }
    });

  }
}
