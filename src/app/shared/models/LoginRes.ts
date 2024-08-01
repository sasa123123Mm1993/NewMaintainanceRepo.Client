export class LoginRes{
    isSucceed:boolean;
    message:string;
    userId:string;
   
    constructor() {
        this.isSucceed = false;
        this.message = '';
        this.userId = '';
        
    }
}