import { Component } from '@angular/core';
import { SidemenuComponent } from '../../../shared/sidemenu/sidemenu.component';
import { CommonModule } from '@angular/common';
import { MeterService } from '../../../services/meter.service';
import { Table, TableModule } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SharedModule } from '../../../shared/sharedModules';
import { FormsModule } from '@angular/forms';
import { identifierName } from '@angular/compiler';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { LoaderService } from '../../../services/loader.service';
import { cardCreate } from '../../../models/card';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [
    SidemenuComponent,
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss',
  providers: [ConfirmationService, MessageService, FormBuilder, Validators],
})
export default class CardsComponent {
  constructor(
    private meterService: MeterService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private loaderService: LoaderService
  ) {}
  logged: boolean = true;
  visibleSuccessDialog: boolean = false;
  visibleFailDialog: boolean = false;
  cardTasks: any = [];
  techList: any = [];
  activityList: any = [];
  dateType:string = '';
  cardCreationDate:any=new Date();
  cardObj: cardCreate = {
    // code: '',
    // techId: '',
    // cardCreationDate: new Date(),
    // cardEndDate: new Date(),
    meterType: 0, //
    employeeId: 0, //
    propertyId: '', //
    startDate: new Date(), //
    expirationDate: new Date(), //
    limitation: 0, //
    dateTimeMode: null, //
    cutoffAlarmLimitBalance: null, //
    tariffTypeId: null, //
    automaticDate: new Date(), // لازم تاريخ
    meterSerial: '00000000', // لازم رقم عداد
    meterTypeModel: '',  //
    oldMeterSerial: null, //
    newMeterSerial: null, //
    labTestCardAvailableTime: null, //
    company: '3', //
    reverseCardRecoveryTime: null, //
    labTestCardAvailableKWh: null, //
    oldDistributionCompanyCode: null, //
    newDistributionCompanyCode: null, //
    modificationStyle: false, //
    isActive: false, //
    automaticTime: new Date(), //
    controledMetersList: [], //
    tampersCodes: [], //
  };
  releaseCardForm = this.fb.group({
    cardCode: ['', Validators.required],
    techId: ['', Validators.required],
    meterType: [0, Validators.required],
    dateType: [''],
    automaticDate: [''],
    reverseCardRecoveryTime: [''],
  });

  //get all card tasks
  getCardTasksList() {
    this.meterService.getAlloptionsOfControlCards().subscribe({
      next: (res) => {
        this.cardTasks = res;
        console.log('tasksssssssssss', res);
      },
    });
  }
  //get all techs
  getTechniciansList() {
    this.meterService.getAllTechinicians().subscribe({
      next: (res) => {
        this.techList = res;
        console.log('techList', res);
      },
    });
  }
  getAllActivities() {
    this.meterService.getAllActivityTypes().subscribe({
      next: (res) => {
        this.activityList = res;
      },
    });
  }
  createControlCard() {

    console.log('addedddddddddd obj :', this.cardObj);
    this.meterService.createControlCard(this.cardObj).subscribe({
      next: (res) => {
        this.loaderService.showLoader();
        const writeObj = {
          CardToken: res.payload,
        };
        this.meterService.writeCard(writeObj).subscribe({
          next: (res) => {
            console.log('after write', res);
            if (res == 0) {
              this.visibleSuccessDialog = true;
              this.loaderService.hideLoader();
            } else {
              this.visibleFailDialog = true;
              this.loaderService.hideLoader();
            }
          },
        });
        console.log(res);
      },
    });
  }
  ngOnInit(): void {
    this.getCardTasksList();
    this.getTechniciansList();
    this.getAllActivities();
  }
}
