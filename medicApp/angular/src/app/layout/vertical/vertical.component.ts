import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';

import { IAppState } from '../../interfaces/app-state';
import { BaseLayoutComponent } from '../base-layout/base-layout.component';
import { HttpService } from '../../services/http/http.service';
import { IOption } from '../../ui/interfaces/option';
import { Content } from '../../ui/interfaces/modal';
import { TCModalService } from '../../ui/services/modal/modal.service';
import { IPatient } from '../../interfaces/patient';
import * as PatientsActions from '../../store/actions/patients.actions';
import * as SettingsActions from '../../store/actions/app-settings.actions';
import { Clinique } from 'src/app/model/Clinique';
import { PatientService } from 'src/app/services/patient.service';
import { UserPost } from 'src/app/model/UserPost';
import { Patient } from 'src/app/model/Patient';
import { PriseEnCharges } from 'src/app/model/PriseEnCharges';
import { number } from 'echarts';
import { PriseEnChargees } from 'src/app/model/PriseEnChargees';
import { AddPatient } from 'src/app/model/AddPatient';
import { Clin } from 'src/app/model/Clin';

@Component({
  selector: 'vertical-layout',
  templateUrl: './vertical.component.html',
  styleUrls: [
    '../base-layout/base-layout.component.scss',
    './vertical.component.scss'
  ]
})
export class VerticalLayoutComponent extends BaseLayoutComponent implements OnInit {
  patientForm: FormGroup;
  gender: IOption[];
  daysOfWeek: IOption[];
  currentAvatar: string | ArrayBuffer;
  defaultAvatar: string;
  public isButtonVisible = true;

  public clinique : Clinique [] ; 
  public userp : UserPost [] ; 
 isSuccessful = false;
 isSignUpFailed = false;
 errorMessage = '';
 content?: string;

//  priseenCharges: PriseEnCharges[];

  constructor(
    store: Store<IAppState>,
    fb: FormBuilder,
    httpSv: HttpService,
    router: Router,
    elRef: ElementRef,
    private modal: TCModalService, 
    private patientservice: PatientService

  ) {
    super(store, fb, httpSv, router, elRef);

    this.gender = [
      {
        label: '',
        value: ''
      },
      {
        label: '',
        value: ''
      }
    ];
    this.daysOfWeek = [  { label: 'Monday', value: 'MONDAY' }, 
     { label: 'Tuesday', value: 'TUESDAY' }, 
      { label: 'Wednesday', value: 'WEDNESDAY' }, 
       { label: 'Thursday', value: 'THURSDAY' }, 
        { label: 'Friday', value: 'FRIDAY' }, 
         { label: 'Saturday', value: 'SATURDAY' }, 
          { label: 'Sunday', value: 'SUNDAY' }];

    this.defaultAvatar = 'assets/content/anonymous-400.jpg';
    this.currentAvatar = this.defaultAvatar;
  }

  ngOnInit() {
    super.ngOnInit();
    const roleId =  localStorage.getItem('roleId');
    //alert(roleId) ;
    if(roleId == '4'){
      this.isButtonVisible = false;
    }else{
      this.isButtonVisible = true;

    }
    this.store.dispatch(new SettingsActions.Update({ layout: 'vertical' }));
  }

  // open modal window
  openModal<T>(body: Content<T>, header: Content<T> = null, footer: Content<T> = null, options: any = null) {
    this.initPatientForm();

    this.modal.open({
      body: body,
      header: header,
      footer: footer,
      options: options
    });
  }

  // close modal window
  closeModal() {
    this.modal.close();
    this.patientForm.reset();
    this.currentAvatar = this.defaultAvatar;
  }

  // upload new file
  onFileChanged(inputValue: any) {
    let file: File = inputValue.target.files[0];
    let reader: FileReader = new FileReader();

    reader.onloadend = () => {
      this.currentAvatar = reader.result;
    };

    reader.readAsDataURL(file);
  }

  // init form
  initPatientForm() {
    this.patientForm = this.fb.group({
      // img: [],
      affile: ['', Validators.required],
      desactivationDate: ['', Validators.required],
      doit: ['', Validators.required],
      numAffiliation: ['', Validators.required],
      number: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      seanceDays: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
      login: ['', Validators.required],
      password: ['', Validators.required],
      // age: ['', Validators.required],
      // gender: ['', Validators.required],
      // address: ['', Validators.required]
    });
  }

  // add new patient
  // addPatient(form: FormGroup) {
  //   if (form.valid) {
  //     let newPatient: IPatient = form.value;

  //     newPatient.img = this.currentAvatar;
  //     newPatient.id = '23';
  //     newPatient.status = 'Pending';
  //     newPatient.lastVisit = '';

  //     this.store.dispatch(new PatientsActions.Add(newPatient));
  //     this.closeModal();
  //     this.patientForm.reset();
  //   }
  // }
  reloadDifferentPage() {
    this.router.navigate(['/#/vertical/user-profile'], { replaceUrl: true });
    this.router.navigate(['/#/vertical/patients'], { replaceUrl: true });
    window.location.reload()
    
  }

  addPatient(patientForm: FormGroup) {
    let priseEnCharges: PriseEnCharges[] = [];
   // if (patientForm.valid) {
      ///
 //const data = this.registerForm.value;
 let clin = new Clin(1);
 let user = new UserPost(false,patientForm.value['birthDate'].toString(),patientForm.value['firstName'], patientForm.value['lastName'], 
    patientForm.value['login'], patientForm.value['password'],clin);
  
  let priseenChargesdata = new PriseEnChargees (patientForm.value['endDate'].toString(),patientForm.value['number'],patientForm.value['startDate'].toString()) ; 
  priseEnCharges.push(priseenChargesdata) ;

  let addpatient = new AddPatient(patientForm.value['affile'],patientForm.value['desactivationDate'].toString(),patientForm.value['doit'],patientForm.value['numAffiliation'],patientForm.value['seanceDays'],priseEnCharges,user) ;
  
   //localStorage.setItem('roleId', 4)
   console.log("show data from formulair++++++",addpatient) ;

  this.patientservice.createPatient(addpatient).subscribe({
next : (data : Response) => {
console.log('SUBSCRIBE data *****',data);
this.isSuccessful = true;
this.isSignUpFailed = false;
this.patientForm.reset();
            this.closeModal();
            this.router.navigate(['/vertical/patients']).then(() => {
              window.location.reload();
            });
            
            
},
error: err => {
  console.error(err);
this.content = JSON.parse(err.error).message;
} 

   });
   
 //  this.reloadDifferentPage;

      //let newPatient: IPatient = form.value;
       //newPatient.img = this.currentAvatar;
     //let newPatient: Patient = patientForm.value;
    //   //newPatient.id = '23';
    //   newPatient.user.clinique = 'Pending';
    //   newPatient.lastVisit = '';

      // this.store.dispatch(new PatientsActions.Add(newPatient));
     // this.closeModal();
      //this.patientForm.reset();
  //  }
  }




  

  
}
