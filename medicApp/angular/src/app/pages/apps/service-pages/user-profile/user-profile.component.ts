import { Component, OnDestroy, OnInit } from '@angular/core';
import { BasePageComponent } from '../../../base-page';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../../interfaces/app-state';
import { HttpService } from '../../../../services/http/http.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IOption } from '../../../../ui/interfaces/option';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/model/User';
import { UserPost } from 'src/app/model/UserPost';

@Component({
  selector: 'page-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class PageUserProfileComponent extends BasePageComponent implements OnInit, OnDestroy {
  userInfo: any;
  userForm: FormGroup;
  gender: IOption[];
  status: IOption[];
  currentAvatar: string | ArrayBuffer;
  defaultAvatar: string;
  changes: boolean;
  isLoginFailed = false;

  user: UserPost;


  constructor(
    store: Store<IAppState>,
    httpSv: HttpService,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    super(store, httpSv);

    this.pageData = {
      title: 'User profile',
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
          title: 'User profile'
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
    ];*/
    this.defaultAvatar = 'assets/content/anonymous-400.jpg';
    this.currentAvatar = this.defaultAvatar;
    this.changes = false;
  }

  ngOnInit() {
    super.ngOnInit();

    this.getData('assets/data/user-profile.json', 'userInfo', 'loadedDetect');


    var id = localStorage.getItem("userId")

    this.userService.getUserbyId(id).subscribe({
      next: (res: UserPost) => { 
        this.user = res;
        console.log('profile test resP*********** : ', res);
        

      }
  
      ,error: err => {
        //this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        console.log(err,'ereuuur ');
      }
    });
  

  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  loadedDetect() {
    this.setLoaded();

    this.currentAvatar = this.userInfo.mainInfo.img;
    this.inituserForm(this.userInfo.mainInfo);
  }

  // init form
  inituserForm(data: any) {
    this.userForm = this.formBuilder.group({
      img: [this.currentAvatar],
      firstName: [data.firstName, Validators.required],
      lastName: [data.lastName, Validators.required],
      number: [data.number, Validators.required],
      address: [data.address, Validators.required],
      gender: [data.gender, Validators.required],
      age: [data.age, Validators.required],
      lastVisit: [data.lastVisit, Validators.required],
      status: [data.status, Validators.required]
    });

    // detect form changes
    this.userForm.valueChanges.subscribe(() => {
      this.changes = true;
    });
  }

  // save form data
  saveData(form: FormGroup) {
    if (form.valid) {
      this.userInfo.mainInfo = form.value;
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
