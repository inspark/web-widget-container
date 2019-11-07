import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {WidgetContainerComponent} from '../widget-container/widget-container.component';

import {CommunicationService, WidgetPackage, WidgetParams, WidgetSize} from '@inspark/widget-common';
import {GridsterComponent} from '@blare/angular2gridster';
import {VIEW_SIZE} from './controls/controls.component';
import {TranslateService} from '@ngx-translate/core';
import {Observable} from 'rxjs';
import _ from 'lodash';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  constructor(public translate: TranslateService, private communication: CommunicationService, private _elementRef: ElementRef, private cdRef: ChangeDetectorRef) {
    this.communication.create(0);

    translate.addLangs(['en', 'ru']);
    translate.setDefaultLang('en');

    const browserLang = translate.getBrowserLang();
    this.currentLang = browserLang.match(/en|ru/) ? browserLang : 'en';
    translate.use(this.currentLang);

    this.message$ = communication.message$[0];
    this.message$.subscribe(this.getMessage.bind(this));
  }

  getMessage(data) {
    if (data.command === 'values') {
      const WidgetComponent = data.widget.package;
      this.params = WidgetComponent.params;
      this.position = WidgetComponent.size;
      this.widget = WidgetComponent;
      this.loadLocales(WidgetComponent);
    }
  }


  @ViewChild(GridsterComponent) gridster: GridsterComponent;

  resizeWidget() {
    const container = (this._elementRef.nativeElement.querySelector('.widget-container') as HTMLElement);
    if (container && container.offsetWidth && container.offsetHeight) {
      this.widget.component.onResize(container.offsetWidth, container.offsetHeight);
      this.cdRef.detectChanges();
    }
  }

  ngOnInit() {
    window.addEventListener('resize', this.onResize);
  }


  ngOnDestroy() {
    window.removeEventListener('resize', this.onResize);
  }

  onResize = _.debounce(() => {
    setTimeout(() => {
      this.resizeWidget();
    }, 100);
  }, 500);

  onReady() {
    this.resizeWidget();
  }

  itemChange(widget: WidgetPackage, event) {
    if (event.changes && (event.changes.indexOf('w') !== -1 || event.changes.indexOf('h') !== -1)) {
      this.resizeWidget();
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



