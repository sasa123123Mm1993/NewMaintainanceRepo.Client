import { HttpInterceptorFn } from '@angular/common/http';
//import { LocalStorage, SessionStorage } from 'ngx-webstorage';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  //const myToken = window.localStorage.getItem('UserToken');
  //const myToken = localStorage.getItem('UserToken');
  // const myToken = JSON.parse(localStorage.getItem('myData')!);

  // const cloneRequest = req.clone({
  //   setHeaders:{
  //     Authorization: 'Bearer ${myToken}'
  //   }
  // });

  const token = localStorage.getItem('myData');
  const cloneRequest=req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`)
  });
  return next(cloneRequest);
};



// export const authInterceptor: HttpInterceptorFn = (req, next) => {

//   const jwtToken = getJwtToken();
//   if (jwtToken) {
//     var cloned = req.clone({
//       setHeaders: {
//         Authorization: `Bearer ${jwtToken}`,
//       },
//     });

//     return next(cloned);
//   }
//   return next(req);
// };

// function getJwtToken(): string | null {
//   let tokens: any = localStorage.getItem('mm');

//   if (!tokens) return null;
//   const token = JSON.parse(tokens).access_token;
//   return token;
// }


