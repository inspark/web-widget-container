import WidgetEvent from './widgets/widget-event/widget.event';
import WidgetChart from './widgets/widget-chart/widget.chart';
import WidgetSignal from './widgets/widget-signal/widget.signal';
import WidgetPieInterval from './widgets/widget-pie-interval/widget.pie-interval';
import WidgetTable from './widgets/widget-table/widget.table';
import WidgetComplex from './widgets/widget-complex/widget.complex';
import WidgetText from './widgets/widget-text/widget.text';
import {WidgetPackage} from '@inspark/widget-common';


export interface LibraryWidget {
  name: string;
  package: WidgetPackage;
}

class WidgetLibrary {

  list: LibraryWidget[];

  constructor(widgets: LibraryWidget[]) {
    this.list = widgets;
  }

  getList(): LibraryWidget[] {
    return this.list;
  }

}


export const widgetLibrary = new WidgetLibrary([
  {name: 'WidgetEvent', package: WidgetEvent},
  {name: 'WidgetChart', package: WidgetChart},
  {name: 'WidgetSignal', package: WidgetSignal},
  {name: 'WidgetPieInterval', package: WidgetPieInterval},
  {name: 'WidgetTable', package: WidgetTable},
  {name: 'WidgetComplex', package: WidgetComplex},
  {name: 'WidgetText', package: WidgetText},
] as LibraryWidget[]);

