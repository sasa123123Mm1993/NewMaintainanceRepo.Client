import { Component, ElementRef, ViewChild } from '@angular/core';
import { SidemenuComponent } from '../../../shared/sidemenu/sidemenu.component';
import { CommonModule } from '@angular/common';
import { MeterService } from '../../../configs/meter.service';
import { Table, TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { DialogModule } from 'primeng/dialog';
import { InputNumber, InputNumberModule } from 'primeng/inputnumber';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { Meter, MeterInsertDto } from '../meter';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

@Component({
  selector: 'app-off-merter-reasons',
  standalone: true,
  imports: [
    SidemenuComponent,
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
    InputGroupModule,
    InputGroupAddonModule,
    IconFieldModule,
    InputIconModule,
  ],
  templateUrl: './off-merter-reasons.component.html',
  styleUrls: ['./off-merter-reasons.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export default class OffMerterReasonsComponent {
  MetersOffReasons!: any;
  MetersOffReason: MeterInsertDto = {
    name: '',
    code: 0,
  };
  visible: boolean = false;
  showEdit: boolean = false;
  loading: boolean = false;
  @ViewChild('reasonName', { static: true }) reasonNameRef!: ElementRef;
  @ViewChild('reasonCode') inputNumberComponent!: InputNumber;
  constructor(
    private meterService: MeterService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}
  logged: boolean = true;
  ngOnInit(): void {
    this.getAllReasons();
  }
  getAllReasons() {
    this.meterService.getAllMetersOffReasons().subscribe({
      next: (res) => {
        this.MetersOffReasons = res;
      },
    });
  }

  createReason(name: string, code: any) {
    debugger;
    this.visible = false;
    this.MetersOffReason.name = name;
    this.MetersOffReason.code = code;
    this.meterService.addMetersOffReason(this.MetersOffReason).subscribe({
      next: (res) => {
        this.getAllReasons();
        this.reasonNameRef.nativeElement.value = '';
        this.inputNumberComponent.value = 0;
      },
    });
  }
  cancelAdd() {
    this.visible = false;
    this.reasonNameRef.nativeElement.value = '';
    this.inputNumberComponent.value = null;
  }

  reasonId!: number;

  openEditDialog(reason: Meter) {
    this.showEdit = true;
    this.meterService.getMetersOffReasonById(reason.id).subscribe({
      next: (res) => {
        this.MetersOffReason = res;
        this.reasonId = res.id;
      },
    });
  }

  editReason() {
    this.meterService
      .editMetersOffReason(this.reasonId, this.MetersOffReason)
      .subscribe({
        next: (res) => {
          this.getAllReasons();
          this.showEdit = false;
        },
      });
  }

  deleteReason(event: Event, reasonId: number) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: ' هل تريد تأكيد حذف العنصر ؟',
      header: 'تأكيد الحذف',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',

      accept: () => {
        this.meterService.deleteMetersOffReason(reasonId).subscribe({
          next:(res)=>{
            this.messageService.add({
              severity: 'info',
              summary: 'تأكيد',
              detail: 'تم الحذف بنجاح',
            });
            this.getAllReasons();
          }
        })

      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'إلغاء',
          detail: 'تم رفض الحذف',
        });
      },
    });
  }

  @ViewChild('dt') dt!: Table;
  applyFilterGlobal($event : any, stringVal : any) {
    this.dt.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }
}
