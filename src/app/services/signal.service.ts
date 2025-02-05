import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import * as signalR from '@microsoft/signalr';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalService {
  private hubConnection!: signalR.HubConnection;
  private reconnectionAttempt: number = 0;
  private readonly maxReconnectionAttempts = 5; // Maximum number of reconnection attempts

  private messageReceivedSource = new Subject<{ message: string, NotificationType: string }>();
  messageReceived$ = this.messageReceivedSource.asObservable();

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.checkSignalRConnection();
      }
    });
  }

  checkSignalRConnection() {
    if (this.hubConnection) {
      console.log('SignalR active.');
      // console.log(this.router.url);
      if (this.router.url == '/login') {
        this.hubConnection.stop();
        // console.log('SignalR stopped.');
      }
    } else {
      // console.log('SignalR inactive.');
      this.createConnection();
    }
  }

  private registerEventHandlers() {
    this.hubConnection.on('receiveupdate', (message: string, NotificationType: string) => {
      this.messageReceivedSource.next({ message, NotificationType });
    });
  }

  private createConnection() {
    if (localStorage.getItem('personalDetails')) {
      let userData = JSON.parse(localStorage.getItem('personalDetails') || '{}');
      let logToken = userData.LoginToken;
      this.hubConnection = new signalR.HubConnectionBuilder().configureLogging(signalR.LogLevel.Debug)
        .withUrl(`https://notify.playludo.app/updateHub?tokenId=${logToken}`)
        .build();
      this.registerEventHandlers(); // Register event handlers
      this.startConnection();
    }
  }

  private startConnection() {
    if (this.hubConnection.state === signalR.HubConnectionState.Disconnected) {
      this.hubConnection.start().then(() => {
        console.log('Connection started');
      }).catch(err => {
        console.error('Error while starting connection: ' + err);
        this.attemptReconnect();
      });

      this.hubConnection.onclose(error => {
        if (error) {
          console.error('Disconnected due to an error: ', error);
        } else {
          console.log('Disconnected');
        }
        if (this.router.url != '/login') {
          this.attemptReconnect();
        }
      });
    }
  }

  private attemptReconnect() {
    if (this.reconnectionAttempt < this.maxReconnectionAttempts) {
      const delay = this.calculateReconnectDelay(this.reconnectionAttempt);
      setTimeout(() => {
        console.log(`Attempting to reconnect (${this.reconnectionAttempt + 1}/${this.maxReconnectionAttempts})...`);
        this.reconnectionAttempt++;
        this.startConnection();
      }, delay);
    } else {
      console.error('Maximum reconnection attempts reached. Giving up.');
      // Optionally, you can notify the user that the connection cannot be established
    }
  }

  private calculateReconnectDelay(attempt: number): number {
    // Exponential backoff formula: f(x) = 2^x * 1000
    return Math.pow(2, attempt) * 1000;
  }


}