import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingComponent } from './components/setting/setting.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CustomHomeComponent } from './components/custom-home/custom-home.component';


const routes: Routes = [
    { path: '',  redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent},
    { path: 'custom', component: CustomHomeComponent},
    { path: 'settings', component: SettingComponent},
    { path: '**', component: NotFoundComponent }
  
  ];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
