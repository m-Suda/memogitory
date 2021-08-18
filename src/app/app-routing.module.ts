import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { GithubComponent } from './pages/settings/github/github.component';
import { HubmemoDirComponent } from './pages/settings/hubmemo-dir/hubmemo-dir.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'settings',
    component: SettingsComponent,
  },
  {
    path: 'settings/hubmemo-dir',
    component: HubmemoDirComponent
  },
  {
    path: 'settings/github',
    component: GithubComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
