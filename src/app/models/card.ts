export interface ICard {
  cardData: any;
}
export interface cardCreate {
  // techId: any;
  // code: any;
  // cardCreationDate: any;
  // cardEndDate: any;
  employeeId: number;
  propertyId: any;
  startDate: any;
  expirationDate: any;
  limitation: number;
  dateTimeMode: any;
  cutoffAlarmLimitBalance: any;
  meterType: number;
  tariffTypeId: any;
  automaticDate: any;
  meterSerial: string;
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
  automaticTime: any;
  controledMetersList: [];
  tampersCodes: [];
}
