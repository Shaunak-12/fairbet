import { Injectable } from '@angular/core';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
  })

export class CommonFunctionService {
  public TableDataNone = [[{value:'No Data Found',bg:'white-drop'}]];
  constructor(private toastr: ToastrService) {}

  getDatesInRange(startDate: any, endDate: any, type?: string) {
    let date = new Date(startDate.getTime());
    let dates = [];
    while (date <= endDate) {
      dates.push(moment(date))
      date.setDate(date.getDate() + 1);
    }
    return dates;
  }

  clearLocalVars(){
    localStorage.removeItem('personalDetails');
    localStorage.removeItem('adminMenu');
    localStorage.removeItem('userSites');
    sessionStorage.clear();
  }

  toastMsg(type: string, title: string, msg: string) {
    if (type == 'success') {
      this.toastr.success(msg, title, {positionClass: 'toast-top-center'});
    }
    if (type == 'error') {
      this.toastr.error(msg, title, {positionClass: 'toast-top-center'});
    }
    if (type == 'warning') {
      this.toastr.warning(msg, title, {positionClass: 'toast-top-center'});
    }
  }

  getValueByKey(inputArray: any[], searchKey: any, searchValue: any, returnKey: any): any {
    const item = inputArray.find(obj => obj[searchKey] == searchValue);
    return item ? item[returnKey] : null;
  }

  setForGet(obj:any){
    return ('?' + Object.entries(obj).map(([key, value]) => `${key}='${value}'`).join('&'));
  }
  setForGetNew(obj:any){
    return ('?' + Object.entries(obj).map(([key, value]) => `${key}=${value}`).join('&'));
  }

  roundOffNum(numData:any){
    let signage = '';
    if(numData && numData<0){
      signage='-';
      numData=Math.abs(numData);
    }
    if(numData && ((numData%1)!=0)){
      let x=numData.toFixed(2);
      x=x.toString();
      let afterPoint = '';
      if(x.indexOf('.') > 0){
        afterPoint = x.substring(x.indexOf('.'),x.length);
      }
      x = Math.floor(x);
      x=x.toString();
      let lastThree = x.substring(x.length-3);
      let otherNumbers = x.substring(0,x.length-3);
      if(otherNumbers != ''){
        lastThree = ',' + lastThree;
      }
      let res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree + afterPoint;
      return(signage+res);
    }
    else if(numData){
      let x=numData;
      x=x.toString();
      let lastThree = x.substring(x.length-3);
      let otherNumbers = x.substring(0,x.length-3);
      if(otherNumbers != ''){
        lastThree = ',' + lastThree;
      }
      let res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
      return(signage+res);
    }
    else{
      return('0.00');
    }
  }

  // abbreviateNumber(number: number): string {
  //   if (number >= 1000000) {
  //     return Math.floor((number / 1000000)) + ' M';
  //   } else if (number >= 1000) {
  //     return Math.floor((number / 1000)) + ' K';
  //   } else {
  //     return number.toString();
  //   }
  // }

  abbreviateNumber(number: number): string {
    if (number >= 1000000000) {
      return this.formatNumber(number / 1000000000) + " B";
    } else if (number >= 1000000) {
      return this.formatNumber(number / 1000000) + " M";
    } else if (number >= 1000) {
      return this.formatNumber(number / 1000) + " K";
    } else {
      return number.toString();
    }
  }
  
  formatNumber(value: number): string {
    const roundedValue = Math.floor(value * 100) / 100;
    return roundedValue.toFixed(2).replace(/\.00$/, '');
  }
  
  
  seperatorNum(numData:any){
    let x=numData?numData:0;
    let signage = '';
    if(numData && numData<0){
      signage='-';
      numData=Math.abs(numData);
    }
    x=x.toString();
    let lastThree = x.substring(x.length-3);
    let otherNumbers = x.substring(0,x.length-3);
    if(otherNumbers != ''){
      lastThree = ',' + lastThree;
    }
    let res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    return(signage+res);
  }
}