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
  formGroup!: FormGroup;
  selectedRole!: string;

  constructor(
    private meterService: MeterService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}
  mainDepartements: any = [];
  getAllMainDepartments() {
    this.meterService.getAllMainDepartments().subscribe({
      next: (res) => {
        this.mainDepartements = res;
        console.log(this.mainDepartements);
      },
    });
  }
  ngOnInit(): void {
    this.getAllMainDepartments();
    this.formGroup = new FormGroup({
      userDepartements: new FormControl<string | null>(null),
      activateUser: new FormControl<string | null>(null),
    });
  }
}
