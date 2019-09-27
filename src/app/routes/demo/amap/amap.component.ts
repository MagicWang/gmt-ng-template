import { Component, OnInit } from '@angular/core';
import { LazyService } from '@shared/services';

@Component({
  selector: 'app-amap',
  templateUrl: './amap.component.html',
  styles: [],
})
export class AmapComponent implements OnInit {
  constructor(private lazyService: LazyService) {}

  ngOnInit() {
    this.lazyService.loadAMap().subscribe(() => {
      AMapUI.loadUI(['misc/PoiPicker', 'misc/PositionPicker'], (PoiPicker, PositionPicker) => {
        // console.log(PoiPicker);
      });
      const map = new AMap.Map('mapContainer', {
        resizeEnable: true,
        center: [116.397428, 25.90923], // 地图中心点
        zoom: 13, // 地图显示的缩放级别
        keyboardEnable: false,
      });
    });
  }
}
