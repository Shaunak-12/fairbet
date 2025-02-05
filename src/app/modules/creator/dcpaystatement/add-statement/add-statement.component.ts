import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {FormControl} from '@angular/forms';
import { config } from '@services/config';
import { ApiService } from '@services/api.service';
import { CommonFunctionService } from '@services/common-function.service';
import { ModulesModule } from '@modules/modules/modules.module';

@Component({
  selector: 'app-add-statement',
  imports: [
    ModulesModule
  ],
  templateUrl: './add-statement.component.html',
  styleUrl: './add-statement.component.scss'
})
export class AddStatementComponent implements OnInit, OnDestroy {
  @Input() submitBtn!:boolean;
  @Output() onSave = new EventEmitter<any>();
  @Output() onCancel = new EventEmitter<any>();
  
  submitDisabled=false;
  
  resetBtn = true;
  statementForm!: FormGroup;
  adminPass = '';
  // ReelsList = [];
  ReelsList: { Id: string; PageName: string; PromoURL: string }[] = [];

  PageSelected = new FormControl('',[Validators.required]);
  PageList: any =[];
  // FilteredReels = [];
  FilteredReels: { Id: string; PageName: string; PromoURL: string }[] = [];

  constructor(private formBuilder: FormBuilder, private apiservice: ApiService, private utilities : CommonFunctionService) { }
  
  ngOnInit(){
    this.getAllData();
    this.initializeForm();
    this.PageSelected.valueChanges.subscribe(value => {
      this.FilteredReels = this.ReelsList.filter(page => page.PageName == value);
      this.statementForm.get('DCPromotionId')?.setValue('');
    });
  }
  
  getAllData()
  {
    let param = config['getDCPromotionList']+'?SiteCode='+sessionStorage.getItem('selectedSite');
    this.apiservice.getRequest(param,'getDCPromotionList').subscribe((data: any) => {
      this.ReelsList = [];
      this.PageList = [];
      data.forEach((element: { Name: string; Id: any; }) => {
        let reelData = element.Name.split(" - ")
        this.ReelsList.push({
          Id:element.Id,
          PageName:reelData[0],
          PromoURL:reelData[1]
        })
      });
      this.PageList = Array.from(new Set(this.ReelsList.map(page => page.PageName)));
    }, (error) => {
      console.log(error);
    });
  }
  
  initializeForm(){
    this.statementForm = this.formBuilder.group({
      DCPromotionId: ["", [Validators.required]],
      Amount: ["", [Validators.required]],
      ReferenceId: ["", [Validators.required]],
      Description: ["", [Validators.required]],
      Type: ["Admin", [Validators.required]]
    });
  }
  
  onBack(){
    this.onCancel.emit();
  }
  
  onSubmit(){
    if(this.statementForm.invalid){
      this.utilities.toastMsg('warning','Please enter Required Data!','');
    }
    else{
      this.submitDisabled=true;
      let FormValue = this.statementForm.getRawValue();
      if(!FormValue.id){
        delete FormValue.id;
        this.apiservice.sendRequest(config['saveDCPaymentStatement'],FormValue).subscribe((data: any) => {
          // console.log(data);
          this.submitDisabled=false;
          if (data.ErrorCode === "1") {
            this.utilities.toastMsg('success',"Success", data.ErrorMessage);
            this.statementForm.disable();
            this.onSave.emit();
            this.onCancel.emit();
          }
          else {
            this.utilities.toastMsg('warning',"Failed",data.Result + " : " + data.ErrorMessage);
          }
        }, (error) => {
          console.log(error);
        });
      }
    }
  }
  
  ngOnDestroy(){
    
  }
}