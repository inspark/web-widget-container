import {NgModule} from '@angular/core';
import {ListboxModule} from 'primeng/listbox';
import {ButtonModule} from 'primeng/button';
import {CheckboxModule} from 'primeng/checkbox';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {CardModule} from 'primeng/card';
import {StepsModule} from 'primeng/steps';
import {FieldsetModule} from 'primeng/fieldset';
import {TabViewModule} from 'primeng/tabview';
import {SelectButtonModule} from 'primeng/selectbutton';
@NgModule({
  imports: [
    ButtonModule,
    ListboxModule,
    CheckboxModule,
    CommonModule,
    FormsModule,
    DynamicDialogModule,
    ConfirmDialogModule,
    CardModule,
    StepsModule,
    FieldsetModule,
    TabViewModule,
    SelectButtonModule,
  ],
  exports: [
    DynamicDialogModule,
    ConfirmDialogModule,
    CardModule,
    StepsModule,
    FieldsetModule,
    TabViewModule,
    ListboxModule,
    SelectButtonModule,
  ],
})
export class ComponentsModule {
}
