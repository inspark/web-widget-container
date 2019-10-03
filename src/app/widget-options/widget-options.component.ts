import {Component, Input, OnInit, Output} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {
  ITEM_TYPE,
  PARAM_TYPE,
  ParamConfigurator,
  STATE_COLORS,
  VALUE_TYPE,
  WidgetParams,
  createParamList,
  CommunicationService,
  generateValues, WidgetPackage, createGenerateItemConfig, GenerateConfigItem, GenerateConfig
} from '@inspark/widget-common';
import {Observable} from 'rxjs';
import {LibraryWidget, widgetLibrary} from '../widget.include';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-widget-options',
  templateUrl: './widget-options.component.html',
  styleUrls: ['./widget-options.component.scss']
})
export class WidgetOptionsComponent implements OnInit {

  params: WidgetParams;

  values;

  ITEM_TYPE = ITEM_TYPE;

  selectedWidget: LibraryWidget;

  widgets: LibraryWidget[] = [];

  @Input('ngModel') config: ParamConfigurator[];

  readonly VALUE_TYPE = VALUE_TYPE;
  readonly STATE_COLORS = STATE_COLORS;

  message$: Observable<any>;

  generateConfig: GenerateConfig = {pictureId: false};

  constructor(private communication: CommunicationService, private _route: ActivatedRoute,
              private _router: Router) {

    communication.create(0);
    this.message$ = communication.message$[0];
    this.message$.subscribe(this.getMessage.bind(this));
    this.widgets = widgetLibrary.getList();
    if (this.widgets.length) {
      this._route.queryParams.subscribe(
        params => {
          console.log('queryParams', params);
          if (params.widget) {
            this.selectedWidget = this.widgets.find(val => val.name === params.widget);
            this.loadWidget();
          }
        });
      this.selectedWidget = this.widgets[0];
      this.loadWidget();
    }
  }

  ngOnInit() {
    this.generate();
  }

  loadWidget() {
    this.params = this.selectedWidget.package.params;
    this.updateConfig();
    this.generate();
  }

  changeWidget() {
    this.loadWidget();
    this._router.navigate([], {
      queryParams: {
        widget: this.selectedWidget.name
      },
      queryParamsHandling: 'merge',
    });
  }

  getMessage(data) {
    if (data.command === 'SUBSCRIBE') {
      this.generate();
    }
  }

  countChange(item: ParamConfigurator) {
    if (item.generateConfig.count > item.generateConfig.items.length) {
      item.generateConfig.items.push(createGenerateItemConfig());
    } else {
      item.generateConfig.items = item.generateConfig.items.slice(0, item.generateConfig.count);
    }

    this.generate();
  }

  onChange() {
    this.generate();
  }

  updateConfig() {
    this.config = createParamList(this.params);
    this.config = this.config.map(val => {
      return this.addGenerateConfig(val);
    });
    console.log('updateConfig', this.config);
  }

  addGenerateConfig(item: ParamConfigurator) {
    if (item.isArray && item.generateConfig.count) {
      const items: GenerateConfigItem[] = Array(item.generateConfig.count).fill(1).map(val => createGenerateItemConfig());
      return {...item, generateConfig: {...item.generateConfig, ...createGenerateItemConfig(), items}};
    } else {
      if (item.items) {
        item.items = item.items.map(val => this.addGenerateConfig(val));
      } else {
          return {...item, generateConfig: {...item.generateConfig, ...createGenerateItemConfig()}};
      }
    }
    return item;
  }


  generateClick(e) {
    e.preventDefault();
    this.generate();
  }

  generate() {
    this.values = generateValues(this.params, this.config);
    this.values = this.addChartData(this.values);
    this.communication.next(0, {command: 'values', config: this.generateConfig, values: this.values, widget: this.selectedWidget});
  }

  addChartData(values) {
    for (const key in this.params) {
      if (this.params.hasOwnProperty(key)) {
        const param = this.params[key];
        if (param.items instanceof Array) {
          if (param.items[0].item_type === ITEM_TYPE.interval) {
            for (let i = 0; i < values[key].items.length; i++) {
              const datapie = [];
              if (values[key].items[i].data.states) {
                values[key].items[i].data.states.forEach(item => {
                  datapie.push({
                    'key': item.state.name,
                    'y': item.interval,
                    'color': item.state.id > -1 ? this.STATE_COLORS[item.state.id] : this.STATE_COLORS[0]
                  });
                });
                values[key].items[i].datapie = datapie;
              }
            }
          }
        }
      }
    }
    return values;
  }

}
