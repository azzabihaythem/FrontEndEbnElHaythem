import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddSeance } from '../model/AddSession';
import { EditSeance } from '../model/EditSession';

const API_Session = 'http://localhost:8080/v1/session?PatientId=';
const API_SessionAdd = 'http://localhost:8080/v1/seance/add';
const API_SessionEdit = 'http://localhost:8080/v1/seance/update?SId=';
const API_SessionList = 'http://localhost:8080/v1/listseance';
const API_SessiontypeList = 'http://localhost:8080/v1/listseancetype';
const API_GetSeanceById = 'http://localhost:8080/v1/seance/';
const API_dSeance = 'http://localhost:8080/v1/dseance/';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

constructor(private http: HttpClient) { }

getAllSeance(): Observable<any> {
  const token = localStorage.getItem('Authorization');
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'application/json');
  headers.append('Access-Control-Allow-Origin', '*');
  headers.append('Access-Control-Allow-Credentials', 'true');
  headers.append('Access-Control-Allow-Headers', 'Authorization')
  headers.append('Authorization', `${token}`);
  headers.append('Access-Control-Expose-Headers', 'Authorization');
 return this.http.get<any>(API_SessionList , {headers});

}

getAllSeanceType(): Observable<any> {
  const token = localStorage.getItem('Authorization');
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'application/json');
  headers.append('Access-Control-Allow-Origin', '*');
  headers.append('Access-Control-Allow-Credentials', 'true');
  headers.append('Access-Control-Allow-Headers', 'Authorization')
  headers.append('Authorization', `${token}`);
  headers.append('Access-Control-Expose-Headers', 'Authorization');
 return this.http.get<any>(API_SessiontypeList , {headers});

}


createSession(session: AddSeance): Observable<any> {
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

const resp = this.http.post<any>(API_SessionAdd, session,  {observe: 'response', headers  });
//console.log('response partie service - createPatient *******',resp) ;
  return resp ;
   
}

editSeance(seance: EditSeance , SId: any): Observable<any> {
  const token = localStorage.getItem('Authorization');
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'application/json');
  headers.append('Access-Control-Allow-Origin','*');
  headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  headers.append('Access-Control-Allow-Credentials', 'true');
  headers.append('Access-Control-Allow-Headers', 'Authorization')
  headers.append('Authorization', `${token}`);
  headers.append('Access-Control-Expose-Headers', 'Authorization');

 
  return  this.http.put<any>(API_SessionEdit+SId, seance,  {observe: 'response', headers  });
}

getSeancebyId(id: any ) : Observable<any>  {
  const token = localStorage.getItem('Authorization');


  const headers = new HttpHeaders();
  headers.append('Content-Type', 'application/json');
  headers.append('Access-Control-Allow-Origin', '*');
  headers.append('Access-Control-Allow-Credentials', 'true');
  headers.append('Access-Control-Allow-Headers', 'Authorization')
  headers.append('Authorization', `${token}`);
  headers.append('Access-Control-Expose-Headers', 'Authorization');
  
  return  this.http.get<any>(API_GetSeanceById+id,{ headers } );

}

deleteSeance(SId: any): Observable<any> {
  const token = localStorage.getItem('Authorization');
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'application/json');
  headers.append('Access-Control-Allow-Origin','*');
  headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  headers.append('Access-Control-Allow-Credentials', 'true');
  headers.append('Access-Control-Allow-Headers', 'Authorization')
  headers.append('Authorization', `${token}`);
  headers.append('Access-Control-Expose-Headers', 'Authorization');
 
  return  this.http.delete<any>(API_dSeance+SId, {headers});
  
}

}
