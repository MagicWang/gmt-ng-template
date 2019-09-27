import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

/**
 * 延迟加载第三方类库服务(ng-alain自带LazyService返回Promise不好用，请使用此Observable版本)
 */
@Injectable({
  providedIn: 'root',
})
export class LazyService {
  private _loadedLibraries: { [url: string]: ReplaySubject<any> } = {};

  constructor() {}

  /**
   * 加载高德地图类库
   */
  loadAMap(): Observable<any> {
    return new Observable(subscriber => {
      this.loadScript('https://webapi.amap.com/maps?v=1.4.15&key=42055b210625ca30b9afa2388b9497b0').subscribe(() => {
        this.loadScript('https://webapi.amap.com/ui/1.0/main.js').subscribe(() => {
          subscriber.next();
          subscriber.complete();
        });
      });
    });
  }
  /**
   * 加载js
   */
  loadScript(url: string): Observable<any> {
    if (this._loadedLibraries[url]) {
      return this._loadedLibraries[url].asObservable();
    }

    this._loadedLibraries[url] = new ReplaySubject();

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = url;
    script.onload = () => {
      this._loadedLibraries[url].next();
      this._loadedLibraries[url].complete();
    };

    document.body.appendChild(script);

    return this._loadedLibraries[url].asObservable();
  }

  /**
   * 加载css
   */
  loadStyle(url: string): Observable<any> {
    if (this._loadedLibraries[url]) {
      return this._loadedLibraries[url].asObservable();
    }

    this._loadedLibraries[url] = new ReplaySubject();

    const style = document.createElement('link');
    style.type = 'text/css';
    style.href = url;
    style.rel = 'stylesheet';
    style.onload = () => {
      this._loadedLibraries[url].next();
      this._loadedLibraries[url].complete();
    };

    const head = document.getElementsByTagName('head')[0];
    head.appendChild(style);

    return this._loadedLibraries[url].asObservable();
  }
}
