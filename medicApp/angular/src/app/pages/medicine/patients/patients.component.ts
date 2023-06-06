import { Component, OnDestroy, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { BasePageComponent } from '../../base-page';
import { IAppState } from '../../../interfaces/app-state';
import { HttpService } from '../../../services/http/http.service';
import { IPatient } from '../../../interfaces/patient';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IOption } from '../../../ui/interfaces/option';
import { Content } from '../../../ui/interfaces/modal';
import * as PatientsActions from '../../../store/actions/patients.actions';
import { TCModalService } from '../../../ui/services/modal/modal.service';
import { PatientService } from 'src/app/services/patient.service';
import { Patient } from 'src/app/model/Patient';
import { Router, ActivatedRoute } from '@angular/router';
import { AddPatient } from 'src/app/model/AddPatient';
import { DatePipe } from '@angular/common';
import { PriseEnCharges } from 'src/app/model/PriseEnCharges';
import { Clin } from 'src/app/model/Clin';
import { UserPost } from 'src/app/model/UserPost';
import { PriseEnChargees } from 'src/app/model/PriseEnChargees';
import { UserEdit } from 'src/app/model/UserEdit';
import { PatientwID } from 'src/app/model/PatientwID';
//import { ToastrService } from 'ngx-toastr';


import { get } from 'jquery';
import { pages } from 'src/app/helpers/constants/pages';

@Component({
  selector: 'page-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PagePatientsComponent extends BasePageComponent implements OnInit, OnDestroy {
  patients: IPatient[];
  patientss: Patient[];
  patientForm: FormGroup;
  gender: IOption[];
  status: IOption[];
  daysOfWeek: IOption[];
  patient : Patient;
  patientwID : PatientwID
  pat : AddPatient;
  changes: boolean;
  patientInfo: any;

  isSuccessful = false;
 isSignUpFailed = false;
  
  currentAvatar: string | ArrayBuffer;
  defaultAvatar: string;

  //patient: Patient;

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  constructor(
    store: Store<IAppState>,
    httpSv: HttpService,
    private fb: FormBuilder,
    private modal: TCModalService,
    private patientService: PatientService,
    private router: Router,
    private route: ActivatedRoute,
  
  ) {
    super(store, httpSv);

    this.pageData = {
      title: 'Patients',
      breadcrumbs: [
        {
          title: 'Medicine',
          route: 'default-dashboard'
        },
        {
          title: 'Patients'
        }
      ]
    };
    this.patients = [];
    /*
    this.gender = [
      {
        label: 'Male',
        value: 'male'
      },
      {
        label: 'Female',
        value: 'female'
      }
    ];
    this.status = [
      {
        label: 'Approved',
        value: 'approved'
      },
      {
        label: 'Pending',
        value: 'pending'
      }
    ]; */

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

    this.patientForm = new FormGroup({
      firstName: new FormControl(),
    lastName: new FormControl(),
  birthDate: new FormControl(),
  login: new FormControl(),
  password: new FormControl(),
  affile: new FormControl(),
  desactivationDate: new FormControl(),
  doit: new FormControl(),
  numAffiliation: new FormControl(),
  number: new FormControl(),
  startDate: new FormControl(),
  endDate: new FormControl(),
  seanceDays: new FormControl()
  });
 
    
 this.patientService.getAllPatient().subscribe({
  next: (res: Patient) => { 
    this.patient = res;
    console.log('log patient ***', res);
  
  },
  error: err => {
    //this.errorMessage = err.error.message;
    this.isLoginFailed = true;
    console.log(err,'ereuuur ');
  }
});


////Need to be changed ******** 
    this.store.select('patients').subscribe(patients => {
      if (patients && patients.length) {
        this.patients = patients;

        !this.pageData.loaded ? this.setLoaded() : null;
      }
    });
  }

  /// ***GO TO PROFILE BY ID*******  fixed 
  goToPatientProfile(patientId: number) {
    localStorage.setItem('selectedPatientId', patientId.toString());
  this.router.navigate(['/vertical/patient-profile']);
   //this.router.navigate(['vertical/patient-profile', patientId]);
  }
  
  setPidToLocal(patientId: number) {
    localStorage.setItem('selectedPatientId', patientId.toString());
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  // delete patient
  remove(id: string) {
    this.store.dispatch(new PatientsActions.Delete(id));
  }

  // open modal window
  openModal<T>(body: Content<T>, header: Content<T> = null, footer: Content<T> = null, patient: Patient) {
    this.initPatientForm(patient);
    //this.initPatientForm(this.patientInfo);
    this.modal.open({
      body: body,
      header: header,
      footer: footer,
      options: null
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
  initPatientForm(res: AddPatient) {
    var id = localStorage.getItem("selectedPatientId") ;
    this.patientService.getPatientbyId(id).subscribe({
      next: (res: AddPatient) => { 
       // this.patient = res;
        const dateSendingToServer_birthdate = new DatePipe('en-US').transform(res.user.birthDate,'yyyy-MM-dd');
        const dateSendingToServer_desactivation = new DatePipe('en-US').transform(res.desactivationDate,'yyyy-MM-dd');
        const dateSendingToServer_startDate = new DatePipe('en-US').transform(res.priseEnCharges.slice(-1)[0].startDate,'yyyy-MM-dd');
        const dateSendingToServer_endDate = new DatePipe('en-US').transform(res.priseEnCharges.slice(-1)[0].endDate,'yyyy-MM-dd');
         //console.log('profile edit Information ***: ', res);
        // console.log('Date test :) ***: ', dateSendingToServer_desactivation);
        this.patientForm = this.fb.group({
          //img: [this.currentAvatar],
          firstName: [res?.user?.firstName, Validators.required],
          lastName: [res.user.lastName, Validators.required],
          birthDate: [dateSendingToServer_birthdate, Validators.required],
          login: [res.user.login, Validators.required],
          password: [res.user.password, Validators.required],
          affile: [res.affile, Validators.required],
          desactivationDate: [dateSendingToServer_desactivation, Validators.required],
          doit: [res.doit, Validators.required],
          numAffiliation: [res.numAffiliation, Validators.required],
          number: [res.priseEnCharges.slice(-1)[0]?.number, Validators.required],
          startDate: [dateSendingToServer_startDate , Validators.required],
          endDate: [dateSendingToServer_endDate, Validators.required],
          seanceDays: [res.seanceDays, Validators.required],
          
          
        });
        
        console.log('test patienFormmmmmmmmmmmmmmmm',res.priseEnCharges[0].number);
        console.log('Firstname patienFormmmmmmmmmmmmmmmm',this.patientForm.value.firstName);
        console.log('****success data Patient form**** !',res);
        console.log('------ data PatientForm-------',this.patientForm);
        // this.patientForm.valueChanges.subscribe(() => {
        //   this.changes = true;
        // });

      }
  
      ,error: err => {
        this.isLoginFailed = true;
        console.log(err,'ereuuur ');
      }
    });

    // this.currentAvatar = data.img ? data.img : this.defaultAvatar;

    // this.patientForm = this.fb.group({
    //   //img: [this.currentAvatar],
    //       firstName: [res.user.firstName, Validators.required],
    //       lastName: [res.user.lastName, Validators.required],
    //       birthDate: [res.user.birthDate, Validators.required],
    //       login: [res.user.login, Validators.required],
    //       password: [res.user.password, Validators.required],
    //       affile: [res.affile, Validators.required],
    //       desactivationDate: [res.desactivationDate, Validators.required],
    //       doit: [res.doit, Validators.required],
    //       numAffiliation: [res.numAffiliation, Validators.required],
    //       number: [res.priseEnCharges.slice(-1)[0].number, Validators.required],
    //       startDate: [res.priseEnCharges.slice(-1)[0].startDate , Validators.required],
    //       endDate: [, Validators.required],
    //       seanceDays: [res.seanceDays, Validators.required],
    // });
    
    
  }
  // initPatientForm(data: IPatient) {
  //   this.currentAvatar = data.img ? data.img : this.defaultAvatar;

  //   this.patientForm = this.fb.group({
  //     id: data.id,
  //     img: [this.currentAvatar],
  //     name: [data.name ? data.name : '', Validators.required],
  //     number: [data.number ? data.number : '', Validators.required],
  //     age: [data.age ? data.age : '', Validators.required],
  //     lastVisit: [data.lastVisit ? data.lastVisit : '', Validators.required],
  //     gender: [data.gender ? data.gender.toLowerCase() : '', Validators.required],
  //     address: [data.address ? data.address : '', Validators.required],
  //     status: [data.status ? data.status.toLowerCase() : '', Validators.required]
  //   });
  // }
// detect form changes

//update patient without erreur *****
updatePatient(patientForm: FormGroup) {

  const id = localStorage.getItem("selectedPatientId");

  this.patientService.getPatientbyId(id).subscribe({
    next: (Pdata: PatientwID) => {
      const userId = Pdata.user.id;
      this.isSuccessful = true;
      this.isSignUpFailed = false;

      if (patientForm.valid) {
        let priseEnCharges: PriseEnCharges[] = [];
        let clin = new Clin(1);

      //   // Decrypt the existing password
      //   let decryptedPassword = Pdata.user.password;
      //   const isPasswordEncrypted = bcrypt.compareSync(Pdata.user.password, Pdata.user.password);
      //   if (isPasswordEncrypted) {
      //     decryptedPassword = ''; // Decrypt the password using your decryption mechanism
      //   }

      //   // Compare and hash the new password
      //   const plainTextPassword = patientForm.value['password'];
      //  // const isPasswordMatch = bcrypt.compareSync(plainTextPassword, decryptedPassword);
      //   const saltRounds = 10;
      //   const hashedNewPassword = bcrypt.hashSync(plainTextPassword, saltRounds); // add to let user **

      //   // if (isPasswordMatch) {
      //   //   // Passwords match, show error message and return
      //   //   //this.error('Password is the same as the old one. Please change it.');
      //   //   return;
      //   // }

        // Passwords don't match, update the patient data including the password
        let user = new UserEdit(userId, false, patientForm.value['birthDate'].toString(), patientForm.value['firstName'], patientForm.value['lastName'], patientForm.value['login'], patientForm.value['password'], clin);
        let priseenChargesdata = new PriseEnChargees(patientForm.value['endDate'].toString(), patientForm.value['number'], patientForm.value['startDate'].toString());
        priseEnCharges.push(priseenChargesdata);
        let editpatient = new AddPatient(patientForm.value['affile'], patientForm.value['desactivationDate'].toString(), patientForm.value['doit'], patientForm.value['numAffiliation'], patientForm.value['seanceDays'], priseEnCharges, user);

        console.log("Show patient data from form:", editpatient);

        this.patientService.editPatient(editpatient, id).subscribe({
          next: (data: Response) => {
            console.log('**** Edit Success ****', data);
            this.isSuccessful = true;
            this.isSignUpFailed = false;
            //this.router.navigate(['vertical/user-profile']);
            this.closeModal();
            this.patientForm.reset();
            location.reload();
          },
          error: err => {
            this.isLoginFailed = true;
            console.log('Error:', err);
          }
        });
      }
    }
  });

  // var id = localStorage.getItem("selectedPatientId") ;
  

  // this.patientService.getPatientbyId(id)
  //   .subscribe({
  //     next: (Pdata: PatientwID) => {
  //       const userId = Pdata.user.id;
  //       this.isSuccessful = true;
  //       this.isSignUpFailed = false;

  //       if (patientForm.valid) {
  //         const priseEnCharges: PriseEnCharges[] = [];
  //         const clin = new Clin(1);
  //         const user = new UserEdit(userId, false, patientForm.value['birthDate'].toString(), patientForm.value['firstName'], patientForm.value['lastName'], patientForm.value['login'], patientForm.value['password'], clin);
  //         const priseEnChargesData = new PriseEnChargees(patientForm.value['endDate'].toString(), patientForm.value['number'], patientForm.value['startDate'].toString());
  //         priseEnCharges.push(priseEnChargesData);
  //         const editPatient = new AddPatient(patientForm.value['affile'], patientForm.value['desactivationDate'].toString(), patientForm.value['doit'], patientForm.value['numAffiliation'], patientForm.value['seanceDays'], priseEnCharges, user);

  //         console.log("Show patient data from form: ", editPatient);

  //         this.patientService.editPatient(editPatient, id)
  //           .subscribe({
  //             next: (data: Response) => {
  //               console.log('**** Show edit TEST ****', data);
  //               this.isSuccessful = true;
  //               this.isSignUpFailed = false;
  //               //this.router.navigate(['vertical/user-profile']);
  //             },
  //             error: (err) => {
  //               this.isLoginFailed = true;
  //               console.log(err, 'Error');
  //             }
  //           });
  //       }
  //     },
  //     error: (error) => {
  //       console.log(error);
  //       // Handle error case
  //     }
  //   });

// if (form.valid) {
//   let newPatient: IPatient = form.value;

//   this.store.dispatch(new PatientsActions.Edit(newPatient));
//   this.closeModal();
//   this.patientForm.reset();
// }
} 



  // update patient with erreur ******
  // updatePatient(patientForm: FormGroup) {
    
  //     //var id = localStorage.getItem("userId") ; 
  //     var id = localStorage.getItem("selectedPatientId") ;
  //     //const patientData = this.patientwID(id);
  //     const userId = this.patientwID.user.id;
  //     //localStorage.setItem('PuserId', userId);

  //     if (patientForm.valid) {
  //       let priseEnCharges: PriseEnCharges[] = [];
  //     // if (patientForm.valid) {
  //        ///
  //   //const data = this.registerForm.value;
  //   let clin = new Clin(1);
  //   let user = new UserEdit(userId,false,patientForm.value['birthDate'].toString(),patientForm.value['firstName'], patientForm.value['lastName'], 
  //      patientForm.value['login'], patientForm.value['password'],clin);
     
  //    let priseenChargesdata = new PriseEnChargees (patientForm.value['endDate'].toString(),patientForm.value['number'],patientForm.value['startDate'].toString()) ; 
  //    priseEnCharges.push(priseenChargesdata) ;
   
  //    let editpatient = new AddPatient(patientForm.value['affile'],patientForm.value['desactivationDate'].toString(),patientForm.value['doit'],patientForm.value['numAffiliation'],patientForm.value['seanceDays'],priseEnCharges,user) ;
     
  //       console.log("show  patient data from formulair++++++",editpatient) ;
  //    this.patientService.editPatient(editpatient,id).subscribe({
  //   next : (data : Response) => {
  //     console.log('****show edit TESTTTT ****',data);
  //     this.isSuccessful = true;
  //     this.isSignUpFailed = false;
  //     //this.router.navigate(['vertical/user-profile']);
  //   },
  //   error: err => {
  //     this.isLoginFailed = true;
  //     console.log(err,'ereuuur ');
  //   }
            
  //         });
      
  //   }
  //   // if (form.valid) {
  //   //   let newPatient: IPatient = form.value;

  //   //   this.store.dispatch(new PatientsActions.Edit(newPatient));
  //   //   this.closeModal();
  //   //   this.patientForm.reset();
  //   // }
  // }
}
