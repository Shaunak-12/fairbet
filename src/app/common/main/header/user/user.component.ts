import {Component, OnInit} from '@angular/core';
import {AppService} from '@services/app.service';
import {DateTime} from 'luxon';

@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {
  public user: any;

  constructor(private appService: AppService) {}

  ngOnInit(): void {
      this.user = {email:'admin@gmail.com'};
  }

  logout() {
      this.appService.logout();
  }

  formatDate(date: any) {
      return DateTime.fromISO(date).toFormat('dd LLL yyyy');
  }
}

