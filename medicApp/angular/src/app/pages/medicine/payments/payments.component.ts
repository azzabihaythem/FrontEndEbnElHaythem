import { Component, OnDestroy, OnInit } from '@angular/core';
import { BasePageComponent } from '../../base-page';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../interfaces/app-state';
import { HttpService } from '../../../services/http/http.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Content } from '../../../ui/interfaces/modal';
import { TCModalService } from '../../../ui/services/modal/modal.service';
import { IUser } from '../../../ui/interfaces/user';
import { SeanceTypeWID } from 'src/app/model/SeanceTypeWID';
import { Router } from '@angular/router';
import { SeanceTypeService } from 'src/app/services/SeanceType.service';
import { SeanceType } from 'src/app/model/SeanceType';

@Component({
  selector: 'page-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PagePaymentsComponent extends BasePageComponent implements OnInit, OnDestroy {
  payments: any[];
  paymentForm: FormGroup;
  doctors: IUser[];
  isEditMode: boolean = false;
  isSuccessful = false;
  isSignUpFailed = false;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  seanceType : SeanceTypeWID;
  content?: string;

  constructor(
    store: Store<IAppState>,
    httpSv: HttpService,
    private modal: TCModalService,
    private formBuilder: FormBuilder,
    private router: Router,
    private seancetypeService: SeanceTypeService
  ) {
    super(store, httpSv);

    this.pageData = {
      title: 'Payments',
      breadcrumbs: [
        {
          title: 'Medicine',
          route: 'default-dashboard'
        },
        {
          title: 'Payments'
        }
      ]
    };
    this.payments = [];
    this.doctors = [];
  }

  ngOnInit() {
    super.ngOnInit();

    this.paymentForm = new FormGroup({
      EXONERE: new FormControl(),
      MSP: new FormControl(),
      MTHTAXE: new FormControl(),
      MTTVA: new FormControl(),
      typeName: new FormControl(),
  });

    this.seancetypeService.getAllSeancetype().subscribe({
      next: (res: SeanceTypeWID) => { 
        this.seanceType = res;
        console.log('log patient ***', res);
      
      },
      error: err => {
        //this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        console.log(err,'ereuuur ');
      }
    });


    this.getData('assets/data/payments.json', 'payments', 'setLoaded');
    this.getData('assets/data/doctors.json', 'doctors');
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  // open modal window
  openModal<T>(body: Content<T>, header: Content<T> = null, footer: Content<T> = null, options: any = null, seancetype: SeanceTypeWID = null) {
    this.initPaymentForm(seancetype);

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
    this.paymentForm.reset();
  }

  setSidToLocal(SId: number) {
    localStorage.setItem('selectedSeancetypeId', SId.toString());
  }

  edit() {
    this.isEditMode = true;
    //this.openModal(this.modalBody, 'Add payment', this.modalFooter, seance);
    
  }

  remove(id: any) {
    //this.appointments = this.appointments.filter(row => row !== tableRow);
    this.seancetypeService.deleteSeancetype(id).subscribe({
      next: (Pdata: SeanceTypeWID) => {
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

  // init form
  initPaymentForm(data :any) {
    // this.paymentForm = this.formBuilder.group({
    //   billNo: ['', Validators.required],
    //   billDate: ['', Validators.required],
    //   patient: ['', Validators.required],
    //   doctor: ['', Validators.required],
    //   charges: ['', Validators.required],
    //   tax: ['', Validators.required],
    //   discount: ['', Validators.required],
    //   total: ['', Validators.required]
    // });
    if (this.isEditMode) {
      console.log("etat editmode true or false *****", this.isEditMode);
      var id = localStorage.getItem("selectedSeancetypeId");
      this.seancetypeService.getSeancetypebyId(id).subscribe((res: SeanceTypeWID) => {
        this.paymentForm = this.formBuilder.group({
          EXONERE: [res.EXONERE, Validators.required],
          MSP: [res.MSP, Validators.required],
          MTHTAXE: [res.MTHTAXE, Validators.required],
          MTTVA: [res.MTTVA, Validators.required],
          typeName: [res.typeName, Validators.required]
        });
    
      });
    } else {
      this.paymentForm = this.formBuilder.group({
        EXONERE: ['', Validators.required],
        MSP: ['', Validators.required],
        MTHTAXE: ['', Validators.required],
        MTTVA: ['', Validators.required],
        typeName: ['', Validators.required],
      });
    }
  }

  // add new payment
  addPayment(form: FormGroup) {
      // this.payments.unshift(form.value);
      // let newTableData = JSON.parse(JSON.stringify(this.payments));

      // this.payments = newTableData;
      // this.closeModal();

      if (this.isEditMode) {
        // Perform edit operation
        const SId = localStorage.getItem('selectedSeancetypeId');
        // const seanceTypeId = form.value['SeanceTypeName']; 
        //   const patientId = form.value['patientn']; 
        //  let st = new SeanceT(seanceTypeId);

        const editseancetype = new SeanceTypeWID(form.value['EXONERE'],form.value['MSP'],form.value['MTHTAXE'],form.value['MTTVA'],form.value['typeName']);
    
        this.seancetypeService.editSeancetype(editseancetype,SId).subscribe({
          next: (data: Response) => {
            console.log('SUCCESS UPDATED SEANCE EDIT DATA*********', data);
            // Handle success
            this.isSuccessful = true;
            this.isSignUpFailed = false;
            this.paymentForm.reset();
            this.closeModal();
            this.router.navigate(['/vertical/payments']).then(() => {
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

          const addseancetype = new SeanceTypeWID(form.value['EXONERE'],form.value['MSP'],form.value['MTHTAXE'],form.value['MTTVA'],form.value['typeName']);
          console.log("vue DATA SEANCETYPE//////////////", addseancetype) ;
    
          this.seancetypeService.createSeanceType(addseancetype).subscribe({
            next: (data: Response) => {
              console.log('SUCCESS SEANCE DATA', data);
              // Handle success
              this.isSuccessful = true;
              this.isSignUpFailed = false;
              this.paymentForm.reset();
              this.closeModal();
              this.router.navigate(['/vertical/payments']).then(() => {
                window.location.reload();
              });
            },
            error: err => {
              console.error(err);
              this.content = JSON.parse(err.error).message;
            }
          });
          this.closeModal();
        }
      }
    
    
    
  }
}
