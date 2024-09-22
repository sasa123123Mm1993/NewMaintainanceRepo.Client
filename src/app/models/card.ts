export interface ICard {
  cardData: any;
}
export interface cardCreate {
  employeeId: any;
  propertyId: any;
  startDate: any;
  expirationDate: any;
  limitation: number;
  dateTimeMode: any;
  cutoffAlarmLimitBalance: any;
  meterType: number;
  tariffTypeId: any;
  AutomaticDate: any;
 // meterSerial: string;
  meterTypeModel: string;
  OldMeterSerial: any;
  NewMeterSerial: any;
  LabTestCardAvailableTime: any;
  company: string;
  reverseCardRecoveryTime: any;
  LabTestCardAvailableKWh: any;
  OldDistributionCompanyCode: any;
  NewDistributionCompanyCode: any;
  modificationStyle: boolean;
  isActive: boolean;
  AutomaticTime: any;
  controledMetersList: [];
  tampersCodes: [];
  ControledMetersList:any;
}
