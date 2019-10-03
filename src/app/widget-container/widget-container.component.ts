import {
  Compiler,
  Component,
  Input,
  NgModuleFactory, OnChanges,
  OnInit, SimpleChange,
} from '@angular/core';
import {
  WidgetPackage,
  SiteTheme,
  WidgetParams,
  CommunicationService,
  WidgetContainer,
  WidgetContainerDevOptions
} from '@inspark/widget-common';


@Component({
  selector: 'app-widget-container',
  templateUrl: './widget-container.component.html',
  styleUrls: ['./widget-container.component.scss']
})
export class WidgetContainerComponent extends WidgetContainer implements OnInit, OnChanges {

  dynamicComponent;
  dynamicModule: NgModuleFactory<any>;

  theme: SiteTheme = SiteTheme.dark;


  @Input() params: WidgetParams;
  @Input() widget: WidgetPackage;

  constructor(private compiler: Compiler, private communication: CommunicationService) {
    super();
    this.communication.create(0);
  }

  ngOnChanges(changes: { [k: string]: SimpleChange }) {
    console.log('changes', changes.widget);
    if (changes.widget.currentValue !== changes.widget.previousValue) {
      this.loadWidget();
    }
  }

  loadWidget() {
    console.log('loadWidget', this.widget);
    try {
      this.dynamicComponent = this.createNewComponent({widgetPackage: this.widget, isDev: true} as WidgetContainerDevOptions);
      this.dynamicModule = this.compiler.compileModuleSync(this.createComponentModule(this.dynamicComponent));
    } catch (e) {
      console.error('ERROR COMPONENT CREATE', e);
    }
  }

  ngOnInit() {

  }


}
