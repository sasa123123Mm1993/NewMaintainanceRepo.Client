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

@NgModule({
  imports: [CommonModule],
  declarations: [],
  exports: [
    CommonModule,
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
  ],
})
export class SharedModule {}
