import {
  ChartTypes,
  ITEM_TYPE, ItemInterval,
  ItemSeries, ItemSingle, ParamConfigInterval,
  ParamConfigSeries, ParamConfigSingle,
  SeriesDuration,
  WidgetParams,
  WidgetPackage,
  WidgetComponent,
  WidgetComponentContainer,
  Component,
} from '@inspark/widget-common';


interface InputParameters {

  instant: {
    config: ParamConfigSingle,
    items: Array<ItemSingle> // ItemConfig
  };

  interval: {
    config: ParamConfigInterval,
    items: Array<ItemInterval> // ItemConfig
  };
}

const PARAMS: WidgetParams = {
  instant: {
    title: 'Список мгновенных значений',
    item_type: ITEM_TYPE.single,
    items: [{
      max: 8,
    }]
  },
  interval: {
    title: 'Список интервальных значений',
    item_type: ITEM_TYPE.interval,
    items: [{
      max: 8,
    }]
  }
};


class WidgetComplex extends WidgetComponent {
  values: InputParameters;
  dataPie: any;
  configs: any;

  onUpdate(values) {
    if (values.interval && values.interval && values.interval.items && values.interval.items.length > 0) {
      this.prepareDataPie(values);
    }
  }

  private prepareDataPie(values) {
    this.dataPie = values.interval.items.map((item, index) => {
      if (item.data.stateMap && item.data.stateMap.length > 0) {
        console.log('Interval', item);
        return {'value': '', 'data': item.data.stateMap.map(state => ({'key': state.state.statename, 'value': state.interval}))};
      }
      return null;
    });
    console.log('Interval', this.dataPie);
    this.configs = {
      charttype: ChartTypes.intervalPieChart
    };

  }
}


@Component({
  templateUrl: './widget.complex.html',
})
class WidgetContainer extends WidgetComponentContainer {
  values: InputParameters;
  component = new WidgetComplex();
}

const component: WidgetPackage = {
  template: require('./widget.complex.html'),
  component: new WidgetComplex(),
  params: PARAMS,
  size: {'sm': {'x': 0, 'y': 0, 'w': 3, 'h': 6}, 'lg': {'x': 0, 'y': 0, 'w': 5, 'h': 7}, 'mobile': {'x': 0, 'y': 0, 'w': 2, 'h': 7}},
  styles: require('./widget.complex.scss'),
};


export default component;

