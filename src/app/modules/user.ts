export interface UserDto {
  fullName: string;
  code: string;
  isActive: boolean;
  isDeleted: boolean;
  nationalId: number;
  sections: [];
  smallDepartments: [];
  id: string;
  userName: string;
  normalizedUserName: string;
  email: string;
  normalizedEmail: string;
  emailConfirmed: boolean;
  passwordHash: string;
  securityStamp: string;
  concurrencyStamp: string;
  phoneNumber: string;
  phoneNumberConfirmed: boolean;
  twoFactorEnabled: boolean;
  lockoutEnd: string;
  lockoutEnabled: boolean;
  accessFailedCount: number;
}
export interface userInsert {
  //id: 0;
  nationalId: string;
  roleId: string;
  isActive: boolean;
  userName: string;
  fullName: string;
  smallDepartmentsIds: any;
}
