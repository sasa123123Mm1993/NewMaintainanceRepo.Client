import {
  MeterReasonInsertDto,
  MeterOffInsert,
  MeterFixDto,
} from '../../../models/meter';
import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { SidemenuComponent } from '../../../shared/sidemenu/sidemenu.component';
import { CommonModule } from '@angular/common';
import { MeterService } from '../../../services/meter.service';
import { Table, TableModule } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SharedModule } from '../../../shared/sharedModules';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { LoaderService } from '../../../services/loader.service';

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
  imports: [SidemenuComponent, CommonModule, SharedModule, ReactiveFormsModule],
  templateUrl: './fix-meters.component.html',
  styleUrl: './fix-meters.component.scss',
  providers: [ConfirmationService, MessageService, FormBuilder, Validators],
})
export default class FixMetersComponent {
  constructor(
    private meterService: MeterService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private loaderService: LoaderService
  ) {}
  position: string = ' ';
  offMetersList: any;
  MetersOffReasons!: any;
  checked: boolean = false;
  showAllModalData: boolean = false;
  showAccountDiv: boolean = false;
  showExtraFilter: boolean = false;
  addOffMeterObj: any = {};
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
    isMeterRecieved: ' ',
    isEnded: ' ',
    isMeterInstalled: ' ',
    maintenanceDate: new Date(),
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
  placesTypesList!: any[];
  getAllPlacesTypesByActivity(activityId: number) {
    console.log('aaaaaaaaaaa', activityId);

    this.meterService.getAllPlacesTypesByActitvityId(activityId).subscribe({
      next: (res) => {
        this.placesTypesList = res;
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
  mainDeps!: any[];
  getAllMainDepsBySectionId(sectionId: number) {
    this.meterService.getAllMainDepartmentsBySectionId(sectionId).subscribe({
      next: (res) => {
        this.mainDeps = res;
        console.log('main by section', this.mainDeps);
      },
    });
  }
  smallDeps!: any[];
  getAllSmallDepartmentsByMainDepId(mainId: number) {
    console.log('mainId', mainId);
    this.meterService.getAllSmallDepartmentsByMainDepId(mainId).subscribe({
      next: (res) => {
        this.smallDeps = res;
        console.log('smallDeps by main', this.smallDeps);
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
    this.loaderService.showLoader();
    this.meterService.getAllOffMeters().subscribe({
      next: (res) => {
        this.offMetersList = res;
        console.log('list :', this.offMetersList);
        this.loaderService.hideLoader();
      },
    });
  }
  // GET METER BY ID
  selectedOffMeterId!: any;
  getMeterById(id: number, flag: string) {
    this.selectedOffMeterId = id;
    this.meterService.getOffMeterById(id).subscribe({
      next: (res) => {
        this.offMeterObj = res;
        if (flag == 'edit') {
          this.showEdit = true;
          console.log('meter by id  for edit:', res);

          this.offMeterObj.meterPreparedDate = new Date(
            this.offMeterObj.meterPreparedDate
          );
          this.offMeterObj.meterInstallationDate = new Date(
            this.offMeterObj.meterInstallationDate
          );
          this.offMeterObj.examinationDate = new Date(
            this.offMeterObj.examinationDate
          );
          this.offMeterObj.meterOffDate = new Date(
            this.offMeterObj.meterOffDate
          );
          this.offMeterObj.uploadDate = new Date(this.offMeterObj.uploadDate);
          this.offMeterObj.deliveryDateToLaboratory = new Date(
            this.offMeterObj.deliveryDateToLaboratory
          );
        }
        if (flag == 'fix') {
          this.showFix = true;

          if (res.maintenanceDate) {
            this.offMeterFix.maintenanceDate = new Date(res.maintenanceDate);
          } else {
            this.offMeterFix.maintenanceDate = new Date();
          }

          this.offMeterFix.installationDate = new Date(
            res.meterInstallationDate
          );
          this.offMeterFix.deliveryDateToTechnician = new Date(
            res.deliveryDateToLaboratory
          );
        }
      },
    });
  }
  // EDIT METER
  editOffMeter() {
    console.log('update', this.offMeterObj);
    this.meterService
      .updtaeOffMeter(this.selectedOffMeterId, this.offMeterObj)
      .subscribe({
        next: (res) => {
          console.log('edit', res);
          this.showEdit = false;
          this.getAllOffMeters();
        },
      });
  }
  // FIX METER
  fixMeter(fixMeterObj: any) {
    console.log('fixxxxxxxxxxx', fixMeterObj);
    fixMeterObj.id = 0;
    if (fixMeterObj.maintenanceDate) {
      fixMeterObj.maintenanceDate = new Date(fixMeterObj.maintenanceDate);
    }
    if (fixMeterObj.installationDate) {
      fixMeterObj.installationDate = new Date(fixMeterObj.installationDate);
    }
    if (fixMeterObj.deliveryDateToTechnician) {
      fixMeterObj.deliveryDateToTechnician = new Date(
        fixMeterObj.deliveryDateToTechnician
      );
    }
    console.log('fixxxxxxxxxxx', this.selectedOffMeterId, fixMeterObj);
    this.meterService
      .FixOffMeter(this.selectedOffMeterId, fixMeterObj)
      .subscribe({
        next: (res) => {
          console.log('fixed', res);
          window.location.reload();
          this.showFix = false;
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
  addOffMeter(addMeterObj: any, reason: any, note: any) {
    // addMeterObj.placeType = null;
    // addMeterObj.activityType = null;
    // addMeterObj.section = null;
    // addMeterObj.mainDepartment = null;
    // addMeterObj.smallDepartment = null;
    // addMeterObj.isMeterRecieved = null;
    // addMeterObj.uploadMainteneceMetersOffReason = null;
    // addMeterObj.deliveryDateToTechnician = null;
    // addMeterObj.maintenanceDate = null;
    // addMeterObj.meterType = null;
    // addMeterObj.isEnded = null;
    addMeterObj.meterOffReason = reason;
    addMeterObj.meterOffMaintainNote = note;
    addMeterObj.meterTypeId = 1;
    if (addMeterObj.meterPreparedDate) {
      addMeterObj.meterPreparedDate = new Date(addMeterObj.meterPreparedDate);
    }
    if (addMeterObj.meterInstallationDate) {
      addMeterObj.meterInstallationDate = new Date(
        addMeterObj.meterInstallationDate
      );
    }
    if (addMeterObj.meterOffDate) {
      addMeterObj.meterOffDate = new Date(addMeterObj.meterOffDate);
    }
    if (addMeterObj.uploadDate) {
      addMeterObj.uploadDate = new Date(addMeterObj.uploadDate);
    }
    if (addMeterObj.deliveryDateToLaboratory) {
      addMeterObj.deliveryDateToLaboratory = new Date(
        addMeterObj.deliveryDateToLaboratory
      );
    }
    if (addMeterObj.examinationDate) {
      addMeterObj.examinationDate = new Date(addMeterObj.examinationDate);
    }
    if (addMeterObj.meterOffStatusId) {
      addMeterObj.meterOffStatusId = +addMeterObj.meterOffStatusId;
    }
    console.log('aaaaaaaaaaaaaaaaaaaaaaaadddddddddddd', addMeterObj);
    this.meterService.addOffMeter(addMeterObj).subscribe({
      next: (res) => {
        this.showAddModal = false;
        this.getAllOffMeters();
      },
    });
  }

  addOffMeterFormGiza = this.fb.group({
    meterOffDate: ['', Validators.required],
    uploadDate: ['', Validators.required],
    deliveryDateToLab: ['', Validators.required],
    uploadReason: ['', Validators.required],
    meterStatusOnUpload: ['', Validators.required],
    examinationNumber: ['', Validators.required],
    examinationDate: ['', Validators.required],
  });

  addOffMeterForm = this.fb.group({
    //companyName: ['', Validators.required],
    meterNum: ['', Validators.required],
    customerCode: ['', Validators.required],
    customerName: ['', Validators.required],
    nationalId: [
      '',
      [
        Validators.required,
        Validators.pattern(
          '^([2-3]{1})([0-9]{2})(0[1-9]|1[012])(0[1-9]|[1-2][0-9]|3[0-1])(0[1-4]|[1-2][1-9]|3[1-5]|88)[0-9]{3}([0-9]{1})[0-9]{1}$'
        ),
      ],
    ],
    customerAddress: ['', Validators.required],
    activityType: [null, Validators.required],
    placesType: ['', Validators.required],
    section: ['', Validators.required],
    mainDep: ['', Validators.required],
    smallDep: ['', Validators.required],
    branchNo: ['', Validators.required],
    accountNo: ['', Validators.required],
    regionNo: ['', Validators.required],
    dailyNo: ['', Validators.required],
    preparedDate: ['', Validators.required],
    installationDate: ['', Validators.required],
    meterOffDate: ['', Validators.required],
    uploadDate: ['', Validators.required],
    deliveryDateToLab: ['', Validators.required],
    uploadReason: ['', Validators.required],
    meterStatusOnUpload: ['', Validators.required],
    examinationNumber: ['', Validators.required],
    examinationDate: ['', Validators.required],
  });

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
    this.offMeterObj.isEnded = ' ';
  }
  //OPEN MODAL
  showDialog() {
    this.showAddModal = true;
    this.showAllModalData = false;
    this.addOffMeterObj = {};
    this.addOffMeterObj.isExaminationdata = false;
  }
  onCheckboxChange(event: any) {
    this.addOffMeterObj.isExaminationdata = event.checked;
    this.cdr.detectChanges(); // Trigger change detection after model update
  }
  closeAddModal() {
    this.showAddModal = false;
    this.addOffMeterObj = {};
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
  visibleSearchMeterDialog: boolean = false;
  searchByMeterNum(meterNum: number) {
    this.meterService.searchMeter(meterNum).subscribe({
      next: (res) => {
        if (res == null) {
          this.visibleSearchMeterDialog = true;
        } else {
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
          console.log('the resssssssssss', this.offMeterObj);
          this.showAllModalData = true;
        }
      },
    });
  }
  closeExtraFilterOp(event: any, element: any) {
    element.hide(event);
    window.location.reload();
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
