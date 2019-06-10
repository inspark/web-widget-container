import {Component, OnInit, NgModule, Input, ViewChild, Output, EventEmitter, ContentChildren} from '@angular/core';
import {TreeNode} from 'primeng/api';
import {Router} from '@angular/router';


export enum VIEW_SIZE {
  'mobile',
  'tablet',
  'desktop',
  'free'
}


@Component({
  selector: 'app-dashboard-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss'],
  entryComponents: []
})
export class ControlsComponent implements OnInit {


  constructor( public router: Router) {

  }

  ngOnInit() {

  }

  showDashboard() {
  }

}



