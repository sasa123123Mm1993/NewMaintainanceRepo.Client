import { userInsert } from '../../../models/user';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { SidemenuComponent } from '../../../shared/sidemenu/sidemenu.component';
import { CommonModule } from '@angular/common';
import { MeterService } from '../../../services/meter.service';
import { Table, TableModule } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SharedModule } from '../../../shared/sharedModules';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { LoaderService } from '../../../services/loader.service';

@Component({
  selector: 'app-users-settings',
  standalone: true,
  imports: [SidemenuComponent, CommonModule, SharedModule, ReactiveFormsModule],
  templateUrl: './users-settings.component.html',
  styleUrl: './users-settings.component.scss',
  providers: [ConfirmationService, MessageService, FormBuilder, Validators],
})
export default class UsersSettingsComponent {
  constructor(
    private meterService: MeterService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private loaderService: LoaderService
  ) {}

  //forms
  userForm = this.fb.group({
    fullName: ['', Validators.required],
    nationalId: [
      '',
      [
        Validators.required,
        Validators.pattern(
          '^([2-3]{1})([0-9]{2})(0[1-9]|1[012])(0[1-9]|[1-2][0-9]|3[0-1])(0[1-4]|[1-2][1-9]|3[1-5]|88)[0-9]{3}([0-9]{1})[0-9]{1}$'
        ),
      ],
    ],
    smallDepId: ['', Validators.required],
    userName: ['', Validators.required],
    userRole: ['', Validators.required],
    isActive: true,
  });
  editUserForm = this.fb.group({
    fullName: ['', Validators.required],
    nationalId: [
      '',
      [
        Validators.required,
        Validators.pattern(
          '^([2-3]{1})([0-9]{2})(0[1-9]|1[012])(0[1-9]|[1-2][0-9]|3[0-1])(0[1-4]|[1-2][1-9]|3[1-5]|88)[0-9]{3}([0-9]{1})[0-9]{1}$'
        ),
      ],
    ],
    smallDepId: ['', Validators.required],
    userName: ['', Validators.required],
    userRole: ['', Validators.required],
    isActive: true,
  });


  showAddModal: boolean = false;
  showEditModal: boolean = false;
  visibleConfirmDialog: boolean = false;
  mainDepartements: any = [];
  roles: any = [];
  userList: any = [];
  userObj: any = {};
  userDepartments: any = [];
  openAddModal() {
    this.showAddModal = true;
    this.userObj = {};
  }
  //get all main departements
  getSmallDeps() {
    this.loaderService.showLoader();
    this.meterService.getSmallDeps().subscribe({
      next: (res) => {
        this.mainDepartements = res;
        this.mainDepartements.forEach(function (item: any) {
          item.checked = false;
        });
        console.log('deeeeeeeeeeeeps', this.mainDepartements);
        this.loaderService.hideLoader();
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
    this.loaderService.showLoader();
    this.meterService.getAllUsers().subscribe({
      next: (res) => {
        this.userList = res;
        console.log(this.userList);
        this.loaderService.hideLoader();
      },
    });
  }
  selectedDeps: any = [];
  getUserById(userId: any) {
    this.loaderService.showLoader();
    console.log('idddddd', userId);
    this.getSmallDeps();
    this.meterService.getUserById(userId, '').subscribe({
      next: (res) => {
        console.log('the user is :', res);
        this.userObj = res;
        this.userDepartments = res.userSmallDepartmentIDs;
        if (this.userDepartments.length > 0) {
          for (let i = 0; i < this.mainDepartements.length; i++) {
            for (let j = 0; j < this.userDepartments.length; j++) {
              if (this.mainDepartements[i].id == this.userDepartments[j]) {
                this.mainDepartements[i].checked = true;
                console.log('main with checked', this.mainDepartements[i]);
              }
            }
          }
          console.log('main', this.mainDepartements);
        }
        this.loaderService.hideLoader();
      },
    });
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
    //user.isActive = JSON.parse(isAct);
    user.natId = user.natId.toString();
    console.log('addddddeeedddd useeeeeeeeeeeer', user);
    this.meterService.addUser(user).subscribe({
      next: (res) => {
        console.log('after user added', res);
        this.showAddModal = false;
        this.getAllUsers();
      },
    });
  }
  smallDepsIds: any = [];
  updateUser(userObj: any) {
    console.log('updated user', userObj);
    for (let i = 0; i < this.mainDepartements.length; i++) {
      if (this.mainDepartements[i].checked == true) {
        this.smallDepsIds.push(this.mainDepartements[i].id);
        console.log('selected with checked in update', this.smallDepsIds);
      }
    }
    console.log('checked deps in updated user', this.mainDepartements);
    const userObjToUpdate = {
      natId: userObj.nationalId,
      roleId: userObj.roleId,
      isActive: userObj.isActive,
      userName: userObj.userName,
      fullName: userObj.fullName,
      smallDepartmentsIds: this.smallDepsIds,
    };
    console.log('updated user', userObjToUpdate);
    this.meterService.updateUser(userObj.id, userObjToUpdate).subscribe({
      next: (res) => {
        console.log('updated user', res);
        this.showEditModal = false;
      },
    });
  }
  ngOnInit(): void {
    //init func
    this.getAllUsers();
    this.getSmallDeps();
    this.getRoles();
  }
  @ViewChild('dt') dt!: Table;
  applyFilterGlobal($event: any, stringVal: any) {
    this.dt.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }
  reloadPage() {
    window.location.reload();
  }
}
