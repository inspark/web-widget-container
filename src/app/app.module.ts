import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {WidgetContainerComponent} from './widget-container/widget-container.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {DashboardSharedModule, CommunicationService} from '@inspark/widget-common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {WidgetOptionsComponent} from './widget-options/widget-options.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NvD3Module} from 'angular2-nvd3';
import {DashboardPanelComponent} from './panel/dashboard-panel.component';
import {ControlsComponent} from './panel/controls/controls.component';
import {ComponentsModule} from './components.module';
import {GridsterModule} from '@blare/angular2gridster';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    WidgetOptionsComponent,
    DashboardPanelComponent,
    ControlsComponent,
    WidgetContainerComponent,
  ],
  exports: [
    TranslateModule,
    NvD3Module,
  ],
  imports: [
    GridsterModule.forRoot(),
    ComponentsModule,
    NgbModule,
    CommonModule,
    NvD3Module,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
    ,
    DashboardSharedModule
  ],
  providers: [CommunicationService],
  bootstrap: [AppComponent],
})
export class AppModule {
}


platformBrowserDynamic().bootstrapModule(AppModule);


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
