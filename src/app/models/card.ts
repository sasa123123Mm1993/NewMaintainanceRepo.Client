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
  oldMeterSerial: any;
  newMeterSerial: any;
  labTestCardAvailableTime: any;
  company: string;
  reverseCardRecoveryTime: any;
  labTestCardAvailableKWh: any;
  oldDistributionCompanyCode: any;
  newDistributionCompanyCode: any;
  modificationStyle: boolean;
  isActive: boolean;
  AutomaticTime: any;
  controledMetersList: [];
  tampersCodes: [];
  ControledMetersList:any;
}
