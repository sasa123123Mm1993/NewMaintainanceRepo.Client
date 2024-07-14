import { Component, ElementRef, ViewChild } from '@angular/core';
import { SidemenuComponent } from '../../../shared/sidemenu/sidemenu.component';
import { CommonModule } from '@angular/common';
import { MeterService } from '../../../configs/meter.service';
import { Table, TableModule } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SharedModule } from '../../../shared/sharedModules';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-users-settings',
  standalone: true,
  imports: [SidemenuComponent, CommonModule, SharedModule],
  templateUrl: './users-settings.component.html',
  styleUrl: './users-settings.component.scss',
  providers: [ConfirmationService, MessageService],
})
export default class UsersSettingsComponent {
  showAddModal: boolean = false;
  showEditModal: boolean = false;
  formGroup!: FormGroup;
  selectedRole!: string;

  constructor(
    private meterService: MeterService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}
  mainDepartements: any = [];
  userList: any = [];
  ngOnInit(): void {
    //get list to fill table
    this.meterService.getAllMetersOffReasons().subscribe({
      next: (res) => {
        this.userList = res;
      },
    });
    //get all main departements
    this.meterService.getAllMainDepartments().subscribe({
      next: (res) => {
        this.mainDepartements = res;
        console.log(this.mainDepartements);
      },
    });
  }
  banUser(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: ' هل تريد حظر هذا المستخدم ؟',
      header: 'تأكيد الحظر',
      icon: 'pi pi-ban-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',

      accept: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'تأكيد',
          detail: 'تم الحظر بنجاح',
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'إلغاء',
          detail: 'تم رفض الحظر',
        });
      },
    });
  }
}
