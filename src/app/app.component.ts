import { CommonModule } from '@angular/common';
import { Component,CUSTOM_ELEMENTS_SCHEMA,OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

import { SignalService } from '@services/signal.service';
import { ToastrService } from 'ngx-toastr';
// import * as alertify from 'alertifyjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CommonModule,MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class AppComponent implements OnInit {
  title = 'fairbet_v19';
constructor(private signalR:SignalService,private toast:ToastrService){}
    audio=new Audio();
    ngOnInit(): void {
      if(localStorage.getItem('userSites')){
        let userSites = JSON.parse(localStorage.getItem('userSites')||'{}');
        if(!sessionStorage.getItem('selectedSite')){
          sessionStorage.setItem('selectedSite',userSites[0].Code);
          sessionStorage.setItem('chosenSite',userSites[0].Name);
          sessionStorage.setItem('WalChosen',userSites[0].Wallets[0].Id);
          sessionStorage.setItem('WalList',JSON.stringify(userSites[0].Wallets));
          sessionStorage.setItem('WalName',userSites[0].Wallets[0].Name+' - '+userSites.Wallets[0].Code);
        }
      }
      this.recivedMsg();
    }
    dismissThisNotification(button: any) {
      let notification = button.parentElement;
      // alertify.dismiss(notification);
  }
  
    recivedMsg(){
      this.signalR.messageReceived$.subscribe((data)=>{
        // alertify.set('notifier','delay', 10);
        // alertify.success('<span class="alertTitle"> <button (click)="dismissThisNotification(this)" style="float:right; background:none;border:none; color:white;">x</button>'+data.NotificationType+'</span>'+'<div style="line-height:1.4 !important"><span class="alertText">'+data.message+'</span></div>',
        // 'success', 5, function(){  console.log('dismissed'); });
        this.audio.src = '/assets/music/notimu.mp3';
        this.audio.load();
        this.audio.play();
      });
    }
  }