import {AppState} from '@/store/state';
import {UiState} from '@/store/ui/state';
import {Component, HostBinding, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppService} from '@services/app.service';
import {ApiService} from '@services/api.service';
import {Observable} from 'rxjs';
import { RouterModule } from '@angular/router';
import { MenuItemComponent } from '@components/menu-item/menu-item.component';
import { FormControl, FormsModule, FormBuilder, FormGroup, FormArray, AbstractControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { CommonModule } from '@angular/common';
import { FeatherModule } from 'angular-feather';

const BASE_CLASSES = 'main-sidebar elevation-4';

@Component({
  selector: 'app-menu-sidebar',
  imports: [
    RouterModule, MenuItemComponent,
    MatProgressSpinnerModule, CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatIconModule,
    FormsModule,
    MatButtonModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatTabsModule,
    MatDialogModule,
    MatRadioModule,
    MatSelectModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    FeatherModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatProgressBarModule
  ],
  templateUrl: './menu-sidebar.component.html',
  styleUrl: './menu-sidebar.component.scss'
})
export class MenuSidebarComponent implements OnInit {
  @HostBinding('class') classes: string = BASE_CLASSES;
  public ui!: Observable<UiState>;
  public userCompany='';
  public menu:any = [];
  public extendableMenu:any = [];
  constructor (public appService: AppService, private store: Store<AppState>, private apiservice : ApiService) {}
  
  ngOnInit() {
    this.ui = this.store.select('ui');
    this.ui.subscribe((state: UiState) => {
      this.classes = `${BASE_CLASSES} ${state.sidebarSkin}`;
    });
    this.getAllData();
  }
    // ORG Code
  // convertLinksToLowerCase(obj:any[]) {
  //   for (const [key, value] of Object.entries(obj)) {
  //     if (typeof value === 'object' && value !== null) {
  //       this.convertLinksToLowerCase(value);
  //     } else if (key === 'Link') {
  //       obj[key] = value.toLowerCase();
  //     }
  //   }
  // }
  
  // added by shaunak
  convertLinksToLowerCase(obj: any) {
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === 'object' && value !== null) {
        this.convertLinksToLowerCase(value); // Recursively process nested objects/arrays
      } else if (key === 'Link' && typeof value === 'string') {
        (obj as Record<string, any>)[key] = value.toLowerCase();
      }
    }
  }
  getAllData(){
    let userData=JSON.parse(localStorage.getItem('personalDetails')||'{}');
    this.userCompany = (userData.FName?userData.FName.toUpperCase():'')+(userData.LName?' '+userData.LName.toUpperCase():'');
    this.menu = JSON.parse(localStorage.getItem('adminMenu')||'{}');
    // let params = config['getAdminMenuMappingsData'];
    // this.apiservice.getRequest(params).subscribe((data: any) => {
    //   this.convertLinksToLowerCase(data);
    //   if (data.length > 0) {
    //     this.menu = data;
    //   }
    // }, (error) => {
    //   console.log(error);
    // });
  }
}

// export const MENU = 
// [ 
//   {
//     "Id": "1",
//     "MenuName": "Dashboard",
//     "Link": "#",
//     "Icon": "home",
//     "HasChild": 1,
//     "ChildMenu": [
//       {
//         "Id": null,
//         "MenuName": "My Dashboard",
//         "Link": "/dashboard/index",
//         "Icon": "minus",
//         "HasChild": 0,
//         "ChildMenu": null
//       }
//     ]
//   },
//   {
//     "Id": "2",
//     "MenuName": "Players",
//     "Link": "/users/searchplayer",
//     "Icon": "users",
//     "HasChild": 0,
//     "ChildMenu": []
//   },
//   {
//     "Id": "3",
//     "MenuName": "Withdraw",
//     "Link": "#",
//     "Icon": "bar-chart",
//     "HasChild": 1,
//     "ChildMenu": [
//       {
//         "Id": null,
//         "MenuName": "WithDrawal request",
//         "Link": "/users/withdrawalrequest",
//         "Icon": "minus",
//         "HasChild": 0,
//         "ChildMenu": null
//       }
//     ]
//   }
// ];