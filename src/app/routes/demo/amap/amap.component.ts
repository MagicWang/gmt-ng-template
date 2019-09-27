import { Component, OnInit, Injector } from '@angular/core';
import { LazyService } from '@shared/services';
import { BaseComponent } from '@gmt/ui';

@Component({
  selector: 'app-amap',
  templateUrl: './amap.component.html',
  styles: [],
})
export class AmapComponent extends BaseComponent implements OnInit {
  constructor(injector: Injector, private lazyService: LazyService) {
    super(injector);
  }

  ngOnInit() {
    this.lazyService.loadAMap().subscribe({
      complete: () => {
        AMapUI.loadUI(['misc/PoiPicker', 'misc/PositionPicker'], (PoiPicker, PositionPicker) => {
          // console.log(PoiPicker);
        });
        const map = new AMap.Map('mapContainer', {
          resizeEnable: true,
          center: [116.397428, 25.90923], // 地图中心点
          zoom: 13, // 地图显示的缩放级别
          keyboardEnable: false,
        });
      },
    });
  }
}
