import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from './api.service';
import { config } from './config';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  public user: any = null;
  private authLoader = new BehaviorSubject<boolean>(false);
  
  constructor(private router: Router, private toastr: ToastrService, private apiservice :ApiService) {}
  
  async loginByOTP(apiEndpoint:string, {email, password, otpnumber, secretkey}: {email: string, password: string, otpnumber: string, secretkey: string}, loaderKey:string) {
    try {
      let param = {
        "Email":email,
        "Password":password,
        "OTPNumber":otpnumber,
        "SecretKey":secretkey
      }
      this.authLoader.next(true);
      this.apiservice.sendRequest(apiEndpoint,param,loaderKey).subscribe((response: any) => {
        if(response.ErrorCode==1){
          let personalDetails = {FName: response.FName, LName: response.LName, LoginToken: response.LoginToken, UserId: response.UserId, RoleCode:response.RoleCode};
          localStorage.setItem('personalDetails', JSON.stringify(personalDetails));
          let params = config['getAdminMenuMappingsData'];
          this.apiservice.getRequest(params,'getAdminMenuMappingsData').subscribe((data: any) => {
            let defaultPath='';
            if (data.length > 0) {
              this.convertLinksToLowerCase(data);
              localStorage.setItem('adminMenu', JSON.stringify(data));
              if(data[0].Link!='#')
              {
                defaultPath = (data[0].Link).toLowerCase();
              }
              else
              {
                defaultPath = (data[0].ChildMenu[0].Link).toLowerCase();
              }
              this.getAllData(defaultPath);
            }
            else
            {
              this.toastr.error('','Please Try Later',{positionClass: 'toast-top-center'});
            }
          }, (error) => {
            console.log(error);
          });
        }
        else{
          this.toastr.error('',response.ErrorMessage,{positionClass: 'toast-top-center'});
          localStorage.removeItem('personalDetails');
          localStorage.removeItem('adminMenu');
          localStorage.removeItem('userSites');
        }
      })
    } catch (error: any) {
      this.authLoader.next(false);
      console.log(error);
      this.toastr.error(error.message);
    }
  }
      // original code commented by shaunak
  // convertLinksToLowerCase(obj:any[]) {
  //   for (const [key, value] of Object.entries(obj)) {
  //     if (typeof value === 'object' && value !== null) {
  //       this.convertLinksToLowerCase(value);
  //     } else if (key === 'Link') {
  //       obj[key] = value.toLowerCase();
  //     }
  //   }
  // }
  
  // added by shaunak
  convertLinksToLowerCase(obj: { [key: string]: any }[]) {
    for (const item of obj) {
      for (const [key, value] of Object.entries(item)) {
        if (typeof value === 'object' && value !== null) {
          this.convertLinksToLowerCase([value]);
        } else if (key === 'Link') {
          item[key] = value.toLowerCase();
        }
      }
    }
  }

  getAllData(defaultPath:string){
    this.apiservice.getRequest(config['getUserSite'],'getUserSite').subscribe((data: any={}) => {
      if(!data[0].Name){
        this.toastr.error('','Please Try Later',{positionClass: 'toast-top-center'});
        return;
      }
      for(let i = 0;i<data.length;i++){
        data[i].Name=(data[i].Name).toUpperCase();
      }
      localStorage.setItem('userSites',JSON.stringify(data));
      let userSites = JSON.parse(localStorage.getItem('userSites')||'{}');
      userSites = JSON.parse(localStorage.getItem('userSites')||'{}');
      if(userSites.length==1 || !sessionStorage.getItem('selectedSite')){
        sessionStorage.setItem('selectedSite',userSites[0].Code);
        sessionStorage.setItem('chosenSite',userSites[0].Name);
        sessionStorage.setItem('WalChosen',userSites[0].Wallets[0].Id);
        sessionStorage.setItem('WalList',JSON.stringify(userSites[0].Wallets));
        sessionStorage.setItem('WalName',userSites[0].Wallets[0].Name+' - '+userSites[0].Wallets[0].Code);
        this.authLoader.next(false);
        this.router.navigate([defaultPath]);
      }
    }, (error) => {
      sessionStorage.clear();
      console.log(error);
    });
  }
  
  logout() {
    localStorage.removeItem('personalDetails');
    localStorage.removeItem('adminMenu');
    localStorage.removeItem('userSites');
    sessionStorage.clear();
    this.user = null;
  }
}
