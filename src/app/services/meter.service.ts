import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { apiUrl } from '../environments/apis';
import {
  MeterReason,
  MeterReasonInsertDto,
  MeterReasonUpdateDto,
  MeterOffDto,
  MeterFixDto,
  MeterOffInsert,
} from '../models/meter';
import { UserDto, userInsert } from '../models/user';
import { Login } from '../shared/models/Login';
import { catchError, Observable, throwError } from 'rxjs';
import { LoginRes } from '../shared/models/LoginRes';
import { ICard } from '../models/card';

const headers = {
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
  'Access-Control-Allow-Origin': 'http://192.168.15.10:1501',
  'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
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
    return this.http.get<MeterReason[]>(apiUrl + 'MetersOffReasons/GetAll');
  }

  Login(LoginObj: Login): Observable<any> {
    debugger;
    return this.http.post<LoginRes>(apiUrl + 'Auth/Login/login', LoginObj).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error('Login failed'));
      })
    );
  }

  addMetersOffReason(meterReason: MeterReasonInsertDto) {
    return this.http.post<MeterReasonInsertDto>(
      apiUrl + 'MetersOffReasons/Create',
      meterReason
    );
  }

  getMetersOffReasonById(reasonId: number | string) {
    return this.http.get<MeterReason>(
      apiUrl + 'MetersOffReasons/GetById/' + reasonId
    );
  }

  editMetersOffReason(
    reasonId: number | string,
    meterReason: MeterReasonUpdateDto
  ) {
    return this.http.post<MeterReasonUpdateDto>(
      apiUrl + 'MetersOffReasons/Update/' + reasonId,
      meterReason
    );
  }

  deleteMetersOffReason(reasonId: number | string) {
    return this.http.get<MeterReasonUpdateDto>(
      apiUrl + 'MetersOffReasons/Delete/' + reasonId
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
  //    البحـــــث برقم العـــــــــداد
  searchMeter(meterNum: number | string) {
    console.log(meterNum);
    return this.http.get<any>(
      'http://192.168.15.10:1001/api/meter/GetMetersInfo/' + meterNum
    );
  }
  //////////////  //////// USERS ////////////  ////////////////
  getAllUsers() {
    //done
    return this.http.get<UserDto>(apiUrl + 'User/GetAllUsersWithDepartments');
  }
  getAllRoles() {
    //done
    return this.http.get<UserDto>(apiUrl + 'User/GetAllRoles');
  }
  getUserById(userId: any, data: any) {
    return this.http.post<any>(
      apiUrl + 'User/GetUserWithDepartments?userId=' + userId,
      data
    );
  }
  deactiveUser(userId: number, data: any) {
    return this.http.post<UserDto>(
      apiUrl + 'User/DeactivateUser?userId=' + userId,
      data
    );
  }
  resetUserPassword(userId: number, data: any) {
    return this.http.post<UserDto>(
      apiUrl + 'User/ResetPassword?userId=' + userId,
      data
    );
  }
  addUser(data: userInsert) {
    return this.http.post<userInsert>(apiUrl + 'User/AddUserWithDeps', data);
  }
  //////////////  //////// Card ////////////  ////////////////
  readCard(){
    return this.http.get<ICard>('http://localhost:8000/CardService.svc/rest/ReadCard')
  }
  writeCard(data:any){
    return this.http.post<ICard>('http://localhost:8000/CardService.svc/rest/WriteCard',data)
  }

  //////////////  //////// PUBLIC ////////////  ////////////////

  //نوع النشــــــــــــاط
  getAllActivityTypes() {
    return this.http.get<any>(
      apiUrl + 'CMaintenenceMetersOff/GetAllActivityTypes'
    );
  }
  // by activity id وصف مكــــــــــــان
  getAllPlacesTypesByActitvityId(activityId: number) {
    return this.http.get<any>(
      apiUrl +
        'CMaintenenceMetersOff/GetAllPlaceTypesByActivityTypeId/' +
        activityId
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
  // by section id الادارة الرئيـــــــسية
  getAllMainDepartmentsBySectionId(sectionId: number) {
    return this.http.get<any>(
      apiUrl +
        'CMaintenenceMetersOff/GetAllMainDepartmentsBySectionId/' +
        sectionId
    );
  }
  // by section id الادارة الفــــرعية
  getAllSmallDepartmentsByMainDepId(depId: number) {
    return this.http.get<any>(
      apiUrl +
        'CMaintenenceMetersOff/GetAllSmallDepartmentsByMainDepId/' +
        depId
    );
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
}
