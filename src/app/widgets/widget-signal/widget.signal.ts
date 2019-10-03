import {
  _,
  WidgetPackage,
  WidgetComponent,
  ITEM_TYPE, ItemSingle, PARAM_TYPE, ParamConfigSingle,
  WidgetParams,
  Component, WidgetComponentContainer
} from '@inspark/widget-common/interface';

interface InputParameters {
  signal: {
    config: ParamConfigSingle,
    items: Array<ItemSingle>
  };
}




const PARAMS: WidgetParams = {
  signal: {
    title: _('Список сигнальных значений'),
    item_type: ITEM_TYPE.single,
    items: [{
      param_type: PARAM_TYPE.signal,
      max: 8,
    }]
  }
};

class WidgetSignal extends WidgetComponent {

  toggleManualMode(data) {
    data.manually = !data.manually;
  }

  paramUpdate(param) {
    param.value = param.value ? 0 : 1;
    return param;
  }
}


@Component({
  templateUrl: './widget.signal.html',
})
class WidgetContainer extends WidgetComponentContainer {
  values: InputParameters;
  component = new WidgetSignal();
}

const component: WidgetPackage = {
  template: require('./widget.signal.html'),
  component: new WidgetSignal(),
  params: PARAMS,
  size: {
    'sm': {'x': 0, 'y': 0, 'w': 3, 'h': 6},
    'lg': {'x': 0, 'y': 0, 'w': 5, 'h': 7},
    'mobile': {'x': 0, 'y': 0, 'w': 2, 'h': 7}
  },
  styles: require('./widget.signal.scss'),
  locales: [{code: 'en', file: require('./i18n/en.json')}, {code: 'ru', file: require('./i18n/ru.json')}]
};


export default component;

