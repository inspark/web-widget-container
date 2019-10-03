import {
  Component, WidgetComponentContainer,
  WidgetPackage,
  WidgetComponent,
  ITEM_TYPE, PARAM_TYPE,
  WidgetParams, ParamConfigCustom, ItemCustom
} from '@inspark/widget-common/interface';



interface InputParameters {
  data: {
    config: ParamConfigCustom,
    items: Array<ItemCustom>
  };
}


const PARAMS: WidgetParams = {
  data: {
    title: 'Текстовые значения',
    item_type: ITEM_TYPE.custom,
    items: [{
      param_type: PARAM_TYPE.custom_string,
      max: 8,
    }]
  }
};

class WidgetText extends WidgetComponent {
}


@Component({
  templateUrl: './widget.text.html',
})
class WidgetContainer extends WidgetComponentContainer {
  values: InputParameters;

  component = new WidgetText();
}

const component: WidgetPackage = {
  template: require('./widget.text.html'),
  component: new WidgetText(),
  params: PARAMS,
  size: {'sm': {'x': 0, 'y': 0, 'w': 4, 'h': 9}, 'lg': {'x': 0, 'y': 0, 'w': 5, 'h': 7}, 'mobile': {'x': 0, 'y': 0, 'w': 2, 'h': 7}},
  needPicture: true,
  styles: require('./widget.text.scss'),
  locales: [{code: 'en', file: require('./i18n/en.json')}, {code: 'ru', file: require('./i18n/ru.json')}]
};


export default component;

