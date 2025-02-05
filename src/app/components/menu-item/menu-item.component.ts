import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterModule} from '@angular/router';
import {filter} from 'rxjs/operators';
import {openCloseAnimation, rotateAnimation} from './menu-item.animations';
import {FormControl,FormsModule,FormBuilder, FormGroup, FormArray, AbstractControl} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
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
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatAccordion, MatExpansionModule} from '@angular/material/expansion';
import { CommonModule } from '@angular/common';
import { FeatherModule } from 'angular-feather';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@Component({
  selector: 'app-menu-item',
  imports: [
    RouterModule,
      MatProgressSpinnerModule,CommonModule,
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
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.scss',
  animations: [openCloseAnimation, rotateAnimation]

})
export class MenuItemComponent implements OnInit {
  @Input() menuItem: any = null;
  public isExpandable: boolean = false;
  @HostBinding('class.nav-item') isNavItem: boolean = true;
  @HostBinding('class.menu-open') isMenuExtended: boolean = false;
  public isMainActive: boolean = false;
  public isOneOfChildrenActive: boolean = false;
  
  constructor(private router: Router) {}
  
  ngOnInit(): void {
    if (this.menuItem && this.menuItem.ChildMenu && this.menuItem.ChildMenu.length > 0)
    {
      this.isExpandable = true;
    }
      this.calculateIsActive(this.router.url);
      this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
        this.calculateIsActive(event.url);
      });
  }
  
  public handleMainMenuAction() {
    if (this.isExpandable) {
      this.toggleMenu();
      // return;
    }
    // this.router.navigate([this.menuItem.Link]);
  }
  
  public toggleMenu() {
    this.isMenuExtended = !this.isMenuExtended;
  }
  
  public calculateIsActive(url: string) {
    this.isMainActive = false;
    this.isOneOfChildrenActive = false;
    if (this.isExpandable) {
      this.menuItem.ChildMenu.forEach((item: any) => {
        if (item.Link === url) {
          this.isOneOfChildrenActive = true;
          this.isMenuExtended = true;
        }
      });
    } else if (this.menuItem.Link === url) {
      this.isMainActive = true;
    }
    if (!this.isMainActive && !this.isOneOfChildrenActive) {
      this.isMenuExtended = false;
    }
  }
}
