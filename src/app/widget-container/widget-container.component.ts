import {
  Compiler,
  Component, EventEmitter,
  Input,
  NgModuleFactory, OnChanges,
  OnInit, Output, SimpleChange,
} from '@angular/core';
import {
  WidgetPackage,
  SiteTheme,
  WidgetParams,
  CommunicationService,
  WidgetContainer,
  WidgetContainerDevOptions, ItemSingle
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

  @Output() ready = new EventEmitter();

  constructor(private compiler: Compiler, private communication: CommunicationService) {
    super();
    this.communication.create(0);
  }

  ngOnChanges(changes: { [k: string]: SimpleChange }) {
    if (changes.widget.currentValue !== changes.widget.previousValue) {
      this.loadWidget();
    }
  }

  setManual(param: ItemSingle, value: boolean) {
    param.data.manually = value;
  }

  loadWidget() {
    try {
      this.dynamicComponent = this.createNewComponent({
        widgetPackage: this.widget,
        isDev: true,
        setManual: this.setManual.bind(this)
      } as WidgetContainerDevOptions);
      this.dynamicModule = this.compiler.compileModuleSync(this.createComponentModule(this.dynamicComponent));
      this.ready.emit();
    } catch (e) {
      console.error('ERROR COMPONENT CREATE', e);
    }
  }

  ngOnInit() {

  }


}
