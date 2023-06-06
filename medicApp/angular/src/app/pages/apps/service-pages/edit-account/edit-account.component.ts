import { Component, OnDestroy, OnInit } from '@angular/core';
import { BasePageComponent } from '../../../base-page';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../../interfaces/app-state';
import { HttpService } from '../../../../services/http/http.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IOption } from '../../../../ui/interfaces/option';
import { UserService } from 'src/app/services/user.service';
import { UserPost } from 'src/app/model/UserPost';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Clinique } from 'src/app/model/Clinique';
import { id } from '@swimlane/ngx-charts';

@Component({
  selector: 'page-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.scss']
})
export class PageEditAccountComponent extends BasePageComponent implements OnInit, OnDestroy {
  userInfo: any;
  userForm: FormGroup;
  gender: IOption[];
  status: IOption[];
  currentAvatar: string | ArrayBuffer;
  defaultAvatar: string;
  changes: boolean;
  user : UserPost ;
  isLoginFailed = false;
  dateSendingToServer : Date ; 

 public clinique : Clinique [] ; 
  public userp : UserPost [] ; 
 isSuccessful = false;
 isSignUpFailed = false;
 errorMessage = '';

 content?: string;

  constructor(
    store: Store<IAppState>,
    httpSv: HttpService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    super(store, httpSv);

    this.pageData = {
      title: 'Edit account',
      loaded: true,
      breadcrumbs: [
        
        {
          title: 'Apps',
          route: 'default-dashboard'
        },
        {
          title: 'Service pages',
          route: 'default-dashboard'
        },
        {
          title: 'Edit account'
        }
      ]
    };/*
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
    this.defaultAvatar = 'assets/content/anonymous-400.jpg';
    this.currentAvatar = this.defaultAvatar;
    this.changes = false;
  }

  ngOnInit() {
   super.ngOnInit();

   this.getData('assets/data/account-data.json', 'userInfo', 'loadedDetect');    
    
   
    
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  loadedDetect() {
    this.setLoaded();

    this.currentAvatar = this.userInfo.img;
    this.inituserForm(this.userInfo); 
  }


  // init form
  inituserForm(res: UserPost) {
    var id = localStorage.getItem("userId") ;
    this.userService.getUserbyId(id).subscribe({
      next: (res: UserPost) => { 
        this.user = res;
        const dateSendingToServer = new DatePipe('en-US').transform(this.user.birthDate,'yyyy-MM-dd');
       // console.log('profile edit Information ***: ', res);
        this.userForm = this.formBuilder.group({
          img: [this.currentAvatar],
          firstName: [res.firstName, Validators.required],
          lastName: [res.lastName, Validators.required],
          birthdate: [dateSendingToServer, Validators.required],
          login: [res.login, Validators.required],
          password: [res.password, Validators.required],
          //address: [data.address, Validators.required],
          //gender: [data.gender, Validators.required],
          //age: [data.age, Validators.required],
          //lastVisit: [data.lastVisit, Validators.required],
          //status: [data.status, Validators.required]
          
        });
        console.log('****success data form**** !',res);

      }
  
      ,error: err => {
        //this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        console.log(err,'ereuuur ');
      }
    });
    
    this.userForm = this.formBuilder.group({
      img: [this.currentAvatar],
      firstName: [res.firstName, Validators.required],
      lastName: [res.lastName, Validators.required],
      birthdate: [res.birthDate, Validators.required],
      login: [res.login, Validators.required],
      password: [res.password, Validators.required],
  
    });
  

    // detect form changes
    this.userForm.valueChanges.subscribe(() => {
      this.changes = true;
    });
  }

  // save form data
  saveData(form: FormGroup) {
    var id = localStorage.getItem("userId") ;
    if (form.valid) {
      let clin = new Clinique(1);
    let user = new UserPost(false,form.value['birthdate'].toString(),form.value['firstName'], form.value['lastName'], 
       form.value['login'], form.value['password'],clin);
      console.log("show data from formulair++++++",user) ;
   this.userService.editUser(user,id).subscribe({
  next : (data : Response) => {
    console.log('show edit****',data);
    this.isSuccessful = true;
    this.isSignUpFailed = false;
    this.router.navigate(['vertical/user-profile']);
  },
  error: err => {
    this.isLoginFailed = true;
    console.log(err,'ereuuur ');
  }
          
        });
        
 
    
  }
  /*
      this.userInfo = form.value;
      console.log('save data log ',this.userInfo);
      this.changes = false;
    } */
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

