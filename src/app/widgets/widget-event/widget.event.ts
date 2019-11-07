import {
  WidgetComponent,
  WidgetPackage,
  EventValues,
  ITEM_TYPE,
  ParamConfigEvents,
  WidgetParams,
  WidgetComponentContainer,
  Component,
} from '@inspark/widget-common/interface';

interface EventParameters {
  events: EventValues;
}


const REQUEST_PARAMS: WidgetParams = {
  events: {
    title: '',
    item_type: ITEM_TYPE.events,
  }
};


class WidgetEventComponent extends WidgetComponent {
  values: EventParameters;


  onUpdate(values: EventParameters) {

    if (values.events && values.events.data) {
      values.events.data.rowList = values.events.data.rowList.map((event: any) => {
        values.events.config.attrList.forEach(attrname => {

          let date;
          if (attrname === 'timestmp') {
            date = new Date(event[attrname]);
            event[attrname] = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' +
              ('0' + date.getDate()).slice(-2) + ' ' + ('0' + (date.getHours())).slice(-2) + ':' +
              ('0' + date.getMinutes()).slice(-2) + ':' + ('0' + date.getSeconds()).slice(-2);
          } else if (event[attrname] && (attrname === 'resulttime' || attrname === 'senttime')) {
            date = new Date(event[attrname]);
            event[attrname] = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' +
              ('0' + date.getDate()).slice(-2) + ' ' + ('0' + (date.getHours())).slice(-2) + ':' +
              ('0' + date.getMinutes()).slice(-2) + ':' + ('0' + date.getSeconds()).slice(-2);
          } else if (event[attrname] && attrname === 'state') {
            event[attrname] = event[attrname].name;

          } else if (event[attrname]) {
          } else {
          }

        });

        return event;
      });
    }
  }
}

@Component({
  templateUrl: './widget.event.html',
})
class WidgetContainer extends WidgetComponentContainer {
  values: EventParameters;
  component = new WidgetEventComponent();
}


const component: WidgetPackage = {
  template: require('./widget.event.html'),
  component: new WidgetEventComponent(),
  params: REQUEST_PARAMS,
  size: {
    'sm': {'x': 0, 'y': 0, 'w': 3, 'h': 6},
    'lg': {'x': 0, 'y': 0, 'w': 5, 'h': 6},
    'mobile': {'x': 0, 'y': 0, 'w': 2, 'h': 7}
  },
  styles: require('./widget.event.scss'),
  locales: [{code: 'en', file: require('./i18n/en.json')}, {code: 'ru', file: require('./i18n/ru.json')}]
};


export default component;

