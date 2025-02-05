import {AppState} from '@/store/state';
import {ToggleControlSidebar, ToggleSidebarMenu} from '@/store/ui/actions';
import {UiState} from '@/store/ui/state';
import { Component, HostBinding, inject, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import {Store} from '@ngrx/store';
import {AppService} from '@services/app.service';
import {Observable} from 'rxjs';
import {ApiService} from '@services/api.service';
import {Router, RouterModule} from '@angular/router';
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


const BASE_CLASSES = 'main-header navbar navbar-expand';

@Component({
  selector: 'app-header',
  imports: [
    RouterModule, MatProgressSpinnerModule, CommonModule,
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
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
	@HostBinding('class') classes: string = BASE_CLASSES;
	public ui!: Observable<UiState>;
	public userSites:any=[];
	public SelectedSite=new FormControl();
	public userWals:any=[];
	public SelectedSiteWal=new FormControl();
	urlPath = window.location.pathname;
	showSiteOpts = !this.urlPath.includes('/users/playerdetailview');
	dkMode=localStorage.getItem('dkMode');
	
	constructor(private router: Router,private appService: AppService, private store: Store<AppState>, private apiservice: ApiService) {}
	
	ngOnInit() {
		this.ui = this.store.select('ui');
		this.ui.subscribe((state: UiState) => {
			this.classes = `${BASE_CLASSES} ${state.navbarVariant}`;
		});
		this.userSites = JSON.parse(localStorage.getItem('userSites')||'{}');
		// this.userWals = JSON.parse(sessionStorage.getItem('WalList'));
		let oldVal = sessionStorage.getItem('selectedSite');
		this.SelectedSite.setValue(sessionStorage.getItem('selectedSite'));
		// this.SelectedSiteWal.setValue(sessionStorage.getItem('WalChosen'));
		this.SelectedSite.valueChanges.subscribe(value => {
			if(oldVal && value!=oldVal){
				sessionStorage.setItem('selectedSite',value);
				let newName = this.userSites.find((obj: { Code: any; }) => obj.Code === value);
				sessionStorage.setItem('chosenSite',newName?newName.Name:'');
				sessionStorage.setItem('WalList',JSON.stringify(newName.Wallets));
				sessionStorage.setItem('WalChosen',newName?newName.Wallets[0].Id:'');
				sessionStorage.setItem('WalName',newName?newName.Wallets[0].Name+' - '+newName.Wallets[0].Code:'');
				window.location.reload();
			}
		});
	}
	
	logout() {
		this.appService.logout();
		// this.router.navigate(['/login']);
		location.replace("/login");

	}
	
	onToggleMenuSidebar() {
		this.store.dispatch(new ToggleSidebarMenu());
	}
	
	onToggleControlSidebar() {
		this.store.dispatch(new ToggleControlSidebar());
	}

	switchMode(tVal:string){
		localStorage.setItem('dkMode',tVal);
		var event = new CustomEvent('modeWeb', { detail: { key: 'dkMode', value: 'tVal' } });
    window.dispatchEvent(event);
	}
}
