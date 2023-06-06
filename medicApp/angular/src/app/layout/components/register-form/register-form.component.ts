import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { use } from 'echarts';
import { User } from 'src/app/model/User';
import { UserPost } from 'src/app/model/UserPost';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Clinique } from 'src/app/model/Clinique';

@Component({
  selector: 'register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  registerForm: FormGroup;
  //userP: UserPost = {};
  cli = new Clinique ; 
  userP : UserPost;
   public clinique : Clinique [] ; 
   public userp : UserPost [] ; 
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  content?: string;
  
  
  constructor(private fb: FormBuilder, private userservice : UserService , private router: Router){}
  

  ngOnInit() {
    var id = localStorage.getItem("roleId");
    console.log(id);
    this.registerForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      birthdate: ['', [Validators.required]],
      login: ['', [Validators.required]],
      pass: ['', Validators.required],
      
    });
  }  

  /*
  get firstname() {
    (document.getElementById('firstname') as HTMLInputElement).value = this.userP.firstname;
    return this.registerForm.get('firstname');
  }
/*
  registerForm = new FormGroup({
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    login: ['', [Validators.required]],
    pass: ['', Validators.required],
  }); */


  registerSubmited(RegisterForm : FormGroup){
    //const data = this.registerForm.value;
    let clin = new Clinique(1);
    let user = new UserPost(false,RegisterForm.value['birthdate'].toString(),RegisterForm.value['firstname'], RegisterForm.value['lastname'], 
       RegisterForm.value['login'], RegisterForm.value['pass'],clin);
      //localStorage.setItem('roleId', 4)
      console.log("show data from formulair++++++",user) ;

        
        this.userservice.signup(user).subscribe({
next : (data : UserPost) => {
  console.log(data);
  this.isSuccessful = true;
  this.isSignUpFailed = false;
  this.router.navigate(['public/sign-in']);
},
error: err => {
  this.content = JSON.parse(err.error).message;
} 
          //next: (data : UserPost) => console.log(data),
          //error: (e) => console.error(e),
          //complete: () => console.info('complete') 
      });
    
  }

}


