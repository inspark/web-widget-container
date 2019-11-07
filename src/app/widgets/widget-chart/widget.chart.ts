import {
  ITEM_TYPE,
  ItemSeries,
  ParamConfigSeries,
  WidgetParams,
  WidgetPackage,
  WidgetComponent,
  WidgetComponentContainer,
  Component, ChartTypes
} from '@inspark/widget-common/interface';
import {ElementRef, ViewChild} from '@angular/core';

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
  height = 300;

  realHeight = 300;
  width = 300;

  onResize(width, height) {
    this.realHeight = height;
    if (this.config) {
      this.updateHeight();
    }
    this.width = width;
  }

  updateHeight() {
    if (this.config && (this.config.charttype === ChartTypes.histogramChart || this.config.charttype === ChartTypes.candlestickBarChart)) {
      this.height = this.realHeight - 60;
    } else {
      this.height = this.realHeight - 40;
    }
  }

  onUpdate(values: ChartInputParameters) {

    this.data = [];
    if (values.charts) {
      this.config = values.charts.config;
      values.charts.items.forEach((val, ind) => {
        this.data[ind] = val;
      });
    }
    this.updateHeight();
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

