import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BasePageComponent } from '../../base-page';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../interfaces/app-state';
import { HttpService } from '../../../services/http/http.service';
import { TCModalService } from '../../../ui/services/modal/modal.service';
import { IUser } from '../../../ui/interfaces/user';
import { SessionService } from 'src/app/services/Session.service';
import { AddSeance } from 'src/app/model/AddSession';
import { Patient } from 'src/app/model/Patient';
import { PatientService } from 'src/app/services/patient.service';
import { SeanceType } from 'src/app/model/SeanceType';
import { SeanceT } from 'src/app/model/SeanceT';
import { P } from 'src/app/model/P';
import { PatientwID } from 'src/app/model/PatientwID';
import { Router } from '@angular/router';
import { EditSeance } from 'src/app/model/EditSession';
import { DatePipe } from '@angular/common';
import { id } from '@swimlane/ngx-charts';


@Component({
  selector: 'page-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class PageAppointmentsComponent extends BasePageComponent implements OnInit, OnDestroy {
  @ViewChild('modalBody', { static: true }) modalBody: ElementRef<any>;
  @ViewChild('modalFooter', { static: true }) modalFooter: ElementRef<any>;

  appointments: any[];
  appointmentForm: FormGroup;
  currentAvatar: string | ArrayBuffer;
  defaultAvatar: string;
  doctors: IUser[];
  seance : AddSeance;
  seancetype : SeanceType;
  isSuccessful = false;
  isSignUpFailed = false;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  patient : Patient;
  content?: string;
  isEditMode: boolean = false;

  constructor(
    store: Store<IAppState>,
    httpSv: HttpService,
    private modal: TCModalService,
    private formBuilder: FormBuilder,
    private seanceService: SessionService,
    private patientService: PatientService,
    private router: Router,
  ) {
    super(store, httpSv);

    this.pageData = {
      title: 'Appointments',
      breadcrumbs: [
        {
          title: 'Medicine',
          route: 'default-dashboard'
        },
        {
          title: 'Appointments'
        }
      ]
    };
    this.appointments = [];
    this.doctors = [];
    this.defaultAvatar = 'assets/content/anonymous-400.jpg';
    this.currentAvatar = this.defaultAvatar;
  }

  ngOnInit() {
    
    this.appointmentForm = new FormGroup({
      date: new FormControl(),
      SeanceTypeName: new FormControl(),
      patientn: new FormControl(),
  });
  
    super.ngOnInit();

    this.getData('assets/data/appointments.json', 'appointments', 'setLoaded');
  //  this.getData('assets/data/doctors.json', 'doctors');


    this.seanceService.getAllSeance().subscribe({
      next: (res: AddSeance) => { 
        this.seance = res;
        console.log('log patient ***', res);
      
      },
      error: err => {
        //this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        console.log(err,'ereuuur ');
      }
    });

    this.seanceService.getAllSeanceType().subscribe({
      next: (res: SeanceType) => { 
        this.seancetype = res;
        console.log('log patient ***', res);
      
      },
      error: err => {
        //this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        console.log(err,'ereuuur ');
      }
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


  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  // open modal window
  // openModal(body: any, header: any = null, footer: any = null, data: any = null, seance: EditSeance ) {
  openModal(body: any, header: any = null, footer: any = null, data: any = null, seance: EditSeance = null ) {
    // this.initForm(data);
    this.initForm(seance);
    this.modal.open({
      body: body,
      header: header,
      footer: footer, 
    });
  }

  // close modal window
  closeModal() {
    this.modal.close();
    this.appointmentForm.reset();
  }

  // init form
  initForm(data: any) {
    // this.appointmentForm = this.formBuilder.group({
    //   img: [(data ? data.img : this.currentAvatar)],
    //   name: [(data ? data.name : ''), Validators.required],
    //   email: [(data ? data.email : ''), Validators.required],
    //   date: [(data ? data.date : ''), Validators.required],
    //   from: [(data ? data.fromTo.substring(0, (data.fromTo.indexOf('-') - 1)) : ''), Validators.required],
    //   to: [(data ? data.fromTo.substring((data.fromTo.indexOf('-') + 2), data.fromTo.length) : ''), Validators.required],
    //   number: [(data ? data.number : ''), Validators.required],
    //   doctor: [(data ? data.doctor : ''), Validators.required],
    //   injury: [(data ? data.injury : ''), Validators.required]
    // });

    // this.appointmentForm = this.formBuilder.group({
    //   img: [(data ? data.img : this.currentAvatar)],
    //   date: ['', Validators.required],
    //   SeanceTypeName: ['', Validators.required],
    //   patientn: [ '', Validators.required]
    // });

    if (this.isEditMode) {
      // Fetch appointment by ID
      console.log("etat editmode true or false *****", this.isEditMode);
      var id = localStorage.getItem("selectedSeanceId");
      this.seanceService.getSeancebyId(id).subscribe((res: EditSeance) => {
        const dateSendingToServer_date = new DatePipe('en-US').transform(res.date,'yyyy-MM-dd');
        this.appointmentForm = this.formBuilder.group({
          date: [dateSendingToServer_date, Validators.required],
          SeanceTypeName: [res.seanceType.id, Validators.required],
          patientn: [res.patient.id, Validators.required],
        });
    
      });
    } else {
      // Initialize new appointment form
      this.appointmentForm = this.formBuilder.group({
        img: [(data ? data.img : this.currentAvatar)],
        date: ['', Validators.required],
        SeanceTypeName: ['', Validators.required],
        patientn: ['', Validators.required]
      });
    }
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

  // edit appointment
  // edit(row: any) {
  //   this.openModal(this.modalBody, 'Add appointment', this.modalFooter, row);
  // }
  edit(seance: any) {
    // var id = localStorage.getItem("selectedSeanceId");
    //  console.log("seanceID TAWA*******",id)
    this.isEditMode = true;
    this.openModal(this.modalBody, 'Add appointment', this.modalFooter, seance);
    
  }
 


  // remove appointment tableRow
  remove(id: any) {
    //this.appointments = this.appointments.filter(row => row !== tableRow);
    this.seanceService.deleteSeance(id).subscribe({
      next: (Pdata: EditSeance) => {
        console.log('**** Delete Success ****', Pdata);
          this.isSuccessful = true;
          this.isSignUpFailed = false;
         // this.patientForm.reset();
          location.reload();
      },
      error: (err) => {
          this.isLoginFailed = true;
          console.log('Error:', err);
        }
    });
  }
  
  setSidToLocal(SId: number) {
    localStorage.setItem('selectedSeanceId', SId.toString());
  }

  // add new appointment
  addAppointment(form: FormGroup) {
    // this.isEditMode  = false;
    // console.log("isEditMode true or false *******",this.isEditMode);
    // if (form.valid) {
    //   let newAppointment: any = form.value;

    //   newAppointment.fromTo = `${form.value.from} - ${form.value.to}`;
    //   newAppointment.img = this.currentAvatar;

    //   delete newAppointment.from;
    //   delete newAppointment.to;

    //   this.appointments.unshift(newAppointment);
    //   let newTableData = JSON.parse(JSON.stringify(this.appointments));

    //   this.appointments = newTableData;
    //   this.closeModal();
    // }

    // if (form.valid) {
    //   const seanceTypeId = form.value['SeanceTypeName']; 
    //   const patientId = form.value['patientn']; 
  
    //   let st = new SeanceT(seanceTypeId);
    //   let pt = new P(patientId);
    //   const addseance = new AddSeance(form.value['date'], st, pt);
  
    //   console.log('Seance Type ID: *******', seanceTypeId);
    //   console.log('Patient ID:*********', patientId);
    //   console.log('AddSeance object:*******', addseance);

    //   this.seanceService.createSession(addseance).subscribe({
    //     next : (data : Response) => {
    //     console.log('SUCCESS SEANCE DATA  KKKKKKKKKK',data);
    //     this.isSuccessful = true;
    //     this.isSignUpFailed = false;
    //     this.appointmentForm.reset();
    //                 this.closeModal();
    //                 this.router.navigate(['/vertical/appointments']).then(() => {
    //                   window.location.reload();
    //                 });              
    //     },
    //     error: err => {
    //       console.error(err);
    //     this.content = JSON.parse(err.error).message;
    //     } 
        
    //        });
    //   this.closeModal();
    // }

    if (this.isEditMode) {
      // Perform edit operation
      const SId = localStorage.getItem('selectedSeanceId');
      const seanceTypeId = form.value['SeanceTypeName']; 
        const patientId = form.value['patientn']; 
    
       let st = new SeanceT(seanceTypeId);
       let pt = new P(patientId);
       const editSeance = new AddSeance(form.value['date'], st, pt);
  
      this.seanceService.editSeance(editSeance,SId).subscribe({
        next: (data: Response) => {
          console.log('SUCCESS UPDATED SEANCE EDIT DATA*********', data);
          // Handle success
          this.isSuccessful = true;
          this.isSignUpFailed = false;
          this.appointmentForm.reset();
          this.closeModal();
          this.router.navigate(['/vertical/appointments']).then(() => {
            window.location.reload();
          });
        },
        error: err => {
          console.error(err);
          this.content = JSON.parse(err.error).message;
         
        }
      });
    } else {
      
      if (form.valid) {
        const seanceTypeId = form.value['SeanceTypeName'];
        const patientId = form.value['patientn'];
  
        let st = new SeanceT(seanceTypeId);
        let pt = new P(patientId);
        const addseance = new AddSeance(form.value['date'], st, pt);
  
        this.seanceService.createSession(addseance).subscribe({
          next: (data: Response) => {
            console.log('SUCCESS SEANCE DATA', data);
            // Handle success
            this.isSuccessful = true;
            this.isSignUpFailed = false;
            this.appointmentForm.reset();
            this.closeModal();
            this.router.navigate(['/vertical/appointments']).then(() => {
              window.location.reload();
            });
          },
          error: err => {
            console.error(err);
            this.content = JSON.parse(err.error).message;
            // Handle error
          }
        });
        this.closeModal();
      }
    }
    
  }
}
