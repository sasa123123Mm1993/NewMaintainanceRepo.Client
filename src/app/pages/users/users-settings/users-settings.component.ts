import { userInsert } from './../user';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { SidemenuComponent } from '../../../shared/sidemenu/sidemenu.component';
import { CommonModule } from '@angular/common';
import { MeterService } from '../../../configs/meter.service';
import { Table, TableModule } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SharedModule } from '../../../shared/sharedModules';
// import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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
  visibleConfirmDialog: boolean = false;
  // formGroup!: FormGroup;
  selectedRole!: string;

  constructor(
    private meterService: MeterService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router
  ) {}
  mainDepartements: any = [];
  roles: any = [];
  userList: any = [];
  userObj: userInsert = {
    nationalId: '',
    roleId: '',
    isActive: false,
    userName: '',
    fullName: '',
    smallDepartmentsIds: undefined,
  };
  userDepartments: any = [];
  openAddModal() {
    this.showAddModal = true;
    this.userObj = {
      nationalId: '',
      roleId: '',
      isActive: false,
      userName: '',
      fullName: '',
      smallDepartmentsIds: undefined,
    };
  }
  //get all main departements
  getMainDepartements() {
    this.meterService.getAllMainDepartments().subscribe({
      next: (res) => {
        this.mainDepartements = res;
        this.mainDepartements.forEach(function (item: any) {
          item.checked = false;
        });
        console.log(this.mainDepartements);
      },
    });
  }
  //get all roles
  getRoles() {
    this.meterService.getAllRoles().subscribe({
      next: (res) => {
        console.log('rollllllllllse', res);
        this.roles = res;
      },
    });
  }
  //get list to fill table
  getAllUsers() {
    this.meterService.getAllUsers().subscribe({
      next: (res) => {
        this.userList = res;
        console.log(this.userList);
      },
    });
  }
  selectedDeps: any = [];
  getUserById(userId: any) {
    console.log('idddddd', userId);
    this.meterService.getUserById(userId, '').subscribe({
      next: (res) => {
        console.log('the user is :', res);
        this.userObj = res;
        this.userDepartments = res.departments;
        if (this.userDepartments.length > 0) {
          debugger;
          for (let i = 0; i < this.mainDepartements.length; i++) {
            for (let j = 0; j < this.userDepartments.length; j++) {
              if (this.mainDepartements[i].id == this.userDepartments[j].id) {
                this.mainDepartements[i].checked = true;
                console.log(this.mainDepartements[i]);
              } else {
                this.mainDepartements[i].checked = false;
              }
            }
          }
          console.log('main', this.mainDepartements);
        }
      },
    });
  }
  ngOnInit(): void {
    //init func
    this.getAllUsers();
    this.getMainDepartements();
    this.getRoles();
  }
  banUser(event: Event, userId: any) {
    console.log(userId);
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: ' هل تريد حظر هذا المستخدم ؟',
      header: 'تأكيد الحظر',
      icon: 'pi pi-ban-circle',
      acceptButtonStyleClass: 'p-button-text p-button-danger',
      rejectButtonStyleClass: ' p-button-text defaultTxtColor',
      acceptIcon: 'none',
      rejectIcon: 'none',

      accept: () => {
        this.meterService.deactiveUser(userId, '').subscribe({
          next: (res) => {
            console.log(res);
            this.getAllUsers();
            this.messageService.add({
              severity: 'info',
              summary: 'تأكيد',
              detail: 'تم الحظر بنجاح',
            });
          },
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
  activateUser(event: Event, userId: any) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: ' هل تريد تفعيل هذا المستخدم ؟',
      header: 'تأكيد التفعيل',
      icon: 'pi pi-check',
      acceptButtonStyleClass: 'defaultTxtColor p-button-text',
      rejectButtonStyleClass: ' p-button-danger p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',

      accept: () => {
        this.meterService.deactiveUser(userId, '').subscribe({
          next: (res) => {
            this.messageService.add({
              severity: 'info',
              summary: 'تأكيد',
              detail: 'تم التفعيل بنجاح',
            });
            console.log(res);
            this.getAllUsers();
          },
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'إلغاء',
          detail: 'تم رفض التفعيل',
        });
      },
    });
  }

  resetPassword(userId: any) {
    this.meterService.resetUserPassword(userId, '').subscribe({
      next: (res) => {
        console.log('reset', res);
        this.visibleConfirmDialog = true;
      },
    });
  }
  addUser(user: userInsert) {
    console.log('addddddeeedddd useeeeeeeeeeeer', user);
    this.meterService.addUser(user).subscribe({
      next: (res) => {
        console.log('after user added', res);
        this.showAddModal=false;
        this.getAllUsers();
      },
    });
  }
  @ViewChild('dt') dt!: Table;
  applyFilterGlobal($event: any, stringVal: any) {
    this.dt.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }
  reloadPage() {
    window.location.reload();
  }
}
