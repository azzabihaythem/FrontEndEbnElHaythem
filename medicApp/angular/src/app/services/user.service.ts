import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders , HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationRequest } from '../model/AuthenticationRequest';
import { User } from '../model/User';
import { UserPost } from '../model/UserPost';
import { Token } from '@angular/compiler';

const API_URL = 'http://localhost:8080/v1/users/';
const API_URL_L = 'http://localhost:8080/login';
const API_URL_singup = 'http://localhost:8080/v1/users/signup';
const API_URL_U = 'http://localhost:8080/v1/users/profile/' ; 
const API_URL_E = 'http://localhost:8080/v1/users/update/'

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http: HttpClient) { } 

  
  
  public optionRequete = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials': 'true',
   'Access-Control-Allow-Headers': 'Authorization',
    'Access-Control-Expose-Headers': 'Authorization'
    })
  };

  gettoken() {
    return  localStorage.getItem('Authorization');
  }

  signup( user: UserPost):  Observable<any> {
    //let url = ' http://localhost:8080/v1/users/signup?roleId=';

    //const token = localStorage.getItem('Authorization');
    //let params1 =  new HttpParams().set('roleId', "4") ; 
    // const roleId = localStorage.setItem('roleId',"4");
    //const role = localStorage.getItem('roleId');
    //let params = new HttpParams();
    //const AUTH = localStorage.getItem('Authorization');
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Credentials', 'true');
    //headers.append('Authorization', ``);
    //return  this.http.post<UserPost>(url+4, user,  { headers  } );
   //  return  this.http.post<UserPost>(`${API_URL}signup?roleId=${4}`, user,  { headers  } );
    //return this.http.post<any>(API_URL +'signup?roleId=4' , user, { headers  } );
    // tslint:disable-next-line:object-literal-shorthand
   // return  this.http.post<UserPost>(API_URL_singup?role=+roleId , user,  { headers  } );
   console.log('sssssssss   : ',user);
   return  this.http.post<UserPost>(API_URL_singup, user,  { headers  } );
  }




  login(user: UserPost): Observable<any> {
    // let params = new HttpParams();
    // params = params.append('username', username);
    // params = params.append('password', password);
    //const AUTH = localStorage.getItem('Authorization');
    //const autentification = new AuthenticationRequest(login, password );

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Credentials', 'true');
   headers.append('Access-Control-Allow-Headers', 'Authorization')
    //headers.append('Authorization', ``);
    headers.append('Access-Control-Expose-Headers', 'Authorization');
    console.log("testakrammmmm service",headers);
   // sessionStorage.setItem('token', headers.get('Authorization'));
    //console.log(Token);
    //headers.append('Authorization', ``);
   //headers.append('Access-Control-Expose-Headers','Authorization');
    //headers.append('Authorization', AUTH);
    //localStorage.setItem('roleId');
    // tslint:disable-next-line:object-literal-shorthand
    const  res = this.http.post<any>(API_URL_L , user ,{ observe: 'response', headers  } );
    console.log(res,'headerssss service side ////') ;
    //console.log(res,'msg token ///') ; 
    return res ;
  }

  getUserbyId(id: any ) : Observable<any>  {
    const token = localStorage.getItem('Authorization');


    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Credentials', 'true');
    headers.append('Access-Control-Allow-Headers', 'Authorization')
    headers.append('Authorization', `${token}`);
    headers.append('Access-Control-Expose-Headers', 'Authorization');
    
    return  this.http.get<any>(API_URL_U+id,{ headers } );

  }

  editUser(user: UserPost , id: any): Observable<any> {
    const token = localStorage.getItem('Authorization');
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin','*');
    headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    headers.append('Access-Control-Allow-Credentials', 'true');
    headers.append('Access-Control-Allow-Headers', 'Authorization')
    headers.append('Authorization', `${token}`);
    headers.append('Access-Control-Expose-Headers', 'Authorization');
    console.log('test heeaders ****', headers) ;


    return  this.http.put<any>(API_URL_E + id, user,  {observe: 'response', headers  });
  }




  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }
}
