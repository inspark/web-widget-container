import {
  ITEM_TYPE,
  WidgetPackage,
  WidgetComponent,
  WidgetParams, Component, WidgetComponentContainer
} from '@inspark/widget-common/interface';

interface WidgetInfoBoardParameters {
  data: {
    title: string;
  };
}

/**
 * Компонент/контроллер виджета
 */
class WidgetInfoBoardComponent extends WidgetComponent {
  media = {
    img: require('./media/tableExample0.svg')
  };
}

/**
 * Так как виджет является самостоятельной сущностью и родительское приложение не знает
 * о наборе данных, которые ему нужны, то необходимо явно описать набор данных, который
 * должен вернуться из родительского приложения.
 */
const REQUEST_PARAMS: WidgetParams = {
  data: {
    title: 'Информационный виджет',
    item_type: ITEM_TYPE.single
  }
};


@Component({
  templateUrl: './widget.info-board.html',
})
class WidgetContainer extends WidgetComponentContainer {
  values: WidgetInfoBoardParameters;
  component = new WidgetInfoBoardComponent();
}


/**
 * Конфигурация виджета
 * @param template - шаблон виджета
 * @param component - компонент/контроллер виджета
 * @param params - набор данных, которые нужно получить у сервера
 * @param size - минимальные размеры виджета
 * @param styles - inline стили виджета
 */
const component: WidgetPackage = {
  template: require('./widget.info-board.html'),
  component: new WidgetInfoBoardComponent(),
  params: REQUEST_PARAMS,
  size: {'sm': {'x': 0, 'y': 0, 'w': 3, 'h': 6}, 'lg': {'x': 0, 'y': 0, 'w': 5, 'h': 7}, 'mobile': {'x': 0, 'y': 0, 'w': 2, 'h': 7}},
  styles: require('./widget.info-board.scss'),
};


export default component;

