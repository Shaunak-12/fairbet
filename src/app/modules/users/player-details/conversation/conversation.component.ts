import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModulesModule } from '@modules/modules/modules.module';
import { ApiService } from '@services/api.service';
import { CommonFunctionService } from '@services/common-function.service';
import { config } from '@services/config';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-conversation',
  imports: [
    ModulesModule
  ],
  templateUrl: './conversation.component.html',
  styleUrl: './conversation.component.scss'
})
export class ConversationComponent implements OnInit {
  @Input() uWalId: any;
  @Input() userId: any;
  @Output() onCancel = new EventEmitter<any>();
  category :any= []
  subCategory :any= []
  addForm!: FormGroup;
  adminPass:any =''
  submitDisabled:boolean = false;
  private loaderSubscriber!: Subscription;
  private apiSubscriber: Subscription[]=[];
  constructor(private formBuilder: FormBuilder,private apiSer:ApiService,private utilities:CommonFunctionService) { }

  ngOnInit(): void {
    this.getAllCategory();
    this.intialForm() ;
    this.addForm.controls['CategoryId'].valueChanges.subscribe((value) => {
      this.GetAllSubcategory(value);
    });
    this.loaderSubscriber = this.apiSer.loaderService.loading$.subscribe((loading:any={}) => {
      this.submitDisabled=('saveConversation' in loading)?true:false;
    });
  }
  intialForm() {
    this.addForm = this.formBuilder.group({
      RequestType: ["", [Validators.required]],
      CategoryId: ["", [Validators.required]],
      SubCategoryName: ["", [Validators.required]],
      RequestStatus: ["", [Validators.required]],
      ChatDescription: ["", [Validators.required]]
      // SiteCode: [sessionStorage.getItem('selectedSite')],
    });
  }
  onSubmit(){
    let param = this.addForm.getRawValue();
    param.PlayerId = this.userId;
    param.WalletTypeId = this.uWalId;
    if(!this.addForm.controls['RequestType'].value){
      this.utilities.toastMsg('warning',"",'Please Select Request Type');
      return
    }
    if(!this.addForm.controls['CategoryId'].value){
      this.utilities.toastMsg('warning',"",'Please Select Category');
      return
    }
    // if(!this.addForm.controls['SubCategoryName'].value){
    //   this.utilities.toastMsg('warning',"",'Please Select SubCategory');
    //   return
    // }
    if(!this.addForm.controls['RequestStatus'].value){
      this.utilities.toastMsg('warning',"",'Please Select Request Status');
      return
    }
    if(!this.addForm.controls['ChatDescription'].value){
      this.utilities.toastMsg('warning',"",'Please enter Chat Description');
      return
    }
    this.apiSer.sendRequest(config['saveConversation'],param,'saveConversation').subscribe({
      next:(value:any)=>{
        if(value.ErrorCode == '1'){
          this.utilities.toastMsg('success',"Success",value.ErrorMessage);
          this.addForm.reset();
          this.onCancel.emit();
        }else{
          this.utilities.toastMsg('error',"Failed",value.ErrorMessage);
        }
        console.log(value);
      }
    })
  }
  getAllCategory(){
    this.category = [];
    this.apiSer.getRequest(config['getCategoryList'],'getCategoryList').subscribe({
      next:(data)=>{
        this.category = data;
      },
      error:(error)=>{
        console.error(error);
      }
    });
  }
  GetAllSubcategory(val:any){
    this.subCategory = [];
    // let param = '?CategoryId='+val
    let param = '?CategoryId=' + Number(val);
    console.log("Converted CategoryId:", Number(val));

    console.log("param:- ",param);
    this.apiSer.getRequest(config['getSubCategoryList']+param,'getSubCategoryList').subscribe({
      next:(data: any)=>{
        if(data){
          this.addForm.controls['SubCategoryName'].setValue(data[0].SubCategoryName);
          this.subCategory = data;
        }
      },
      error:(error)=>{
        console.error(error);
      }
    });  
  }
  onBack(){

  }
}
