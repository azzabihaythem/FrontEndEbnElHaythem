import { Component, InjectionToken, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationRequest } from 'src/app/model/AuthenticationRequest';
import { Role } from 'src/app/model/Role';
import { User } from 'src/app/model/User';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';
import { UserPost } from 'src/app/model/UserPost';
import { Clinique } from 'src/app/model/Clinique';
import jwt_decode from 'jwt-decode';
import{Mytoken} from 'src/app/model/Mytoken' ;
import { AsyncAction } from 'rxjs/internal/scheduler/AsyncAction';


@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;

  

/*
  form: any = {
    username: null,
    password: null
  };*/
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles1: string[] = [];
  roles: Role[];
  content?: string;

  constructor(private fb: FormBuilder, private tokenStorage: TokenStorageService, private userService: UserService, private router: Router) { }

  ngOnInit() {
    //var id = localStorage.getItem("userId")
   // console.log(id);
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().role;
    }
  

    this.loginForm = this.fb.group({
      login: ['', Validators.required],
      pass: ['', Validators.required]
    });
  }
   onSubmit() : void {
    //const { username, password } = this.form;
    const data = this.loginForm.value;
    console.log(data) ;


    // new  incorrect :(
      let clin = new Clinique(1);
      let user = new UserPost(false,new Date,'','',data.login, data.pass,clin);


    const userId = localStorage.getItem('userId');
    let roleId =  localStorage.getItem('roleId');
    //
    
   
    this.userService.login(user).subscribe({
      next: (res: Response) => { 
        //let Authorization = res.Authorization;
        console.log(res.headers.get('Authorization'));
        localStorage.setItem('Authorization', res.headers.get('Authorization'));
        this.tokenStorage.saveToken(res.headers.get('Authorization'));
       const jwtdecod =  jwt_decode(this.tokenStorage.getToken());
       const decodedToken = jwt_decode<Mytoken>(this.tokenStorage.getToken());
       console.log('tokennnnnnnn*$**********',decodedToken.userId); // works!

       //jwtdecod.userId;
       //console.log(jwtdecod.userId)
       console.log('token decoded *******', jwtdecod) ;
        this.tokenStorage.saveUser(user);
        console.log('******** ts side', res) ;
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        localStorage.setItem('userId', decodedToken.userId.toString());
         localStorage.setItem('roleId', decodedToken.role);
        roleId = decodedToken.role;
       //if( this.roles.includes('superadmin')) {};

       // role super admin
       if ( roleId == '2' ){
        this.router.navigate(['vertical/user-profile']) ;
        //this.reloadPage();
        location.reload;
       }
      // role admin
       if (roleId == '1'){
        this.router.navigate(['vertical/user-profile']) ;
        //this.reloadPage() ;

       }
       // role employer
       if (roleId == '3') {

        this.reloadPage() ;

       }
       // role patient
       if (roleId == '4') {
        this.router.navigate(['vertical/patient-profile']) ;
        //location.reload;
       } 
      
      },
      error: err => {
        //this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        console.log(err,'ereuuur ');
      }
    });
  }

  reloadPage(): void {
    //window.location.reload();
    this.router.navigate(['vertical/default-dashboard'])
  }
} 



/*
  async Onlogin() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }
    if (this.submitted)
    {
      const data = this.loginForm.value;
      console.log(data,'values from forum /////')
  
      await this.userService.login(data.username , data.password).subscribe({
       next : async (res) => {
       // async res => {
        console.log(data);
          //console.log(res);
          // tslint:disable-next-line:prefer-const
          let Authorization = res.Authorization;
          const IdUser = res.id;
          const role = res.role;
          alert('loged with success');
          //Swal('loged with succes ', 'vous etes conncté', 'success');
          localStorage.setItem('Authorization', Authorization);
          localStorage.setItem('userId', IdUser);
          localStorage.setItem('roleId', role);
  
  
          // tslint:disable-next-line:whitespace
          if( role === 'superadmin'){
            if (localStorage.getItem('userId')!=undefined&&localStorage.getItem('userId')!="")
             await this.router.navigate(['vertical/default-dashboard']);
            else
             await this.router.navigate(['public/sign-in']) ; 
  
  
          }
          if ( role === 'admin'){
            await this.router.navigate(['vertical/default-dashboard']);
  
          }
          if ( role === 'patient') {
            await this.router.navigate(['vertical/user-profile']);
  
          }
          if ( role === 'emlpoyer') {
            await this.router.navigate(['vertical/appointments']);
  
          }
  
          this.isLoggedIn =true;
        },
        error: err => {
         // this.content = JSON.parse(err.error).message;
         console.log(err,'ereuuur ');
        } 
        /*  err => {
          //Swal('Oops...', 'Something went wrong!', 'error');
  
         // console.log(err);
        //} 
        
      });
    }
  }

  
  


/*
 // this.loginForm = this.formBuilder.group(formControls);
  onSubmit(): void {
    const { login, password } = this.form;

  //  let user = new AuthenticationRequest (RegisterForm.value['login'],RegisterForm.value['pass']);
    this.userService.login(login, password).subscribe({
      next: data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.reloadPage();
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }
//vertical/default-dashboard
reloadPage(): void {
  window.location.reload();
} */


