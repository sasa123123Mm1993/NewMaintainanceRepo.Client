import { MeterInsertDto, MeterOffInsert, MeterFixDto } from './../meter';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { SidemenuComponent } from '../../../shared/sidemenu/sidemenu.component';
import { CommonModule } from '@angular/common';
import { MeterService } from '../../../configs/meter.service';
import { Table, TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { DividerModule } from 'primeng/divider';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { CheckboxModule } from 'primeng/checkbox';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { OverlayPanelModule } from 'primeng/overlaypanel';

interface Company {
  name: string;
  vendorCode: number;
}
interface MeterStatus {
  name: string;
  id: number;
}
interface Index {
  id: number;
}
@Component({
  selector: 'app-fix-meters',
  standalone: true,
  imports: [
    SidemenuComponent,
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
    RadioButtonModule,
    CalendarModule,
    DropdownModule,
    DividerModule,
    InputTextareaModule,
    InputGroupModule,
    InputGroupAddonModule,
    IconFieldModule,
    InputIconModule,
    CheckboxModule,
    TagModule,
    TooltipModule,
    OverlayPanelModule,
  ],
  templateUrl: './fix-meters.component.html',
  styleUrl: './fix-meters.component.scss',
  providers: [ConfirmationService, MessageService],
})
export default class FixMetersComponent {
  position: string = ' ';
  offMetersList: any;
  MetersOffReasons!: any;
  checked: boolean = false;
  showAllModalData: boolean = false;
  showAccountDiv: boolean = false;
  offMeterObj: MeterOffInsert = {
    isDeleted: false,
    creatorById: 0,
    modifiedById: 0,
    creationTime: new Date().toISOString().slice(0, 10),
    modificationTime: new Date().toISOString().slice(0, 10),
    vendorCode: 6,
    customerCode: '',
    serialNumber: 0,
    customerName: '',
    nationalId: '',
    address: '',
    placeTypeId: 0,
    activityTypeId: 0,
    sectionId: 0,
    mainDepartmentId: 0,
    smallDepartmentId: 0,
    branchNo: 0,
    accountNo: 0,
    dailyNo: 0,
    regionNo: 0,
    meterPreparedDate: new Date(),
    meterInstallationDate: new Date(),
    meterOffDate: new Date(),
    uploadDate: new Date(),
    deliveryDateToLaboratory: new Date(),
    cUploadMainteneceMetersOffReasonId: 0,
    meterOffStatusId: 0,
    meterOffReason: '',
    meterOffMaintainNote: '',
    examinationNumber: '',
    examinationDate: new Date(),
    meterTypeId: 1,
    isExaminationdata: true,
    mainDepartmentCode: 0,
    smallDepartmentCode: 0,
    isMeterRecieved: false,
    isEnded: false,
    isMeterInstalled: false,
    maintenanceDate: false,
  };
  offMeterFix: MeterFixDto = {
    installationDate: new Date(),
    deliveryDateToTechnician: new Date(),
    maintenanceDate: new Date(),
  };
  refAddressObj: any = {
    accountNum: 0,
    regionNum: 0,
    dailyNum: 0,
    branchNum: 0,
  };
  companies!: Company[];
  meterStatus!: MeterStatus[];
  selectedCategory!: '';
  showAddModal: boolean = false;
  showEdit: boolean = false;
  showFilter: boolean = false;
  showFix: boolean = false;
  constructor(
    private meterService: MeterService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}
  //ALL FUNC TO ADD WHEN MODAL IS OPEN
  //ـــــــــــــــــــــــــــــــــــــــــ//
  indexArr: Index[] = [];
  getIndexArr() {
    for (let index = 1; index < 99; index++) {
      this.indexArr.push({ id: index });
    }
  }
  activityTypes!: any[];
  getActivityList() {
    this.meterService.getAllActivityTypes().subscribe({
      next: (res) => {
        this.activityTypes = res;
      },
    });
  }
  placesTypes!: any[];
  getAllPlacesTypes() {
    this.meterService.getAllPlacesTypes().subscribe({
      next: (res) => {
        this.placesTypes = res;
      },
    });
  }
  sections!: any[];
  getAllSections() {
    this.meterService.getAllSections().subscribe({
      next: (res) => {
        this.sections = res;
      },
    });
  }
  mainDepartements!: any[];
  getAllMainDepartments() {
    this.meterService.getAllMainDepartments().subscribe({
      next: (res) => {
        this.mainDepartements = res;
      },
    });
  }
  smallDepartements!: any[];
  getAllSmallDepartments() {
    this.meterService.getAllSmallDepartments().subscribe({
      next: (res) => {
        this.smallDepartements = res;
      },
    });
  }
  getAllReasons() {
    this.meterService.getAllMetersOffReasons().subscribe({
      next: (res) => {
        this.MetersOffReasons = res;
      },
    });
  }
  //ـــــــــــــــــــــــــــــــــــــــــ//

  //LIST TABLE
  getAllOffMeters() {
    this.meterService.getAllOffMeters().subscribe({
      next: (res) => {
        this.offMetersList = res;
        console.log('list :', this.offMetersList);
      },
    });
  }
  // GET METER BY ID
  selectedOffMeterId!: any;
  getMeterById(id: number) {
    this.selectedOffMeterId = id;
    this.meterService.getOffMeterById(id).subscribe({
      next: (res) => {
        this.showEdit = true;
        console.log('meter by id :', res);
        this.offMeterObj = res;
        this.offMeterObj.meterPreparedDate = new Date(
          this.offMeterObj.meterPreparedDate
        );
        this.offMeterObj.meterInstallationDate = new Date(
          this.offMeterObj.meterInstallationDate
        );
        this.offMeterObj.examinationDate = new Date(
          this.offMeterObj.examinationDate
        );
        this.offMeterObj.meterOffDate = new Date(this.offMeterObj.meterOffDate);
        this.offMeterObj.uploadDate = new Date(this.offMeterObj.uploadDate);
        this.offMeterObj.deliveryDateToLaboratory = new Date(
          this.offMeterObj.deliveryDateToLaboratory
        );
      },
    });
  }
  // EDIT mETER
  editOffMeter() {
    this.meterService
      .updtaeOffMeter(this.selectedOffMeterId, this.offMeterObj)
      .subscribe({
        next: (res) => {
          console.log('edit', res);
        },
      });
  }
  //DELETE METER BY ID
  deleteOffMeter(event: Event, id: number) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'هل تريد بالفعل حذف هذا العطل ؟',
      header: 'تأكيد الحذف',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',

      accept: () => {
        this.meterService.deleteOffMeter(id).subscribe({
          next: (res) => {
            // this.offMeterObj = res;
            this.messageService.add({
              severity: 'info',
              summary: 'تأكيد',
              detail: 'تم الحذف بنجاح',
            });
            this.getAllOffMeters();
          },
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'تم رفض الحذف',
          detail: 'تم رفض الحذف',
        });
      },
    });
  }
  //ADD NEW ITEM
  addOffMeter(addMeterObj: any) {
    if (addMeterObj.meterPreparedDate) {
      addMeterObj.meterPreparedDate = new Date(addMeterObj.meterPreparedDate)
        .toISOString()
        .slice(0, 10);
    }
    if (addMeterObj.meterInstallationDate) {
      addMeterObj.meterInstallationDate = new Date(
        addMeterObj.meterInstallationDate
      )
        .toISOString()
        .slice(0, 10);
    }
    if (addMeterObj.meterOffDate) {
      addMeterObj.meterOffDate = new Date(addMeterObj.meterOffDate)
        .toISOString()
        .slice(0, 10);
    }
    if (addMeterObj.uploadDate) {
      addMeterObj.uploadDate = new Date(addMeterObj.uploadDate)
        .toISOString()
        .slice(0, 10);
    }
    if (addMeterObj.deliveryDateToLaboratory) {
      addMeterObj.deliveryDateToLaboratory = new Date(
        addMeterObj.deliveryDateToLaboratory
      )
        .toISOString()
        .slice(0, 10);
    }
    if (addMeterObj.examinationDate) {
      addMeterObj.examinationDate = new Date(addMeterObj.examinationDate)
        .toISOString()
        .slice(0, 10);
    }
    if (addMeterObj.meterOffStatusId) {
      addMeterObj.meterOffStatusId = +addMeterObj.meterOffStatusId;
    }

    this.meterService.addOffMeter(addMeterObj).subscribe({
      next: (res) => {
        this.showAddModal = false;
        this.getAllOffMeters();
      },
    });
  }

  ngOnInit(): void {
    //init func
    this.getAllOffMeters();
    this.getIndexArr();
    this.getActivityList();
    this.getAllMainDepartments();
    this.getAllSmallDepartments();
    this.getAllSections();
    this.getAllPlacesTypes();
    this.getAllReasons();
    //init lists
    this.companies = [
      { name: 'الجيزة', vendorCode: 6 },
      { name: 'المصرية', vendorCode: 4 },
      { name: 'السويدي', vendorCode: 3 },
      { name: 'جلوبال', vendorCode: 1 },
      { name: 'اسكرا', vendorCode: 2 },
      { name: 'المعصرة', vendorCode: 5 },
    ];
    this.meterStatus = [
      { name: 'سليم', id: 1 },
      { name: 'تالف تماما', id: 2 },
      { name: 'يحتاج صيانه بالمعمل', id: 3 },
    ];
    //init variables
  }
  //OPEN MODAL
  showDialog() {
    this.showAddModal = true;
    this.showAllModalData = false;
    this.offMeterObj = {
      isDeleted: false,
      creatorById: 0,
      modifiedById: 0,
      creationTime: new Date().toISOString().slice(0, 10),
      modificationTime: new Date().toISOString().slice(0, 10),
      vendorCode: 6,
      customerCode: '',
      serialNumber: 0,
      customerName: '',
      nationalId: '',
      address: '',
      placeTypeId: 0,
      activityTypeId: 0,
      sectionId: 0,
      mainDepartmentId: 0,
      smallDepartmentId: 0,
      branchNo: 0,
      accountNo: 0,
      dailyNo: 0,
      regionNo: 0,
      meterPreparedDate: new Date(),
      meterInstallationDate: new Date(),
      meterOffDate: new Date(),
      uploadDate: new Date(),
      deliveryDateToLaboratory: new Date(),
      cUploadMainteneceMetersOffReasonId: 0,
      meterOffStatusId: 0,
      meterOffReason: '',
      meterOffMaintainNote: '',
      examinationNumber: '',
      examinationDate: new Date(),
      meterTypeId: 1,
      isExaminationdata: true,
      mainDepartmentCode: 0,
      smallDepartmentCode: 0,
      isMeterRecieved: false,
      isEnded: false,
      isMeterInstalled: false,
      maintenanceDate: false,
    };
  }
  // SHOW FIX MODAL
  fixMeterId!: any;
  showFixModal(offMeterObjToFix: any) {
    this.showFix = true;
    console.log(offMeterObjToFix);
    this.fixMeterId = offMeterObjToFix.id;
  }
  // FIX METER
  fixMeter(fixMeterObj: any) {
    if (fixMeterObj.maintenanceDate) {
      fixMeterObj.maintenanceDate = new Date(fixMeterObj.maintenanceDate)
        .toISOString()
        .slice(0, 10);
    }
    if (fixMeterObj.installationDate) {
      fixMeterObj.installationDate = new Date(fixMeterObj.installationDate)
        .toISOString()
        .slice(0, 10);
    }
    if (fixMeterObj.deliveryDateToTechnician) {
      fixMeterObj.deliveryDateToTechnician = new Date(
        fixMeterObj.deliveryDateToTechnician
      )
        .toISOString()
        .slice(0, 10);
    }
    console.log('fixxxxxxxxxxx', this.fixMeterId, fixMeterObj);
    this.meterService.FixOffMeter(this.fixMeterId, fixMeterObj).subscribe({
      next: (res) => {
        console.log('fixed', res);
        this.showFix = false;
      },
    });
  }
  //TABLE FILTERS
  @ViewChild('dt') dt!: Table;
  applyFilterGlobal($event: any, stringVal: any) {
    this.dt.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }
  filterWithStatus(status: any) {
    if (status) {
      this.dt.filter(status.id, 'meterOffStatusId', 'equals');
    } else {
      this.dt.filter([1, 2, 3], 'meterOffStatusId', 'in');
      this.getAllOffMeters();
    }
  }
  filterWithCompany(company: any) {
    if (company) {
      this.dt.filter(company.vendorCode, 'vendorCode', 'equals');
    } else {
      this.dt.filter([1, 2, 3, 4, 5, 6], 'vendorCode', 'in');
      this.getAllOffMeters();
    }
  }
  sendFilterVal(
    isEndedVal: any,
    isMeterInstalledVal: any,
    isMeterRecievedVal: any
  ) {
    if (isEndedVal) {
      this.dt.filter(isEndedVal, 'isEnded', 'equals');
    }
    console.log(isEndedVal, isMeterInstalledVal, isMeterRecievedVal);
  }
  searchByMeterNum(meterNum: number) {
    this.meterService.searchMeter(meterNum).subscribe({
      next: (res) => {
        console.log('search result', res);
        this.offMeterObj.serialNumber = res.SerialNumber;
        this.offMeterObj.customerCode = res.CustomerCode;
        this.offMeterObj.customerName = res.Name;
        this.offMeterObj.nationalId = res.NationalId;
        this.offMeterObj.address = res.Address;
        this.offMeterObj.activityTypeId = res.ActivityName;
        this.offMeterObj.placeTypeId = res.PlaceName;
        this.offMeterObj.sectionId = res.Sector;
        this.offMeterObj.mainDepartmentId = res.Department;
        this.offMeterObj.smallDepartmentId = res.smalldepartment;
        this.offMeterObj.branchNo = res.BranchNo;
        this.offMeterObj.accountNo = res.AccountNo;
        this.offMeterObj.regionNo = res.RegionNo;
        this.offMeterObj.dailyNo = res.DailyNo;
        this.offMeterObj.meterPreparedDate = res.MeterPreparedDate;
        this.offMeterObj.meterInstallationDate = res.MeterInstallationDate;
        this.showAllModalData = true;
      },
    });
  }
  closeExtraFilterOp(event: any, element: any) {
    element.hide(event);
    this.getAllOffMeters();
  }
  getDataByRefAddress(refObj: any) {
    this.meterService
      .filterListOffMeterByRefAddress(
        refObj.dailyNum,
        refObj.regionNum,
        refObj.accountNum,
        refObj.branchNum
      )
      .subscribe({
        next: (res) => {
          this.offMetersList = res;
        },
      });
  }
  reloadPage() {
    window.location.reload();
  }
}
