import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from '../model/Patient';

const API_Patient = 'http://localhost:8080/v1/listPatient';
const API_PatientById = 'http://localhost:8080/v1/patients/';
const API_PatientuserById = 'http://localhost:8080/v1/patients/userid/';
const API_CreatePatient = 'http://localhost:8080/v1/patients';
const API_editPatient = 'http://localhost:8080/v1/patient/update/';
const API_editPatients = 'http://localhost:8080/v1/patient/update?PId=';
const API_dPatients = 'http://localhost:8080/v1/dpatients/ ' ;




@Injectable({
  providedIn: 'root'
})
export class PatientService {
  

  constructor(private http: HttpClient) { }


  getAllPatient(): Observable<any> {
    const token = localStorage.getItem('Authorization');
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Credentials', 'true');
    headers.append('Access-Control-Allow-Headers', 'Authorization')
    headers.append('Authorization', `${token}`);
    headers.append('Access-Control-Expose-Headers', 'Authorization');
   // return this.http.get<any>(API_Patient , {observe: 'response',headers});
   return this.http.get<any>(API_Patient , {headers});

  }

  getPatientbyId(id: any ) : Observable<any>  {
    const token = localStorage.getItem('Authorization');


    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Credentials', 'true');
    headers.append('Access-Control-Allow-Headers', 'Authorization')
    headers.append('Authorization', `${token}`);
    headers.append('Access-Control-Expose-Headers', 'Authorization');
    
    return  this.http.get<any>(API_PatientById+id,{ headers } );

}
getPatientbyuserId(id: any ) : Observable<any>  {
  const token = localStorage.getItem('Authorization');


  const headers = new HttpHeaders();
  headers.append('Content-Type', 'application/json');
  headers.append('Access-Control-Allow-Origin', '*');
  headers.append('Access-Control-Allow-Credentials', 'true');
  headers.append('Access-Control-Allow-Headers', 'Authorization')
  headers.append('Authorization', `${token}`);
  headers.append('Access-Control-Expose-Headers', 'Authorization');
  
  return  this.http.get<any>(API_PatientuserById+id,{ headers } );

}
createPatient(patient: Patient): Observable<any> {
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

const resp = this.http.post<any>(API_CreatePatient, patient,  {observe: 'response', headers  });
//console.log('response partie service - createPatient *******',resp) ;
  return resp ;
   
}
editPatient(patient: Patient , PId: any): Observable<any> {
  const token = localStorage.getItem('Authorization');
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'application/json');
  headers.append('Access-Control-Allow-Origin','*');
  headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  headers.append('Access-Control-Allow-Credentials', 'true');
  headers.append('Access-Control-Allow-Headers', 'Authorization')
  headers.append('Authorization', `${token}`);
  headers.append('Access-Control-Expose-Headers', 'Authorization');
  //console.log('test heeaders ****', headers) ;

 
  return  this.http.put<any>(API_editPatients+PId, patient,  {observe: 'response', headers  });
}

deletePatient(PId: any): Observable<any> {
  const token = localStorage.getItem('Authorization');
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'application/json');
  headers.append('Access-Control-Allow-Origin','*');
  headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  headers.append('Access-Control-Allow-Credentials', 'true');
  headers.append('Access-Control-Allow-Headers', 'Authorization')
  headers.append('Authorization', `${token}`);
  headers.append('Access-Control-Expose-Headers', 'Authorization');
 
  return  this.http.delete<any>(API_dPatients+PId, {headers});
  
}

}