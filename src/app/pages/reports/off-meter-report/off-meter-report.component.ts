import { Component, ElementRef, ViewChild } from '@angular/core';
import { SidemenuComponent } from '../../../shared/sidemenu/sidemenu.component';
import { CommonModule } from '@angular/common';
import { MeterService } from '../../../services/meter.service';
import { Table, TableModule } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SharedModule } from '../../../shared/sharedModules';
interface Index {
  id: number;
}
interface Company {
  name: string;
  vendorCode: number;
}

interface City {
  name: string,
  code: string
}

@Component({
  selector: 'app-off-meter-report',
  standalone: true,
  imports: [SidemenuComponent, CommonModule, SharedModule],
  templateUrl: './off-meter-report.component.html',
  styleUrl: './off-meter-report.component.scss',
  providers: [ConfirmationService, MessageService],
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
  refAddressObj: any = {
    accountNum: 0,
    regionNum: 0,
    dailyNum: 0,
    branchNum: 0,
  };
  offMetersList: any;
  companies!: Company[];
  offMeterObj: any = {};
  cities!: City[];

  selectedCities!: City[];


  constructor(
    private meterService: MeterService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  getIndexArr() {
    for (let index = 1; index < 99; index++) {
      this.indexArr.push({ id: index });
    }
  }
  getAllOffMeters() {
    this.meterService.getAllOffMeters().subscribe({
      next: (res) => {
        this.offMetersList = res;
        console.log('list :', this.offMetersList);
      },
    });
  }
  ngOnInit(): void {
    //init fun
    this.getAllOffMeters();

    //init lists
    this.companies = [
      { name: 'الجيزة', vendorCode: 6 },
      { name: 'المصرية', vendorCode: 4 },
      { name: 'السويدي', vendorCode: 3 },
      { name: 'جلوبال', vendorCode: 1 },
      { name: 'اسكرا', vendorCode: 2 },
      { name: 'المعصرة', vendorCode: 5 },
    ];
    this.cities = [
      {name: 'New York', code: 'NY'},
      {name: 'Rome', code: 'RM'},
      {name: 'London', code: 'LDN'},
      {name: 'Istanbul', code: 'IST'},
      {name: 'Paris', code: 'PRS'}
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
      this.getAllOffMeters();
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
      this.getAllOffMeters();
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
      this.getAllOffMeters();
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
      this.getAllOffMeters();
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
