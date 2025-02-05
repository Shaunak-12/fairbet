import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";

import { config } from '@services/config';
import { ApiService } from '@services/api.service';
import { CommonFunctionService } from '@services/common-function.service';
import { ModulesModule } from '@modules/modules/modules.module';

@Component({
  selector: 'app-calling-pop',
  imports: [
    ModulesModule,
  ],
  templateUrl: './calling-pop.component.html',
  styleUrl: './calling-pop.component.scss'
})
export class CallingPopComponent implements OnInit {
  @Input() userData:any;
  @Input() userWal:any;
  @Output() onSave = new EventEmitter<any>();
    
  submitDisabled=false;
  adminForm!: FormGroup;
  adminData:any = [];
  constructor() { }

  ngOnInit(): void {
  }

}
