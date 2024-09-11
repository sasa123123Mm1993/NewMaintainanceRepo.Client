import { Component, ElementRef, ViewChild } from '@angular/core';
import { SidemenuComponent } from '../../../shared/sidemenu/sidemenu.component';
import { CommonModule } from '@angular/common';
import { MeterService } from '../../../services/meter.service';
import { MeterReason, MeterReasonInsertDto } from '../../../models/meter';
import { Table, TableModule } from 'primeng/table';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { SharedModule } from '../../../shared/sharedModules';
import { InputNumber, InputNumberModule } from 'primeng/inputnumber';
import { ConfirmationService, MessageService } from 'primeng/api';
import { LoaderService } from '../../../services/loader.service';

@Component({
  selector: 'app-off-merter-reasons',
  standalone: true,
  imports: [
    SidemenuComponent,
    CommonModule,
    TableModule,
    SharedModule,
    InputNumberModule,
    ReactiveFormsModule,
  ],
  templateUrl: './off-merter-reasons.component.html',
  styleUrls: ['./off-merter-reasons.component.scss'],
  providers: [ConfirmationService, MessageService, FormBuilder, Validators],
})
export default class OffMerterReasonsComponent {
  //forms
  reasonForm = this.fb.group({
    name: ['', Validators.required],
    code: ['', Validators.required],
  });

  MetersOffReasons!: any;
  MetersOffReason: MeterReasonInsertDto = {
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
    private messageService: MessageService,
    private fb: FormBuilder,
    private loaderService: LoaderService
  ) {}
  logged: boolean = true;
  ngOnInit(): void {
    this.getAllReasons();
  }
  getAllReasons() {
    this.loaderService.showLoader();
    this.meterService.getAllMetersOffReasons().subscribe({
      next: (res) => {
        console.log('res', res);
        this.MetersOffReasons = res.filter(
          (reasons) => reasons.isDeleted == false
        );
        this.loaderService.hideLoader();
      },
    });
  }
  openAddModal() {
    this.visible = true;
    this.MetersOffReason = {
      name: '',
      code: 0,
    };
    this.reasonForm = this.fb.group({
      name: ['', Validators.required],
      code: ['', Validators.required],
    });
  }
  createReason(name: string, code: any) {
    this.loaderService.showLoader();
    this.visible = false;
    this.MetersOffReason.name = name;
    this.MetersOffReason.code = code;
    this.meterService.addMetersOffReason(this.MetersOffReason).subscribe({
      next: (res) => {
        this.getAllReasons();
        this.reasonNameRef.nativeElement.value = '';
        this.inputNumberComponent.value = 0;
        this.loaderService.hideLoader();
      },
    });
  }
  cancelAdd() {
    this.visible = false;
    this.reasonNameRef.nativeElement.value = '';
    this.inputNumberComponent.value = null;
  }

  reasonId!: number;

  openEditDialog(reason: MeterReason) {
    this.loaderService.showLoader();
    this.showEdit = true;
    this.meterService.getMetersOffReasonById(reason.id).subscribe({
      next: (res) => {
        this.MetersOffReason = res;
        this.reasonId = res.id;
        this.loaderService.hideLoader();
      },
    });
  }

  editReason() {
    this.loaderService.showLoader();
    this.meterService
      .editMetersOffReason(this.reasonId, this.MetersOffReason)
      .subscribe({
        next: (res) => {
          this.getAllReasons();
          this.showEdit = false;
          this.loaderService.hideLoader();
        },
      });
  }

  deleteReason(event: Event, reasonObj: any) {
    console.log('reeeeeeeeeeeeesssssssssssssson', reasonObj);
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
        this.loaderService.showLoader();
        this.meterService.deleteMetersOffReason(reasonObj.id).subscribe({
          next: (res) => {
            this.messageService.add({
              severity: 'info',
              summary: 'تأكيد',
              detail: 'تم الحذف بنجاح',
            });
            this.getAllReasons();
          },
        });
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
  applyFilterGlobal($event: any, stringVal: any) {
    this.dt.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }
}
