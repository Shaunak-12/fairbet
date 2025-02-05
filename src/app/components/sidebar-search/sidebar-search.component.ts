import {
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
// import {MENU} from '@common/main/menu-sidebar/menu-sidebar.component';
// import {PfDropdown} from '@profabric/angular-components';
import {Dropdown} from '@profabric/angular-components';

import {ProfabricComponentsModule} from '@profabric/angular-components';

@Component({
  selector: 'app-sidebar-search',
  imports: [ProfabricComponentsModule],
  templateUrl: './sidebar-search.component.html',
  styleUrl: './sidebar-search.component.scss'
})
export class SidebarSearchComponent implements OnInit {
  public searchText: string = '';
  public foundMenuItems: { path: any; name: string; children: any; }[] = [];
  @ViewChild('dropdown') dropdown!: Dropdown;

  constructor() {}

  ngOnInit(): void {}

  handleSearchTextChange(event:{ target: { value: string; }; }) {
      this.foundMenuItems = [];

      if (event.target.value) {
          this.searchText = event.target.value;
          // this.findMenuItems(MENU);
          return;
      } else {
          this.searchText = '';
          // this.dropdown.isOpen = false;
      }
  }

  handleIconClick() {
      this.searchText = '';
      // this.dropdown.isOpen = false;
  }

  handleMenuItemClick() {
      this.searchText = '';
      // this.dropdown.isOpen = false;
  }

  findMenuItems(menu : { path: any; name: string; children: any; }[]) {
      if (!this.searchText) {
          return;
      }

      menu.forEach((menuItem) => {
          if (
              menuItem.path &&
              menuItem.name
                  .toLowerCase()
                  .includes(this.searchText.toLowerCase())
          ) {
              this.foundMenuItems.push(menuItem);
          }
          if (menuItem.children) {
              return this.findMenuItems(menuItem.children);
          }
      });

      if (this.foundMenuItems.length > 0) {
          // this.dropdown.isOpen = true;
      }
  }

  boldString(str: string, substr: any) {
      return str.replaceAll(
          this.capitalizeFirstLetter(substr),
          `<strong class="text-light">${this.capitalizeFirstLetter(
              substr
          )}</strong>`
      );
  }

  capitalizeFirstLetter(string: string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
