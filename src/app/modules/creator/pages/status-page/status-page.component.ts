import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { config } from '@services/config';
import { ApiService } from '@services/api.service';
import { CommonFunctionService } from '@services/common-function.service';
import { ModulesModule } from '@modules/modules/modules.module';



@Component({
  selector: 'app-status-page',
  imports: [
	ModulesModule],
  templateUrl: './status-page.component.html',
  styleUrl: './status-page.component.scss'
})
export class StatusPageComponent implements OnInit {
	@Input() isCredit=false;
	@Input() pageData:any;
	@Output() onSave = new EventEmitter<any>();
	@Output() onCancel = new EventEmitter<any>();
	
	submitDisabled=false;
	pagestatusForm!: FormGroup;
	
	constructor(private formBuilder: FormBuilder, private apiservice: ApiService, private utilities : CommonFunctionService) { }
	
	ngOnInit(){
		// console.log(this.pageData);
		this.initializeForm();
	}
	
	initializeForm(){
		this.pagestatusForm = this.formBuilder.group({
			Description: [""],
			DCPageId: [this.pageData.DCPageId]
		});
	}
	
	onBack(){
		this.onCancel.emit();
	}
	
	onSubmit(){
		if(this.pageData.StatusId==1 && this.pagestatusForm.get('Description')?.getRawValue()==''){
			this.utilities.toastMsg('warning',"Please enter Remark",'');
			return;
		}
		this.submitDisabled=true;
		this.apiservice.sendRequest(config['changeCreatorPageStatus'],this.pagestatusForm.getRawValue()).subscribe((data: any) => {
			if (data.ErrorCode === "1") {
				this.utilities.toastMsg('success',"Success", data.ErrorMessage);
				this.onSave.emit({value:this.pageData.StatusId==1?0:1});
				this.onCancel.emit();
			}
			else {
				this.submitDisabled=false;
				this.utilities.toastMsg('warning',"Failed",data.Result + " : " + data.ErrorMessage);
				this.onSave.emit({value:this.pageData.StatusId});
			}
		}, (error) => {
			console.log(error);
		});
	}
}