import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeterService } from '../../../configs/meter.service';
import { Table, TableModule } from 'primeng/table';
import { SharedModule } from '../../../shared/sharedModules';
import { SidemenuComponent } from '../../../shared/sidemenu/sidemenu.component';
import { ConfirmationService, MessageService } from 'primeng/api';
interface Category {
  name: string;
  code: string;
}
@Component({
  selector: 'app-users-permissions',
  standalone: true,
  imports: [CommonModule, TableModule, SharedModule],
  templateUrl: './users-permissions.component.html',
  styleUrl: './users-permissions.component.scss',
  providers: [ConfirmationService, MessageService],
})
export default class UsersPermissionsComponent {
  constructor(
    private meterService: MeterService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}
  permissionList: any = [];
  ngOnInit(): void {
    this.meterService.getAllMetersOffReasons().subscribe({
      next: (res) => {
        this.permissionList = res;
      },
    });
  }
  showAddModal: boolean = false;
  showEditModal: boolean = false;

  deleteRole(event: Event) {
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
        this.messageService.add({
          severity: 'info',
          summary: 'تأكيد',
          detail: 'تم الحذف بنجاح',
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
}
