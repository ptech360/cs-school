import {Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../providers/auth.service';
import { Router } from '@angular/router';
@Component({
  selector:'login',
  templateUrl:'./login.component.html',
  styleUrls:['./login.component.css']
})
export class LoginComponent{
  loginForm: FormGroup;
  error:boolean = false;
  constructor(public formBuilder: FormBuilder,
              public appService: AuthService,
              public router: Router){
              if(appService.isLoggedIn()){                
                router.navigate(['/dashboard']);
              }
  }
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required]]
    });
  }
  onSubmit(){
    this.appService.verifyUser(this.loginForm.value).subscribe((res) => {
      this.verifySuccessfully(res);
    }, (err) => {
      this.verifyFailed(err);
    });
  }

  public verifySuccessfully(res) {
    localStorage.setItem("access_token", res.access_token);
    this.getUserInfo();
  }

  public verifyFailed(err) {
    this.error = true;
  }

  public getUserInfo() {
    this.appService.getUserInfo().subscribe((res) => {
      this.loggedInSuccesfully(res);
    }, (err) => {

    });
  }

  public loggedInSuccesfully(res) {    
    this.appService.storeData(res);
    this.router.navigate(['/dashboard']);
  }    
}