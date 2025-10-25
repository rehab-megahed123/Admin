import { RouterModule, Routes } from '@angular/router';
import { LoginAdminComponent } from './Components/login-admin/login-admin.component';
import { SendOtpComponent } from './Components/send-otp/send-otp.component';
import { VerifyOtpComponent } from './Components/verify-otp/verify-otp.component';
import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';
import { NgModule } from '@angular/core';
import { HomeComponent } from './pages/home/home.component';
import { AccountSettingsComponent } from './pages/account-settings/account-settings.component';
import { AccountInfoComponent } from './pages/account-info/account-info.component';
import { EmployeesComponent } from './pages/employees/employees.component';
import { HumanResourcesComponent } from './pages/human-resources/human-resources.component';
import { LayoutComponent } from './Layouts/layout/layout.component';
import { AuthGuard } from './Guards/AuthGuard';

export const routes: Routes = [
    
    {path: 'login', component: LoginAdminComponent},
    {path: 'send-otp', component: SendOtpComponent},
    {path: 'verify-otp', component: VerifyOtpComponent},
    {path: 'reset-password', component: ResetPasswordComponent},
    {path:'',
        component:LayoutComponent,
        children:[
            { path: 'home', component: HomeComponent,canActivate: [AuthGuard] },
            { path: 'account-settings', component: AccountSettingsComponent, canActivate: [AuthGuard] },
            { path: 'account-info', component: AccountInfoComponent, canActivate: [AuthGuard] },
             { path: 'hr', component: HumanResourcesComponent, canActivate: [AuthGuard] },
  { path: 'employees', component: EmployeesComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
        ]
    }

     
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
