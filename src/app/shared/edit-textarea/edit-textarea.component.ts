import { Component, OnInit,Input, Output, EventEmitter  } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';

@Component({
  selector: 'app-edit-textarea',
  imports: [
    SharedModule
  ],
  templateUrl: './edit-textarea.component.html',
  styleUrl: './edit-textarea.component.scss'
})
export class EditTextareaComponent implements OnInit {

  @Input() inpVal:any;
  @Input() outSave:any;
  @Input() saveLoader:any;
  @Output() onOptionSave = new EventEmitter<any>();
  @Output() outSaveFn = new EventEmitter<any>();

  userVal = new FormControl();
  opVisible = false;
  valSelect = '';

  constructor() { }

  ngOnInit(): void {
    this.valSelect = this.inpVal;
    // console.log(this.valSelect);
    this.setControl();
    if(this.outSave){
      this.userVal.valueChanges.subscribe((val) => {
        this.outSaveFn.emit(val);
      })
    }
  }

  setControl(){
      this.userVal.setValue(this.valSelect);
  }

  switchSelect(): void {
    this.opVisible = !this.opVisible;
    if(!this.opVisible){
      this.setControl();
    }
  }

  saveSelect(){
    let formVal = this.userVal.getRawValue();
    if((typeof this.userVal=='string')&&!(typeof formVal=='string'))
    {
      formVal = formVal+'';
    }
    else if ((typeof this.userVal=='number')&&!(typeof formVal=='number'))
    {
      formVal = Number(formVal);
    }
    this.onOptionSave.emit(formVal);
  }

}
