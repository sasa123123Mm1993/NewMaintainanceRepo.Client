import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpContext,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { apiUrl } from './apis';
import {
  Meter,
  MeterInsertDto,
  MeterOffDto,
  MeterFixDto,
  MeterOffInsert,
} from '../pages/meters/meter';
import { UserDto } from '../pages/users/user';

// const headers = { 'Content-Type': 'application/json', Accept: '*/*' };
const headers = {
  // 'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
  'Access-Control-Allow-Origin': 'http://localhost:4200',
  'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
  // 'Access-Control-Allow-Credentials': true
};

@Injectable({
  providedIn: 'root',
})
export class MeterService {
  corsHeaders: HttpHeaders;
  constructor(private http: HttpClient) {
    this.corsHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    });
  }

  ////////////////// METER OFF REASONS //////////////////////
  getAllMetersOffReasons() {
    return this.http.get<Meter[]>(apiUrl + 'MetersOffReasons/GetAll');
  }

  addMetersOffReason(meterReason: MeterInsertDto) {
    return this.http.post<Meter>(
      apiUrl + 'MetersOffReasons/Create',
      meterReason
    );
  }

  getMetersOffReasonById(reasonId: number | string) {
    return this.http.get<Meter>(
      apiUrl + 'MetersOffReasons/GetById/' + reasonId
    );
  }

  editMetersOffReason(reasonId: number | string, meterReason: MeterInsertDto) {
    return this.http.post<Meter>(
      apiUrl + 'MetersOffReasons/Update/' + reasonId,
      meterReason,
      { headers: headers }
    );
  }

  deleteMetersOffReason(reasonId: number | string) {
    return this.http.get<Meter>(
      apiUrl + 'MetersOffReasons/Delete/' + reasonId
      // { headers: headers }
    );
  }

  ////////////////// CMaintenenceMetersOff //////////////////////
  getAllOffMeters() {
    return this.http.get<MeterOffDto[]>(
      apiUrl + 'CMaintenenceMetersOff/GetAll'
    );
  }

  addOffMeter(offMeter: MeterOffInsert) {
    return this.http.post<MeterOffInsert>(
      apiUrl + 'CMaintenenceMetersOff/Create',
      offMeter
    );
  }
  getOffMeterById(id: number | string) {
    return this.http.get<MeterOffInsert>(
      apiUrl + 'CMaintenenceMetersOff/GetMaintainceMeterById/' + id
    );
  }
  updtaeOffMeter(id: number | string, offMeter: MeterOffInsert) {
    return this.http.post<MeterOffInsert>(
      apiUrl + 'CMaintenenceMetersOff/Update/' + id,
      offMeter
    );
  }
  deleteOffMeter(id: number | string) {
    debugger;
    console.log('delete id', id);
    return this.http.get<MeterOffInsert>(
      apiUrl + 'CMaintenenceMetersOff/Delete/' + id,
      { headers: headers }
    );
  }
  FixOffMeter(id: number, offMeterData: MeterFixDto) {
    debugger;
    return this.http.post<MeterOffInsert>(
      apiUrl + 'CMaintenenceMetersOff/AddFixedMeterToTechinicion/' + id,
      offMeterData
    );
  }
  filterListOffMeterByRefAddress(
    dailyNum: number,
    regionNum: number,
    accountNum: number,
    branchNo: number
  ) {
    return this.http.get<any>(
      apiUrl +
        'CMaintenenceMetersOff/GetDataByRefAddress' +
        '?dailyNo=' +
        dailyNum +
        '&regionNo=' +
        regionNum +
        '&accountNo=' +
        accountNum +
        '&branchNo=' +
        branchNo
    );
  }
  //نوع النشــــــــــــاط
  getAllActivityTypes() {
    return this.http.get<any>(
      apiUrl + 'CMaintenenceMetersOff/GetAllActivityTypes'
    );
  }
  //وصف مكــــــــــــان
  getAllPlacesTypes() {
    return this.http.get<any>(
      apiUrl + 'CMaintenenceMetersOff/GetAllPlaceTypes'
    );
  }
  // قطــــــــــــاع
  getAllSections() {
    return this.http.get<any>(apiUrl + 'CMaintenenceMetersOff/GetAllSections');
  }
  // الادارة الرئيـــــــسية
  getAllMainDepartments() {
    return this.http.get<any>(
      apiUrl + 'CMaintenenceMetersOff/GetAllMainDepartments'
    );
  }
  // الادارة الفرعيـــــة
  getAllSmallDepartments() {
    return this.http.get<any>(
      apiUrl + 'CMaintenenceMetersOff/GetAllSmallDepartments'
    );
  }
  //    البحـــــث برقم العـــــــــداد
  searchMeter(meterNum: number | string) {
    console.log(meterNum);
    return this.http.get<any>(
      'http://192.168.15.10:1001/api/meter/GetMetersInfo/' + meterNum
    );
  }
   //////////////////  ////////////////////// USERS  //////////////////  //////////////////////
   getAllUsers(){
    return this.http.get<UserDto>(
      apiUrl + 'User/GetAllUsers'
    )
   }
}
