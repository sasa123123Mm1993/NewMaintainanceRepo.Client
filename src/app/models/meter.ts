// off reason
export interface MeterReason {
  code: number;
  name: string;
  uploadReasonId: number;
  id: number;
  isDeleted: boolean;
  creatorById: number;
  modifiedById: string;
  creationTime: string;
  modificationTime: string;
  note:string;
}
export interface MeterReasonInsertDto {
  code: number;
  name: string;
}
export interface MeterReasonUpdateDto {
  code: number;
  name: string;
}
// CMaintenence Meters Off
export interface MeterOffDto {
  vendorCode: number;
  customerCode: string;
  serialNumber: number;
  companyName: string;
  customerName: string;
  nationalId: string;
  address: string;
  placeTypeName: string;
  activityName: string;
  sectionName: string;
  mainDepartmentName: string;
  smallDepartmentName: string;
  branchNo: number;
  accountNo: number;
  dailyNo: number;
  regionNo: number;
  meterPreparedDate: Date;
  meterInstallationDate: Date;
  meterOffDate: Date;
  uploadDate: Date;
  deliveryDateToLaboratory: string;
  uploadReason: string;
  meterOffStatus: string;
  meterOffReason: string;
  meterOffMaintainNote: string;
  examinationNumber: string;
  examinationDate: Date;
  meterTypeId: number;
  isExaminationdata: boolean;
  mainDepartmentCode: number;
  smallDepartmentCode: number;
}
export interface MeterOffInsert {
  isDeleted: boolean;
  creatorById: number;
  modifiedById: number;
  creationTime: string;
  modificationTime: string;
  vendorCode: number;
  customerCode: string;
  serialNumber: number;
  customerName: string;
  nationalId: string;
  address: string;
  placeTypeId: number;
  activityTypeId: number;
  sectionId: number;
  mainDepartmentId: number;
  smallDepartmentId: number;
  branchNo: number;
  accountNo: number;
  dailyNo: number;
  regionNo: number;
  meterPreparedDate: Date;
  meterInstallationDate: Date;
  meterOffDate: Date;
  uploadDate: Date;
  deliveryDateToLaboratory: Date;
  cUploadMainteneceMetersOffReasonId: number;
  meterOffStatusId: number;
  meterOffReason: string;
  meterOffMaintainNote: string;
  examinationNumber: string;
  examinationDate: Date;
  meterTypeId: number;
  isExaminationdata: true;
  mainDepartmentCode: number;
  smallDepartmentCode: number;
  isMeterRecieved: any;
  isEnded: any;
  isMeterInstalled: any;
  maintenanceDate: Date;
}
export interface MeterFixDto {
  installationDate: Date;
  deliveryDateToTechnician: Date;
  maintenanceDate: Date;
}
