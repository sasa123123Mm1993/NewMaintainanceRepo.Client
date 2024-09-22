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
  tampersList: any = [];
  tampersCodes: any = [];
  dateType: string = '';
  cardCreationDate: any;
  cardExpireDate: any;
  ///////////////////////////
  metersNums: any[] = [];
  newMeter: any = '';
  selectedMeter: string | null = null;

  addMeter(): void {
    debugger;
    console.log('jj');
    if (this.newMeter) {
      this.metersNums.push(this.newMeter); // Add new item to the list
      this.newMeter = ''; // Reset the input
    }
  }

  removeMeter(): void {
    if (this.selectedMeter) {
      this.metersNums = this.metersNums.filter(
        (item) => item !== this.selectedMeter
      ); // Remove the selected item
      this.selectedMeter = null; // Reset the selection
    }
  }

  ///////////////////////////
  cardObj: cardCreate = {
    meterType: 0, //
    employeeId: '', //
    propertyId: '', //
    startDate: new Date(), //
    expirationDate: new Date(), //
    limitation: 0, //
    dateTimeMode: null, //
    cutoffAlarmLimitBalance: null, //
    tariffTypeId: null, //
    AutomaticDate: new Date(), // لازم تاريخ
    // meterSerial: '00000000', // لازم رقم عداد
    meterTypeModel: '', //
    OldMeterSerial: null, //
    NewMeterSerial: null, //
    LabTestCardAvailableTime: null, //
    company: '3', //
    reverseCardRecoveryTime: null, //
    LabTestCardAvailableKWh: null, //
    OldDistributionCompanyCode: null, //
    NewDistributionCompanyCode: null, //
    modificationStyle: false, //
    isActive: false, //
    AutomaticTime: new Date(), //
    controledMetersList: [], //
    tampersCodes: [], //
    ControledMetersList: [],
  };

  releaseCardForm = this.fb.group({
    cardCode: ['', Validators.required],
    techId: ['', Validators.required],
    meterType: [0, Validators.required],
    meterNumber: [''],
    dateType: [''],
    automaticDate: [''],
    reverseCardRecoveryTime: [''],
    tampersCodes: [],
    selectedMeter: [''],
    newMeter: [''],
    TariffTypeId: [''],
    newMeterNum: [''],
    oldMeterNum: [''],
    labAvailableKWh: [''],
    labAvailableTime: [''],
    oldCompanyCode: [''],
    newCompanyCode: [''],
    metersNumsList: [[]],
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
    // ارقام العدادات المضافة
    if (this.cardObj.meterType == 2) {
      if (this.metersNums) {
        this.cardObj.ControledMetersList = this.metersNums;
      }
    }
    // الوقت المحدد فى حالة اختيار ضبط الوقت و التاريخ اتوماتيك
    if (this.cardObj.propertyId == '0') {
      if (this.cardObj.AutomaticDate) {
        // const timeString = this.cardObj.AutomaticDate.toTimeString();
        // this.cardObj.AutomaticTime =(timeString.split(' ')[0]).toJSON() ;
        this.cardObj.AutomaticTime = this.cardObj.AutomaticDate.toISOString();
      }
    }

    console.log('addedddddddddd obj :', this.cardObj);
    this.meterService.createControlCard(this.cardObj).subscribe({
      next: (res) => {
        this.loaderService.showLoader();
        const cardId = res.controlCardId;
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
              this.meterService.cancelControlCardRelease(cardId).subscribe({
                next: (res) => {
                  this.visibleFailDialog = true;
                  alert(res);
                  this.loaderService.hideLoader();
                },
              });
            }
          },
        });
        console.log(res);
      },
    });
  }
  getExpDate() {
    this.meterService.getCardExpDate().subscribe({
      next: (res) => {
        console.log('expppppppp', res);
        this.cardExpireDate = res;
      },
    });
  }
  getReleaseDate() {
    this.meterService.getCardReleaseDate().subscribe({
      next: (res) => {
        console.log('releaseeeeee', res);
        this.cardCreationDate = res;
      },
    });
  }
  setupConditionalValidation() {
    //عداد واحد
    this.releaseCardForm.get('meterType')?.valueChanges.subscribe((value) => {
      console.log('vallll', value);
      const meterNumber = this.releaseCardForm.get('meterNumber');
      if (value == 1) {
        meterNumber?.setValidators([Validators.required]);
      } else {
        meterNumber?.clearValidators();
      }
      meterNumber?.updateValueAndValidity();
    });
    // اضافة عدادات
    // this.releaseCardForm.get('meterType')?.valueChanges.subscribe((value) => {
    //   console.log('vallll', value);
    //   const metersNumsList = this.releaseCardForm.get('metersNumsList');
    //   if (value == 2) {
    //     metersNumsList?.setValidators([Validators.required]);
    //   } else {
    //     metersNumsList?.clearValidators();
    //   }
    //   metersNumsList?.updateValueAndValidity();
    // });
    // الوقت المستغرق
    this.releaseCardForm.get('cardCode')?.valueChanges.subscribe((value) => {
      console.log('vallll', value);
      const reverseCardRecoveryTime = this.releaseCardForm.get(
        'reverseCardRecoveryTime'
      );
      if (value == '5') {
        reverseCardRecoveryTime?.setValidators([Validators.required]);
      } else {
        reverseCardRecoveryTime?.clearValidators();
      }
      reverseCardRecoveryTime?.updateValueAndValidity();
    });
    //  تغيير شريحة تعريفة
    this.releaseCardForm.get('cardCode')?.valueChanges.subscribe((value) => {
      console.log('vallll', value);
      const tarrifType = this.releaseCardForm.get('TariffTypeId');
      if (value == '7') {
        tarrifType?.setValidators([Validators.required]);
      } else {
        tarrifType?.clearValidators();
      }
      tarrifType?.updateValueAndValidity();
    });
    //  تغيير رقم عداد
    this.releaseCardForm.get('cardCode')?.valueChanges.subscribe((value) => {
      console.log('vallll', value);
      const oldMeterNum = this.releaseCardForm.get('oldMeterNum');
      const newMeterNum = this.releaseCardForm.get('newMeterNum');
      if (value == '51') {
        oldMeterNum?.setValidators([Validators.required]);
        newMeterNum?.setValidators([Validators.required]);
      } else {
        oldMeterNum?.clearValidators();
        newMeterNum?.clearValidators();
      }
      oldMeterNum?.updateValueAndValidity();
      newMeterNum?.updateValueAndValidity();
    });
    //  اصدار كارت المعمل
    this.releaseCardForm.get('cardCode')?.valueChanges.subscribe((value) => {
      console.log('vallll', value);
      const labAvailableTime = this.releaseCardForm.get('labAvailableTime');
      const labAvailableKWh = this.releaseCardForm.get('labAvailableKWh');
      if (value == '53') {
        labAvailableTime?.setValidators([Validators.required]);
        labAvailableKWh?.setValidators([Validators.required]);
      } else {
        labAvailableTime?.clearValidators();
        labAvailableKWh?.clearValidators();
      }
      labAvailableTime?.updateValueAndValidity();
      labAvailableKWh?.updateValueAndValidity();
    });
    // تغيير كود الشركة
    this.releaseCardForm.get('cardCode')?.valueChanges.subscribe((value) => {
      console.log('vallll', value);
      const oldCompanyCode = this.releaseCardForm.get('oldCompanyCode');
      const newCompanyCode = this.releaseCardForm.get('newCompanyCode');
      if (value == '50') {
        oldCompanyCode?.setValidators([Validators.required]);
        newCompanyCode?.setValidators([Validators.required]);
      } else {
        oldCompanyCode?.clearValidators();
        newCompanyCode?.clearValidators();
      }
      oldCompanyCode?.updateValueAndValidity();
      newCompanyCode?.updateValueAndValidity();
    });
  }
  getCardCode(code: any) {
    this.loaderService.showLoader();
    if (code == 3) {
      this.meterService.getAllTampers().subscribe({
        next: (res) => {
          console.log('tampers', res);
          this.tampersList = res;
          this.loaderService.hideLoader();
        },
      });
    } else if (code == 0) {
      this.dateType = 'serverDate';
      this.loaderService.hideLoader();
    } else {
      this.loaderService.hideLoader();
    }
  }
  getSelectedTampersCodes(selectedCode: any) {
    this.tampersCodes.push(selectedCode);
    if (this.tampersCodes.length > 2) {
      for (let i = 0; i < this.tampersCodes.length; i++) {
        while (this.tampersCodes.indexOf(this.tampersCodes[i], i + 1) !== -1) {
          this.tampersCodes.splice(
            this.tampersCodes.indexOf(this.tampersCodes[i]),
            1
          );
          this.tampersCodes.splice(
            this.tampersCodes.indexOf(this.tampersCodes[i], i + 1),
            1
          );
        }
      }
    }
    this.cardObj.tampersCodes = this.tampersCodes;
    console.log('selectedddd', this.tampersCodes);
  }
  ngOnInit(): void {
    this.getCardTasksList();
    this.getTechniciansList();
    this.getAllActivities();
    this.getReleaseDate();
    this.getExpDate();
    this.setupConditionalValidation();
  }
}
