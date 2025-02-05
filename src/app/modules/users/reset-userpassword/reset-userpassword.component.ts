import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";

import { config } from '@services/config';
import { ApiService } from '@services/api.service';
import { CommonFunctionService } from '@services/common-function.service';
import { ModulesModule } from '@modules/modules/modules.module';

@Component({
  selector: 'app-reset-userpassword',
  imports: [
    ModulesModule
  ],
  templateUrl: './reset-userpassword.component.html',
  styleUrl: './reset-userpassword.component.scss'
})
export class ResetUserpasswordComponent implements OnInit {
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
		this.apiservice.sendRequest(config['playerResetPassword'],{"UserId":this.userData.UserId}).subscribe((data: any) => {
			this.submitDisabled=false;
			if (data.ErrorCode === "1") {
				this.utilities.toastMsg('success',"Success", data.ErrorMessage);
				setTimeout(()=>{
					this.onCancel.emit();
				}, 1000);
			}
			else {
				this.utilities.toastMsg('warning',"Failed",data.Result + " : " + data.ErrorMessage);
			}
		}, (error) => {
			console.log(error);
		});
	}
}