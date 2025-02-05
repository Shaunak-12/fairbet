import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";

import { config } from '@services/config';
import { ApiService } from '@services/api.service';
import { CommonFunctionService } from '@services/common-function.service';
import { ModulesModule } from '@modules/modules/modules.module';

@Component({
  selector: 'app-send-confirm',
  imports: [
    ModulesModule,
  ],
  templateUrl: './send-confirm.component.html',
  styleUrl: './send-confirm.component.scss'
})
export class SendConfirmComponent implements OnInit {


  @Input() submitBtn!:boolean;
	@Input() userData:any;
	@Output() onCancel = new EventEmitter<any>();
	
	submitDisabled=false;
	
	constructor(private formBuilder: FormBuilder, private apiservice: ApiService, private utilities : CommonFunctionService) { }
	
	ngOnInit(){
  }
	
	onBack(){
		this.onCancel.emit();
	}
	
	onSubmit(){
		this.submitDisabled=true;
      let option = {SupportAdminId:this.userData['SupportAdminId'], PlayerId:this.userData['UserId']};
    this.apiservice.sendRequest(config['sendSMS'], option, 'sendSMS').subscribe({
      next: (data:any) => {
        if(data.ErrorCode == '1'){
          this.utilities.toastMsg("success", data.ErrorMessage, data.Result); 
          this.onCancel.emit();
        }else{
          this.utilities.toastMsg("warning", data.ErrorMessage, data.Result);
        }
      },
      error(err) {
        console.error('Error:', err);
      },
    });
		// this.apiservice.sendRequest(config['callResetStatus'],{"Id":this.userData.Id}).subscribe((data: any) => {
		// 	this.submitDisabled=false;
		// 	if (data.ErrorCode === "1") {
		// 		this.utilities.toastMsg('success',"Success", data.ErrorMessage);
		// 		setTimeout(()=>{
		// 			this.onCancel.emit();
		// 		}, 1000);
		// 	}
		// 	else {
		// 		this.utilities.toastMsg('warning',"Failed",data.Result + " : " + data.ErrorMessage);
		// 	}
		// }, (error) => {
		// 	console.log(error);
		// });
	}


}
