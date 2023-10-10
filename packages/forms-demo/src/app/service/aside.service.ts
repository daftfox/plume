import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface AsideContent {
  title: string;
  items: AsideItem[];
}
export interface AsideItem {
  label: string;
  subtitle: string;
  key: string;
}

@Injectable({
  providedIn: 'root',
})
export class AsideService {
  private _content: BehaviorSubject<AsideContent | null> =
    new BehaviorSubject<AsideContent | null>(null);
  private _activeFragment: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);
  getContent(): Observable<AsideContent> {
    return this._content.asObservable();
  }

  setContent(content: AsideContent) {
    this._content.next(content);
  }

  setActiveFragment(fragment: string) {
    this._activeFragment.next(fragment);
  }

  getActiveFragment() {
    return this._activeFragment.asObservable();
  }
}
