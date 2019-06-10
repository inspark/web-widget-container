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
  generateValues
} from '@inspark/widget-common';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-widget-options',
  templateUrl: './widget-options.component.html',
  styleUrls: ['./widget-options.component.scss']
})
export class WidgetOptionsComponent implements OnInit {

  @Input() params: WidgetParams;

  values;

  ITEM_TYPE = ITEM_TYPE;

  @Input('ngModel') config: ParamConfigurator[];

  readonly VALUE_TYPE = VALUE_TYPE;
  readonly STATE_COLORS = STATE_COLORS;

  message$: Observable<any>;

  constructor(private communication: CommunicationService) {

    communication.create(0);
    this.message$ = communication.message$[0];
    this.message$.subscribe(this.getMessage.bind(this));
  }

  ngOnInit() {
    this.config = createParamList(this.params);
    this.generate();
  }

  getMessage(data) {
    if (data.command === 'SUBSCRIBE') {
      this.generate();
    }
  }

  generate() {
    this.values = generateValues(this.params, this.config);
    this.values = this.addChartData(this.values);
    this.communication.next(0, {command: 'values', values: this.values});
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
