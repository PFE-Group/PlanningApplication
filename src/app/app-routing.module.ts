import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { InviteUserComponent} from './components/invite-user/invite-user.component';

const routes: Routes = [
  { path: '', redirectTo: '/schedule', pathMatch:'full'},
  { path:'schedule', component: ScheduleComponent },
  { path: 'inviteUser', component:InviteUserComponent} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
