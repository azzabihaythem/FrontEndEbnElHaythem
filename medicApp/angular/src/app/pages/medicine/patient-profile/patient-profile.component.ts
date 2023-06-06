import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import { BasePageComponent } from '../../base-page';
import { IAppState } from '../../../interfaces/app-state';
import { HttpService } from '../../../services/http/http.service';
import { IOption } from '../../../ui/interfaces/option';
import { PatientService } from 'src/app/services/patient.service';
import { Patient } from 'src/app/model/Patient';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';


@Component({
  selector: 'page-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.scss']
})

export class PagePatientProfileComponent extends BasePageComponent implements OnInit, OnDestroy {
  patientInfo: any;
  patientTimeline: any;
  patientForm: FormGroup;
  gender: IOption[];
  status: IOption[];
  currentAvatar: string | ArrayBuffer;
  defaultAvatar: string;
  changes: boolean;
  billings: any[];

  patient: Patient;
  isLoginFailed = false;
  patientId: number;
  latestTakeover : any ; 


  

  constructor(
    store: Store<IAppState>,
    httpSv: HttpService,
    private formBuilder: FormBuilder,
    private patientService: PatientService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super(store, httpSv);
    //this.patientId = parseInt(this.route.snapshot.paramMap.get('id'));
    //console.log('GP test*********',this.patientId);
    this.pageData = {
      title: 'Patient profile page',
      breadcrumbs: [
        {
          title: 'Medicine',
          route: 'default-dashboard'
        },
        {
          title: 'Patients',
          route: 'patients'
        },
        {
          title: ''
        }
      ]
    };
    this.gender = [
    //   {
    //     label: 'Male',
    //     value: 'male'
    //   },
    //   {
    //     label: 'Female',
    //     value: 'female'
    //   }
    // ];
    // this.status = [
    //   {
    //     label: 'Approved',
    //     value: 'approved'
    //   },
    //   {
    //     label: 'Pending',
    //     value: 'pending'
    //   }
    ];
    this.defaultAvatar = 'assets/content/anonymous-400.jpg';
    this.currentAvatar = this.defaultAvatar;
    this.changes = false;
    this.billings = [];

    
  }
  
  ngOnInit() {
    super.ngOnInit();
    //localStorage.setItem('patientId', this.patient.id);
    //this.route.navigate(['/orderDetails']);
    
    // const patientsArray = Object.values(this.patients);
    // patientsArray.forEach((patient) => {
    //   console.log('TEST PRISEENCHAGE VALUE**********',patient.priseenCharges);
    // });
    
    
    
    /** path to patient profile :D */
    const selectedPatientId = localStorage.getItem('selectedPatientId');
    if (selectedPatientId) {
    this.patientId = parseInt(selectedPatientId);
    this.patientService.getPatientbyId(this.patientId).subscribe({
      next: (res: Patient) => { 
        this.patient = res;
      },
      error: err => {
        this.isLoginFailed = true;
        console.log(err,'ereuuur ');
      }
    });
  }
          
   // this.updateLatestInfo();
    this.getData('assets/data/patient-info.json', 'patientInfo', 'loadedDetect');
    this.getData('assets/data/patient-timeline.json', 'patientTimeline');
    this.getData('assets/data/patient-billings.json', 'billings');
    
    // to fix THE CODE BELLOW  $$$$$$$$$$$$$$$******************
    
    //this.idPatient = this.route.snapshot.paramMap.get('id');
   //console.log('looog patient id test ****',this.idPatient ) ;
    
    // var id = localStorage.getItem("userId");
    // this.patientService.getPatientbyId(id).subscribe({
    //   next: (res: Patient) => { 
    //     this.patient = res;
    //    //localStorage.setItem('patientId', this.patient.id);
    //     localStorage.setItem('patientId', this.patient.id.toString());
      
    //     console.log('log patient ***', res);
       
        
      
    //   },
    //   error: err => {
    //     //this.errorMessage = err.error.message;
    //     this.isLoginFailed = true;
    //     console.log(err,'ereuuur ');
    //   }
    // });

    // var id = localStorage.getItem("userId");
    // this.patientService.getPatientbyuserId(id).subscribe({
    //   next: (res: Patient) => { 
    //     this.patient = res;
    //    //localStorage.setItem('patientId', this.patient.id);
    //     localStorage.setItem('patientId', this.patient.id.toString());
    //     console.log('log patient ***', res);
    //   },
    //   error: err => {
    //     //this.errorMessage = err.error.message;
    //     this.isLoginFailed = true;
    //     console.log(err,'ereuuur ');
    //   }
    // });


  

  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  loadedDetect() {
    this.setLoaded();

    this.currentAvatar = this.patientInfo.img;
    this.initPatientForm(this.patientInfo);
  }
  updateLatestInfo() {
    // code to update the latest Take Over array 
    this.latestTakeover = this.latestTakeover.slice(-1)[0];
  }

  // init form
  initPatientForm(res: Patient) {
    var id = localStorage.getItem("userId");
    this.patientService.getPatientbyuserId(id).subscribe({
      next: (res: Patient) => { 
        this.patient = res;
        localStorage.setItem('patientId', this.patient.id.toString());
        console.log('****Data patientByUserId ***', res);
        // console.log('gpt1 test********',this.patient);
        // console.log('gpt2 test********',this.patient.priseEnCharges);

        //  for (let priseenCharge of this.patient.priseEnCharges) {
        //    console.log('gpt3 test *******',priseenCharge.startDate);
        // }
         const dateSendingToServer = new DatePipe('en-US').transform(this.patient.user.birthDate,'yyyy-MM-dd');
         this.patientForm = this.formBuilder.group({
           img: [this.currentAvatar],
          //  name: [res.affile, Validators.required],
          //  firstName: [res.user.firstName, Validators.required],
          //  lastName: [res.user.lastName, Validators.required],
          //  birthdate: [dateSendingToServer, Validators.required],
          // login: [res.user.login, Validators.required],
         });
     //console.log('success data form !',this.patientForm);

     }
  
     ,error: err => {
    //     //this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        console.log(err,'ereuuur ');
     }
     });

    this.patientForm = this.formBuilder.group({
      img: [this.currentAvatar],
      // name: [res.affile, Validators.required],
      // firstName: [res.user.firstName, Validators.required],
      // lastName: [res.user.lastName, Validators.required],
      // birthdate: [res.user.birthDate, Validators.required],
      // login: [res.user.login, Validators.required],
  
     });
    //  console.log('za3ma*****', this.patientForm);


    // this.patientForm = this.formBuilder.group({
    //   img: [this.currentAvatar],
    //   name: [data.name, Validators.required],
    //   number: [data.number, Validators.required],
    //   address: [data.address, Validators.required],
    //   gender: [data.gender, Validators.required],
    //   age: [data.age, Validators.required],
    //   id: [data.id, Validators.required],
    //   lastVisit: [data.lastVisit, Validators.required],
    //   status: [data.status, Validators.required]
    // });

    // detect form changes
    this.patientForm.valueChanges.subscribe(() => {
      this.changes = true;
    });
  }

  // save form data
  saveData(form: FormGroup) {
    if (form.valid) {
      this.patientInfo = form.value;
      this.changes = false;
    }
  }

  // upload new file
  onFileChanged(inputValue: any) {
    let file: File = inputValue.target.files[0];
    let reader: FileReader = new FileReader();

    reader.onloadend = () => {
      this.currentAvatar = reader.result;
      this.changes = true;
    };

    reader.readAsDataURL(file);
  }
}
