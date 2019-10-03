import {Component, OnInit, NgModule, Input, ViewChild, ChangeDetectorRef, OnDestroy, Compiler} from '@angular/core';
import {WidgetContainerComponent} from '../widget-container/widget-container.component';

import {WidgetParams, WidgetSize, WidgetPackage, CommunicationService} from '@inspark/widget-common';
import {GridsterComponent} from '@blare/angular2gridster';
import {VIEW_SIZE} from './controls/controls.component';
import {TranslateService} from '@ngx-translate/core';

import {Observable} from 'rxjs';


const SIZES = {
  0: {width: '375px', height: 'auto'},
  1: {width: '1024px', height: 'auto'},
  2: {width: '1280px', height: 'auto'},
  3: {width: 'auto', height: 'auto'},
};


@Component({
  selector: 'app-dashboard-panel',
  templateUrl: './dashboard-panel.component.html',
  styleUrls: ['./dashboard-panel.component.scss'],
  entryComponents: [WidgetContainerComponent],
})
export class DashboardPanelComponent implements OnInit, OnDestroy {

  sizes = [
    {title: 'Mobile', value: VIEW_SIZE.mobile, icon: 'fa fa-fw fa-mobile'},
    {title: 'Tablet', value: VIEW_SIZE.tablet, icon: 'fa fa-fw fa-tablet'},
    {title: 'Desktop', value: VIEW_SIZE.desktop, icon: 'fa fa-fw fa-desktop'},
    {title: 'Free', value: VIEW_SIZE.free, icon: 'fa fa-fw fa-square'},
  ];

  langs = [
    {label: 'ru', value: 'ru'},
    {label: 'en', value: 'en'},
  ];

  themes = [
    {label: 'Light', value: 'light'},
    {label: 'Dark', value: 'dark'},
  ];


  params: WidgetParams;
  widget: WidgetPackage;
  viewMode: VIEW_SIZE = VIEW_SIZE.free;
  position: WidgetSize = {sm: {x: 0, y: 0, w: 2, h: 5}, lg: {x: 0, y: 0, w: 4, h: 5}, mobile: {x: 0, y: 0, w: 6, h: 5}};

  private message$: Observable<any>;
  MODE_SIZES = SIZES;

  gridsterOptions = {
    lanes: 2, // how many lines (grid cells) dashboard has
    cellHeight: 60,
    direction: 'vertical', // items floating direction: vertical/horizontal/none
    floating: true, // default=true - prevents items to float according to the direction (gravity)
    dragAndDrop: false, // possible to change items position by drag n drop
    resizable: true, // possible to resize items by drag n drop by item edge/corner
    useCSSTransforms: true, // Uses CSS3 translate() instead of position top/left - significant performance boost.
    responsiveSizes: true, // allow to set different item sizes for different breakpoints
    // ResponsiveOptions can overwrite default configuration with any option available for specific breakpoint.
    lines: {
      visible: true,
      color: '#afafaf',
      width: 2,
    },
    responsiveOptions: [
      {
        breakpoint: 'sm',
        lanes: 6,
        minWidth: 768,
      },
      {
        breakpoint: 'lg',
        minWidth: 1200,
        lanes: 12,
      }
    ]
  };

  currentTheme = 'dark';
  currentLang;

  constructor(public translate: TranslateService, private communication: CommunicationService) {
    this.communication.create(0);

    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('en');

    const browserLang = translate.getBrowserLang();
    this.currentLang = browserLang.match(/en|fr/) ? browserLang : 'en';
    translate.use(this.currentLang);

    this.message$ = communication.message$[0];
    this.message$.subscribe(this.getMessage.bind(this));
  }

  getMessage(data) {
    console.log('getMessage', data);
    if (data.command === 'values') {
      const WidgetComponent = data.widget.package;
      this.params = WidgetComponent.params;
      this.position = WidgetComponent.size;
      this.widget = WidgetComponent;
      this.loadLocales(WidgetComponent);
    }
  }


  @ViewChild(GridsterComponent) gridster: GridsterComponent;


  ngOnInit() {

  }


  ngOnDestroy() {
  }


  onReflow() {
    this.adjustItemsSize();
  }

  private adjustItemsSize() {
  }


  itemChange(event) {
    if (event.changes && event.changes.length !== 4) {
      window.dispatchEvent(new Event('resize'));
    }
  }

  changeTheme() {

    if (this.currentTheme === 'light') {
      document.body.classList.add('theme-light');
    } else {
      document.body.classList.remove('theme-light');
    }
  }

  changeSize() {
    window.dispatchEvent(new Event('resize'));
  }

  changeLang() {
    this.translate.use(this.currentLang);
  }

  loadLocales(WidgetComponent) {
    if (WidgetComponent.locales) {
      WidgetComponent.locales.forEach(val => {
        this.translate.setTranslation(val.code, val.file);
      });
    }
  }
}



