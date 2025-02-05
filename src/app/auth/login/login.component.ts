import { Component, OnInit, OnDestroy, Renderer2, HostBinding, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { config } from '@services/config';
import { AppService } from '@services/app.service';
import { ApiService } from '@services/api.service';
import { CommonFunctionService } from '@services/common-function.service';
import { Subscription } from 'rxjs';
import { UntypedFormGroup, UntypedFormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthModule } from '@auth/auth.module';


@Component({
  selector: 'app-login',
  imports: [
    RouterModule,
    AuthModule

  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit, OnDestroy {
  @HostBinding('class') class = 'login-box';
  loginForm!: UntypedFormGroup;
  isGoogleLoading = false;
  isFacebookLoading = false;
  isAuthLoading = false;
  private loaderSubscriber!: Subscription;
  private apiSubscriber: Subscription[]=[];
  // str.substring(str.indexOf(":") + 1);
  siteUrl = (window.location.hostname).substring((window.location.hostname).indexOf(".") + 1);
  showOTPForm = false;
  qrCodeVisible = false;
  qrImgPath='';
  qrMsg='';
  
  passwordType = 'password';
  eyeType = 'eye';
  
  constructor(private renderer: Renderer2, private apiservice: ApiService, private appService: AppService, private utilities : CommonFunctionService)
  {if(localStorage.getItem('personalDetails')){localStorage.removeItem('personalDetails')}}
  
  ngOnInit() {
    this.utilities.clearLocalVars();
    this.loaderSubscriber = this.apiservice.loaderService.loading$.subscribe((loading:any={}) => {
      this.isAuthLoading=!!(('emailAuthApi' in loading || 'loginApi' in loading || 'getAdminMenuMappingsData' in loading || 'getUserSite' in loading));
    });
    this.renderer.addClass(document.querySelector('app-root'),'login-page');
    this.loginForm = new UntypedFormGroup({
      email: new UntypedFormControl(null, Validators.required),
      password: new UntypedFormControl(null, Validators.required),
      otpnumber: new UntypedFormControl(null, Validators.required),
      secretkey: new UntypedFormControl(null, Validators.required)
    });
  }
  
  async loginbyOTP() {
    this.qrCodeVisible = false;
    this.qrImgPath = '';
    this.qrMsg = '';
    if(this.showOTPForm){
      await this.appService.loginByOTP(config['loginApi'],this.loginForm.value,'loginApi');
    }
    else{
      let param = "?Email=" + this.loginForm.get('email')?.getRawValue();
      this.apiSubscriber[0] = this.apiservice.getRequest(config['emailAuthApi'] + param,'emailAuthApi').subscribe((response: any) => {
        if (response) {
          if (response.ErrorCode == "1"||response.ErrorCode == "5") {
            if(response.ErrorCode == "1") {
              this.qrCodeVisible = true;
              this.qrImgPath = response.qrCodeImageUrl;
              this.qrMsg = response.ErrorMessage;
            }
            this.loginForm.get('secretkey')?.setValue(response.Result);
            this.showOTPForm=true;
            this.utilities.toastMsg("success", "Success", response.ErrorMessage);
          } else {
            this.utilities.toastMsg("error", "Failed", response.ErrorMessage);
          }
        }
      }, (error) => {
        this.utilities.toastMsg("warning", "Please try again", "");
      });
    }
  }
  
  togglePassVisible(){
    if(this.passwordType == 'password')
    {
      this.passwordType = 'text';
      this.eyeType = 'eye-off';
    }
    else
    {
      this.passwordType = 'password';
      this.eyeType = 'eye';
    }
  }
  
  ngOnDestroy() {
    this.renderer.removeClass(document.querySelector('app-root'),'login-page');
    if (this.loaderSubscriber) {
      this.loaderSubscriber.unsubscribe();
    }
    if(this.apiSubscriber[0]) {
      this.apiSubscriber[0].unsubscribe();
    }
  }
}