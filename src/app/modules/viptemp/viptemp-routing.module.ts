import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GroupComponent } from './group/group.component';
import { TemplateComponent } from './template/template.component';
import { LevelComponent } from './level/level.component';
import { LeveltempconfigComponent } from './leveltempconfig/leveltempconfig.component';
import { TempfeatureconfigComponent } from './tempfeatureconfig/tempfeatureconfig.component';
import { PlayerComponent } from './player/player.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'group',
    pathMatch: 'full'
  },
  {
    path: 'group',
    component: GroupComponent
  },
  {
    path: 'template',
    component: TemplateComponent
  },
  {
    path: 'level',
    component: LevelComponent
  },
  {
    path: 'leveltempconfig',
    component: LeveltempconfigComponent
  },
  {
    path: 'tempfeatureconfig',
    component: TempfeatureconfigComponent
  },
  {
    path: 'player',
    component: PlayerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViptempRoutingModule { }
