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
  Component, PARAM_TYPE,
} from '@inspark/widget-common/interface';


interface InputParameters {
  group1: {
    config: ParamConfigSingle,
    items: Array<ItemSingle> // ItemConfig
  };
}

const PARAMS: WidgetParams = {
  group1: {
    title: 'Список значений 1',
    item_type: ITEM_TYPE.single,
    items: [{
      param_type: PARAM_TYPE.signal && PARAM_TYPE.value,
      max: 50,
    }]
  },
  group2: {
    title: 'Список значений 2',
    item_type: ITEM_TYPE.single,
    items: [{
      param_type: PARAM_TYPE.signal && PARAM_TYPE.value,
      max: 50,
    }]
  },
  group3: {
    title: 'Список значений 3',
    item_type: ITEM_TYPE.single,
    items: [{
      param_type: PARAM_TYPE.signal && PARAM_TYPE.value,
      max: 50,
    }]
  },
  group4: {
    title: 'Список значений 4',
    item_type: ITEM_TYPE.single,
    items: [{
      param_type: PARAM_TYPE.signal && PARAM_TYPE.value,
      max: 50,
    }]
  },
  group5: {
    title: 'Список значений 5',
    item_type: ITEM_TYPE.single,
    items: [{
      param_type: PARAM_TYPE.signal && PARAM_TYPE.value,
      max: 50,
    }]
  },
  group6: {
    title: 'Список значений 6',
    item_type: ITEM_TYPE.single,
    items: [{
      param_type: PARAM_TYPE.signal && PARAM_TYPE.value,
      max: 50,
    }]
  },
  group7: {
    title: 'Список значений 7',
    item_type: ITEM_TYPE.single,
    items: [{
      param_type: PARAM_TYPE.signal && PARAM_TYPE.value,
      max: 50,
    }]
  },
  group8: {
    title: 'Список значений 8',
    item_type: ITEM_TYPE.single,
    items: [{
      param_type: PARAM_TYPE.signal && PARAM_TYPE.value,
      max: 50,
    }]
  }
};


class WidgetIntegralStatuses extends WidgetComponent {
  values: InputParameters;
  dataPie: any;
  configs: any;
  groupStates: any[];
  groupWorstState: any;
  groupWorstestState: any;
  intergralStatus: any;
  evilResponseProps: any;


  onUpdate(values) {
    // console.log('values.single:', values.items.data.state);
    // if (values.interval && values.interval && values.interval.items && values.interval.items.length > 0) {
    //   this.prepareDataPie(values);
    // }
    // Step 1. Get all the object keys.
    this.evilResponseProps = Object.keys(values);
    // Step 2. Create an empty array.
    console.log(this.evilResponseProps);
    let goodResponse = [];
    // Step 3. Iterate throw all keys.
    for (let prop of this.evilResponseProps) {
      goodResponse.push(this.evilResponseProps[prop]);
      console.log('evilResponseProps', this.evilResponseProps);
    }


    console.log('true');
    this.getGroupWorstState(values, group);
    console.log(this.getGroupWorstState(values));

  }

  private getGroupWorstState(values, group) {
    let groupStates = [];
    let groupWorstestState;

    // for ( let i = 0; i < 9; i++ ) {
    //
    // }
    this.groupWorstState = values.group.items.map((item, index) => {

      // console.log('true2');
      if (item.data.state !== null) {
        // console.log(item.data.state.color);
        // return item.data.state.color;
        groupStates.push(item.data.state.color);
        console.log(groupStates.length);
        return {'state': item.data.state.color};
      }

      return null;
      // if (item.data.stateMap && item.data.stateMap.length > 0) {
      //   console.log('true3');
      //   return 'getGroupWorstState';
      // }
    });
    console.log(groupStates);

    // function searchInGroupStates(n) {
    //   if(groupStates.indexOf(n) > -1) {
    //     console.log("N: " + n + " found!");
    //   }
    // }
    // searchInGroupStates(1);

    if (groupStates.includes('error')) {
      console.log('error exists!');
      this.groupWorstestState = 'error';
    } else if (groupStates.includes('warning')) {
      console.log('warning exists!');
      this.groupWorstestState = 'warning';
    } else if (groupStates.includes('falsevalue')) {
      console.log('falsevalue exists!');
      this.groupWorstestState = 'falsevalue';
    } else if (groupStates.includes('success')) {
      console.log('success!');
      this.groupWorstestState = 'success';
    }
  }

  private prepareDataPie(values) {
    // this.dataPie = values.interval.items.map((item, index) => {
    //   if (item.data.stateMap && item.data.stateMap.length > 0) {
    //     // console.log('Interval', item);
    //     return {'value': '', 'data': item.data.stateMap.map(state => ({'key': state.state.statename, 'value': state.interval}))};
    //   }
    //   return null;
    // });
    // // console.log('Interval', this.dataPie);
    // this.configs = {
    //   charttype: ChartTypes.intervalPieChart
    // };

  }
}


@Component({
  templateUrl: './widget.integral-statuses.html',
})
class WidgetContainer extends WidgetComponentContainer {
  values: InputParameters;
  component = new WidgetIntegralStatuses();
}

const component: WidgetPackage = {
  template: require('./widget.integral-statuses.html'),
  component: new WidgetIntegralStatuses(),
  params: PARAMS,
  size: {'sm': {'x': 0, 'y': 0, 'w': 3, 'h': 6}, 'lg': {'x': 0, 'y': 0, 'w': 5, 'h': 7}, 'mobile': {'x': 0, 'y': 0, 'w': 2, 'h': 7}},
  styles: require('./widget.integral-statuses.scss'),
};


export default component;

