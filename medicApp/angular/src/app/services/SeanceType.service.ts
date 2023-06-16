import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SeanceType } from '../model/SeanceType';
import { SeanceTypeWID } from '../model/SeanceTypeWID';

const API_SessiontypeList = 'http://localhost:8080/v1/seancetype/all';
const API_SeancetypeAdd = 'http://localhost:8080/v1/seancetype/add';
const API_SeancetypeEdit = 'http://localhost:8080/v1/seancetype/update?SId=';
const API_GetSeancetypeById = 'http://localhost:8080/v1/seancetype/';
const API_dSeancetype = 'http://localhost:8080/v1/dseancetype/';

@Injectable({
  providedIn: 'root'
})
export class SeanceTypeService {
  

constructor(private http: HttpClient) { }


getAllSeancetype(): Observable<any> {
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

createSeanceType(seanceType: SeanceTypeWID): Observable<any> {
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

const resp = this.http.post<any>(API_SeancetypeAdd, seanceType,  {observe: 'response', headers  });
//console.log('response partie service - createPatient *******',resp) ;
  return resp ;
   
}
editSeancetype(seancetype: SeanceTypeWID , SId: any): Observable<any> {
  const token = localStorage.getItem('Authorization');
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'application/json');
  headers.append('Access-Control-Allow-Origin','*');
  headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  headers.append('Access-Control-Allow-Credentials', 'true');
  headers.append('Access-Control-Allow-Headers', 'Authorization')
  headers.append('Authorization', `${token}`);
  headers.append('Access-Control-Expose-Headers', 'Authorization'); 
  return  this.http.put<any>(API_SeancetypeEdit+SId, seancetype,  {observe: 'response', headers  });
}

getSeancetypebyId(id: any ) : Observable<any>  {
  const token = localStorage.getItem('Authorization');
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'application/json');
  headers.append('Access-Control-Allow-Origin', '*');
  headers.append('Access-Control-Allow-Credentials', 'true');
  headers.append('Access-Control-Allow-Headers', 'Authorization')
  headers.append('Authorization', `${token}`);
  headers.append('Access-Control-Expose-Headers', 'Authorization');
  
  return  this.http.get<any>(API_GetSeancetypeById+id,{ headers } );

}

deleteSeancetype(SId: any): Observable<any> {
  const token = localStorage.getItem('Authorization');
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'application/json');
  headers.append('Access-Control-Allow-Origin','*');
  headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  headers.append('Access-Control-Allow-Credentials', 'true');
  headers.append('Access-Control-Allow-Headers', 'Authorization')
  headers.append('Authorization', `${token}`);
  headers.append('Access-Control-Expose-Headers', 'Authorization');
 
  return  this.http.delete<any>(API_dSeancetype+SId, {headers});
  
}

}
