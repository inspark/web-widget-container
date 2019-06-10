import {
  ITEM_TYPE,
  ItemSeries,
  ParamConfigSeries,
  WidgetParams,
  WidgetPackage,
  WidgetComponent,
  WidgetComponentContainer,
  Component
} from '@inspark/widget-common';

interface ChartInputParameters {
  charts: {
    config: ParamConfigSeries;
    items: Array<ItemSeries>;
  };
}


const REQUEST_PARAMS: WidgetParams = {
  charts: {
    title: '',
    item_type: ITEM_TYPE.series,
    items: [{
      max: 8,
    }]
  }
};


class WidgetChartComponent extends WidgetComponent {

  config: ParamConfigSeries;
  data: any[] = [];

  onUpdate(values: ChartInputParameters) {

    if (values.charts) {
      this.config = values.charts.config;
      values.charts.items.forEach((val, ind) => {
        this.data[ind] = val;
      });
    }
  }

}

@Component({
  templateUrl: './widget.chart.html',
})
class WidgetContainer extends WidgetComponentContainer {
  values: ChartInputParameters;
  component = new WidgetChartComponent();
}


const component: WidgetPackage = {
  template: require('./widget.chart.html'),
  component: new WidgetChartComponent(),
  params: REQUEST_PARAMS,
  size: {'sm': {'x': 0, 'y': 0, 'w': 3, 'h': 6}, 'lg': {'x': 0, 'y': 0, 'w': 5, 'h': 6}, 'mobile': {'x': 0, 'y': 0, 'w': 2, 'h': 7}},
  styles: require('./widget.chart.scss'),
  locales: [{code: 'en', file: require('./i18n/en.json')}, {code: 'ru', file: require('./i18n/ru.json')}]
};


export default component;

