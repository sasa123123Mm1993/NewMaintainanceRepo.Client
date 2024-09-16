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
    private fb: FormBuilder
  ) {}
  logged: boolean = true;
  cardTasks: any = [];
  techList: any = [];
  cardObj: any = {
    code: '',
    techName: '',
    techId: '',
    cardCreationDate: new Date(),
    cardEndDate: new Date(),
    meterType: 0,
  };
  releaseCardForm = this.fb.group({
    cardCode: ['', Validators.required],
    techId: ['', Validators.required],
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

  createControlCard(createObj: any) {
    const cardObj = {
      employeeId: createObj.techId,
      propertyId: createObj.code,
      startDate: createObj.cardCreationDate,
      expirationDate: createObj.cardEndDate,
      limitation: 0,
      dateTimeMode: null,
      cutoffAlarmLimitBalance: null,
      meterType: 0,
      tariffTypeId: null,
      automaticDate: new Date(),
      meterSerial: '00000000',
      meterTypeModel: '',
      oldMeterSerial: null,
      newMeterSerial: null,
      labTestCardAvailableTime: null,
      company: '',
      reverseCardRecoveryTime: null,
      labTestCardAvailableKWh: null,
      oldDistributionCompanyCode: null,
      newDistributionCompanyCode: null,
      modificationStyle: true,
      isActive: true,
      automaticTime: new Date(),
      controledMetersList: [],
      tampersCodes: [],
    };
    //

    console.log('addedddddddddd obj :', cardObj);
    this.meterService.createControlCard(cardObj).subscribe({
      next: (res) => {
        console.log(res);
      },
    });
  }
  ngOnInit(): void {
    this.getCardTasksList();
    this.getTechniciansList();
    // this.cardTasks = [
    //   { name: 'ضبط الوقت و التاريخ اوتوماتيك', id: 1 },
    //   { name: 'ازالة تلاعبات و اخطاء', id: 2 },
    //   { name: 'فتح و غلق مفاتيح التوصيل', id: 3 },
    //   { name: 'ضبط الوقت و التاريخ يدويا', id: 4 },
    //   { name: 'تصفير عداد', id: 5 },
    //   { name: 'اختبار مفتاح التوصيل', id: 6 },
    //   { name: 'تغيير شرائح التعريفة', id: 7 },
    //   { name: 'ضبط حد الفصل و الانذار اتوماتيك', id: 8 },
    //   { name: 'اطلاق تيار', id: 9 },
    //   { name: 'تغيير رقم العداد ', id: 10 },
    //   { name: 'اصدار كارت المعمل ', id: 11 },
    //   { name: 'تغيير كود الشركة ', id: 12 },
    // ];
    // this.techList = [
    //   {
    //     name: 'ahmed saber',
    //     id: 1,
    //   },
    //   {
    //     name: 'mostafa tawfik',
    //     id: 2,
    //   },
    //   {
    //     name: 'mohamed nabwi',
    //     id: 3,
    //   },
    // ];
  }
}
