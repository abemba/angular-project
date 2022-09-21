import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-loading-overlay',
  templateUrl: './loading-overlay.component.html',
  styleUrls: ['./loading-overlay.component.scss']
})
export class LoadingOverlayComponent implements OnInit {

  constructor(public common:CommonService) { }

  ngOnInit(): void {
  }

  showOverlay(){
    return this.common.isLoadingInitData() || this.common.canShowLoadingOverlay()
  }

}
