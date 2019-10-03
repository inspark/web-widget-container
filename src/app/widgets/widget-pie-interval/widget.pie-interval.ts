import {
  ChartTypes,
  ITEM_TYPE,
  WidgetComponent,
  WidgetPackage,
  ItemInterval,
  ParamConfigInterval,
  WidgetParams, Component, WidgetComponentContainer
} from '@inspark/widget-common/interface';

interface PieIntervalInputParameters {
  charts: {
    config: ParamConfigInterval;
    items: Array<ItemInterval>;
  };
}


const REQUEST_PARAMS: WidgetParams = {
  charts: {
    title: '',
    item_type: ITEM_TYPE.interval,
    items: [{
      max: 8,
    }]
  }
};

class WidgetPieIntervalComponent extends WidgetComponent {

  configs: any;
  data: any;
  intervalDates: any;

  onUpdate(values) {
    if (values.charts && values.charts.items && values.charts.items.length > 0) {
      const items = values.charts.items.filter(item => item.data);
      this.prepareDataPie(items, values.charts);
      this.prepareIntervalDates(items);
    }
  }

  private prepareIntervalDates(items) {
    this.intervalDates = items.reduce((result, item) => {
      if (!result.beginInterval || !result.endInterval) {
        return {beginInterval: item.data.beginInterval, endInterval: item.data.endInterval};
      }
      return {
        beginInterval: Math.min(result.beginInterval, item.data.beginInterval),
        endInterval: Math.max(result.endInterval, item.data.endInterval)
      };
    }, {});
  }

  private prepareDataPie(items, charts) {
    const pieDataKeys = items
      .map(_item => _item.title)
      .filter((value, index, self) => self.indexOf(value) === index);

    const avg = (data, itemTitle) => {
      if (data.items.length === 0) {
        return 0;
      }

      const points = data.items.filter(_item => _item.title === itemTitle);
      return points.reduce((_prev, _point) => _point.value + _prev, 0) / points.length;
    };

    const pieData = pieDataKeys.map(_itemTitle => ({'key': _itemTitle, 'value': avg(charts, _itemTitle)}));
    this.data = {value: '', data: pieData};
    this.configs = {charttype: ChartTypes.pieChart};
  }
}

@Component({
  templateUrl: './widget.pie-interval.html',
})
class WidgetContainer extends WidgetComponentContainer {
  values: PieIntervalInputParameters;
  component = new WidgetPieIntervalComponent();
}

const component: WidgetPackage = {
  template: require('./widget.pie-interval.html'),
  component: new WidgetPieIntervalComponent(),
  params: REQUEST_PARAMS,
  size: {
    'sm': {'x': 0, 'y': 0, 'w': 3, 'h': 7},
    'lg': {'x': 0, 'y': 0, 'w': 5, 'h': 7},
    'mobile': {'x': 0, 'y': 0, 'w': 2, 'h': 7}
  },
  styles: require('./widget.pie-interval.scss'),
  locales: [{code: 'en', file: require('./i18n/en.json')}, {code: 'ru', file: require('./i18n/ru.json')}]
};


export default component;

