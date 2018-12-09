import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { LoginComponent } from './components/login/login.component'

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch:'full'},
  { path:'login', component: LoginComponent },
  { path : '', redirectTo : '/schedule', pathMatch:'full'},
  { path : 'schedule', component : ScheduleComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
