import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { SidemenuComponent } from '../../../shared/sidemenu/sidemenu.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MeterService } from '../../../services/meter.service';
import { Table, TableModule } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SharedModule } from '../../../shared/sharedModules';
import { LoaderService } from '../../../services/loader.service';

interface Index {
  id: number;
}
interface Company {
  name: string;
  vendorCode: number;
}

@Component({
  selector: 'app-off-meter-report',
  standalone: true,
  imports: [
    SidemenuComponent,
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './off-meter-report.component.html',
  styleUrl: './off-meter-report.component.scss',
  providers: [ConfirmationService, MessageService,NgModule],
})
export default class OffMeterReportComponent {
  showAccountDiv: boolean = false;
  isInstallationDate: boolean = false;
  isPreparedDate: boolean = false;
  isDeliverTolab: boolean = false;
  isDeliverToTech: boolean = false;
  isOffDate: boolean = false;
  isUploadDate: boolean = false;
  isFixDate: boolean = false;
  isInstalledDate: boolean = false;
  isExaminationDate: boolean = false;

  indexArr: Index[] = [];
  offMetersList: any;
  companies!: Company[];
  offMeterObj: any = {};
  datesList!: any;
  reportFilterObj: any;
  //////////////////////reportObj

  constructor(
    private meterService: MeterService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private cdr: ChangeDetectorRef,
    private loaderService: LoaderService
  ) {}

  getIndexArr() {
    for (let index = 1; index < 99; index++) {
      this.indexArr.push({ id: index });
    }
  }
  formatDateToYYYYMMDD(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}/${month}/${day}`;
  }

  getSearchResult() {
    const sentObj = {
      filter: '',
      typeFilter: '',
      filter2: '',
      vendorCode: '',
      typeFilter2: this.reportFilterObj.typeFilter2,
      searchType2: 0,
      sectorNo: '',
      departmentNo: '',
      smallDepartmentNo: '',
      regionNo: String(this.reportFilterObj.regionNo) ?? '',
      dailyNo: String(this.reportFilterObj.dailyNo) ?? '',
      accountNo: String(this.reportFilterObj.accountNo) ?? '',
      branchNo: String(this.reportFilterObj.branchNo) ?? '',
      status: 0,
      pageNumber: 0,
      pageSize: 0,
      fromDate: this.formatDateToYYYYMMDD(this.reportFilterObj.fromDate),
      toDate: this.formatDateToYYYYMMDD(this.reportFilterObj.toDate),
      isDeleted: '',
      statusOfMeter: '',
    };
    this.loaderService.showLoader();
    console.log('sent obj', sentObj);
    this.meterService.getOffMetersReport(sentObj).subscribe({
      next: (res) => {
        console.log('resssssssssss : ', res);
        this.offMetersList = res;
        this.loaderService.hideLoader();
      },
    });
  }
  ngOnInit(): void {
    //init fun
    this.getIndexArr();
    //init lists
    this.reportFilterObj = {
      typeFilter2: '',
      fromDate: new Date(),
      toDate: new Date(),
    };
    this.offMetersList = [];

    this.companies = [
      { name: 'الجيزة', vendorCode: 6 },
      { name: 'المصرية', vendorCode: 4 },
      { name: 'السويدي', vendorCode: 3 },
      { name: 'جلوبال', vendorCode: 1 },
      { name: 'اسكرا', vendorCode: 2 },
      { name: 'المعصرة', vendorCode: 5 },
    ];
    this.datesList = [
      { name: ' تاريخ تركيب العداد', code: '1' },
      { name: ' تاريخ تهيئه العداد', code: '2' },
      { name: ' تاريخ العطل', code: '3' },
      { name: ' تاريخ رفع العداد', code: '4' },
      { name: ' تاريخ إصلاح العداد', code: '5' },
      { name: ' تاريخ التركيب بعد الإصلاح', code: '6' },
      { name: ' تاريخ استلام العداد في المعمل', code: '7' },
      { name: ' تاريخ تسليم العداد للفني', code: '8' },
      { name: ' تاريخ الفحص', code: '9' },
      { name: ' تاريخ التسجيل بالنظام', code: '10' },
    ];
  }
  //TABLE FILTERS
  @ViewChild('dt') dt!: Table;
  applyFilterGlobal($event: any, stringVal: any) {
    this.dt.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }
  filterWithCompany(company: any) {
    if (company) {
      this.dt.filter(company.vendorCode, 'vendorCode', 'equals');
    } else {
      this.dt.filter([1, 2, 3, 4, 5, 6], 'vendorCode', 'in');
      this.getSearchResult();
    }
  }
  // حالة عطل العداد
  filterWithEnded(val: any) {
    console.log('IsMeterEnded:', val);
    if (val == true) {
      this.dt.filter(val, 'isEnded', 'equals');
    } else if (val == false) {
      this.dt.filter(val, 'isEnded', 'equals');
    } else {
      this.getSearchResult();
    }
  }
  // حالة تركيب العداد
  filterWithMeterInstalled(val: any) {
    console.log('IsMeterInstalled:', val);
    if (val == true) {
      this.dt.filter(val, 'isMeterInstalled', 'equals');
    } else if (val == false) {
      this.dt.filter(val, 'isMeterInstalled', 'equals');
    } else {
      this.getSearchResult();
    }
  }
  // حالة تسليم العداد للفنى
  filterWithMeterRecieved(val: any) {
    console.log('IsMeterInstalled:', val);
    if (val == true) {
      this.dt.filter(val, 'isMeterRecieved', 'equals');
    } else if (val == false) {
      this.dt.filter(val, 'isMeterRecieved', 'equals');
    } else {
      this.getSearchResult();
    }
  }

  closeExtraFilterOp(event: any, element: any) {
    element.hide(event);
    // window.location.reload();
  }
  reloadPage() {
    window.location.reload();
  }
}
