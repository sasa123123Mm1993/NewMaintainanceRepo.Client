import { Component } from '@angular/core';
import { Product } from './../../dto/meter';
import { CommonModule } from '@angular/common';
import { MeterService } from '../../../configs/meter.service';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';

interface Category {
  name: string;
  code: string;
}
@Component({
  selector: 'app-users-permissions',
  standalone: true,
  imports: [
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
  ],
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
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.meterService.getAllMetersOffReasons().subscribe({
      next: (res) => {
        this.productList = res;
      },
    });
    this.categories = [
      { name: `men's clothing`, code: '1' },
      { name: 'jewelery', code: '2' },
      { name: 'electronics', code: '3' },
      { name: `women's clothing`, code: '4' },
    ];
  }
  logged: boolean = true;
  visible: boolean = false;
  showEdit: boolean = false;
  productList!: any;
  categories!: Category[];
  selectedCategory!: Category[];
  product: Product = {
    id: 0,
    title: '',
    price: 0,
    description: '',
    category: '',
    image: '',
  };

  showDialog() {
    this.visible = true;
  }

  showEditDialog() {
    this.showEdit = true;
  }

  filter() {
    console.log('hhhhhhhhhhhhhhhh', this.selectedCategory);
  }
  addProduct() {
    console.log('this.product');
  }

  deleteReason(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',

      accept: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'Deleted successfully',
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'Deleted rejected',
        });
      },
    });
  }
}
