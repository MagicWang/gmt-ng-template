import { Component, OnInit, Injector } from '@angular/core';
import { BaseComponent } from '@gmt/ui';

@Component({
  selector: 'app-dic-pipe',
  templateUrl: './dic-pipe.component.html',
  styles: [],
})
export class DicPipeComponent extends BaseComponent implements OnInit {
  constructor(injector: Injector) {
    super(injector);
  }
  oldCode1 = `<nz-badge *ngIf='data.Status ===0' nzColor="red" nzText="已下架"></nz-badge>`;
  oldCode2 = `<nz-badge *ngIf='data.Status !==0' nzColor="green" nzText="已上架"></nz-badge>`;
  code0 = "{{'status.0' | translate}}";
  code1 = "{{'status.1' | translate}}";
  code2 = "{{'status.2' | translate}}";
  code3 = "{{'status.3' | translate}}";
  ngOnInit() {}
}
