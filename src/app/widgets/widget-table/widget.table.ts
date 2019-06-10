import {
  WidgetComponent,
  WidgetPackage,
  ITEM_TYPE,
  WidgetParams,
  Component,
  ItemTable,
  WidgetComponentContainer
} from '@inspark/widget-common';


interface TableInputParameters {
  item: ItemTable
}


class WidgetTableComponent extends WidgetComponent {

}


@Component({
  templateUrl: './widget.table.html',
})
class WidgetContainer extends WidgetComponentContainer {
  values: TableInputParameters;
  component = new WidgetTableComponent();
}

/**
 * Так как виджет является самостоятельной сущностью и родительское приложение не знает
 * о наборе данных, которые ему нужны, то необходимо явно описать набор данных, который
 * должен вернуться из родительского приложения.
 */
const REQUEST_PARAMS: WidgetParams = {
  item: {
    title: '',
    item_type: ITEM_TYPE.table,
    views: ['icon', 'icon & number'],
  }
};


/**
 * Конфигурация виджета
 * @param template - шаблон виджета
 * @param component - компонент/контроллер виджета
 * @param params - набор данных, которые нужно получить у сервера
 * @param size - минимальные размеры виджета
 * @param styles - inline стили виджета
 */
const component: WidgetPackage = {
  template: require('./widget.table.html'),
  component: new WidgetTableComponent(),
  params: REQUEST_PARAMS,
  size: {
    'sm': {'x': 0, 'y': 0, 'w': 3, 'h': 6},
    'lg': {'x': 0, 'y': 0, 'w': 5, 'h': 7},
    'mobile': {'x': 0, 'y': 0, 'w': 2, 'h': 7}
  },
  needPicture: true,
  styles: require('./widget.table.scss'),
};


export default component;

