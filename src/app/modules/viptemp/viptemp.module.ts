import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';

import { ViptempRoutingModule } from './viptemp-routing.module';
import { GroupComponent } from './group/group.component';
import { TemplateComponent } from './template/template.component';
import { LevelComponent } from './level/level.component';
import { AddFormComponent } from './group/add-form/add-form.component';
import { AddFormTempComponent } from './template/add-form-temp/add-form-temp.component';
import { AddFormLevComponent } from './level/add-form-lev/add-form-lev.component';
import { LeveltempconfigComponent } from './leveltempconfig/leveltempconfig.component';
import { TempfeatureconfigComponent } from './tempfeatureconfig/tempfeatureconfig.component';
import { AddlevtempconfComponent } from './leveltempconfig/addlevtempconf/addlevtempconf.component';
import { AddFormTfcComponent } from './tempfeatureconfig/add-form-tfc/add-form-tfc.component';
import { PlayerComponent } from './player/player.component';
import { EditlevtempconfComponent } from './leveltempconfig/editlevtempconf/editlevtempconf.component';

@NgModule({
//   declarations: [
//     GroupComponent,
//     TemplateComponent,
//     LevelComponent,
//     AddFormComponent,
//     AddFormTempComponent,
//     AddFormLevComponent,
//     LeveltempconfigComponent,
//     TempfeatureconfigComponent,
//     AddlevtempconfComponent,
//     AddFormTfcComponent,
//     PlayerComponent,
//     EditlevtempconfComponent
//   ],
  imports: [
    CommonModule,
    SharedModule,
    ViptempRoutingModule
  ]
})
export class ViptempModule { }
