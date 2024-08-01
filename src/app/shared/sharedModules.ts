import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//shareeeeeeed/////////////////////////////////////////////
import { Table, TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { DividerModule } from 'primeng/divider';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { CheckboxModule } from 'primeng/checkbox';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { BadgeModule } from 'primeng/badge';
import { NgxIndexedDBModule, DBConfig } from 'ngx-indexed-db';
// import { MY_AWESOME_SERVICE_STORAGE } from '../pages/login/login.component';

import { AuthService } from './service/auth.service';

const dbConfig: DBConfig  = {
  name: 'myDb',
  version: 1,
  objectStoresMeta: [{
    store: 'user',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
      { name: 'name', keypath: 'name', options: { unique: false } }
    ]
  }]
};
@NgModule({
  imports: [CommonModule,NgxIndexedDBModule.forRoot(dbConfig)],
  // providers:[
  //   {provide: MY_AWESOME_SERVICE_STORAGE, useExisting: SESSION_STORAGE},

  // ],
  declarations: [],
  exports: [
    CommonModule,
    TableModule,
    ToolbarModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    MultiSelectModule,
    DialogModule,
    InputNumberModule,
    ConfirmDialogModule,
    ToastModule,
    RadioButtonModule,
    CalendarModule,
    DropdownModule,
    DividerModule,
    InputTextareaModule,
    InputGroupModule,
    InputGroupAddonModule,
    IconFieldModule,
    InputIconModule,
    CheckboxModule,
    TagModule,
    TooltipModule,
    OverlayPanelModule,
    ReactiveFormsModule,
    BadgeModule
  ],
})
export class SharedModule {}
