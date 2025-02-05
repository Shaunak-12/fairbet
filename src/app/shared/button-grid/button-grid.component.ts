import { CommonModule } from '@angular/common';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button-grid',
  imports: [
    CommonModule
  ],
  templateUrl: './button-grid.component.html',
  styleUrl: './button-grid.component.scss'
})
export class ButtonGridComponent implements OnInit {

  @Input() btnData:any=[];
  @Input() titleText:any='';
  @Input() classes:any='';
  @Output() btnGridAction = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {

  }

  buttonPressed(val:any){
    this.btnGridAction.emit(val);
  }

}
