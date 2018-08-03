import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { SigninComponent } from "./signin/signin.component";
import { SignupComponent } from "./signup/signup.component";
import { ErrorPageComponent } from "./error-page/error-page.component";
import { AdminComponent } from "./auth/admin/admin.component";
import { AdminHomeComponent } from "./auth/admin/admin-home/admin-home.component";
import { AuthGuard } from "./shared/auth-guard.service";


const appRouting:Routes = [
    {path:'', redirectTo:'/signin', pathMatch: 'full'},
    {path:'signin', component: SigninComponent},
    {path:'signup', component: SignupComponent},
    {path:'admin', canActivate:[AuthGuard], component: AdminComponent, children:[
        {path:'', component: AdminHomeComponent},
    ]},
    {path:'error-page', component: ErrorPageComponent, data:{message:'Page Not Found'}},
    {path:'**', redirectTo:'/error-page', pathMatch: 'full'},
]

@NgModule({
    imports: [
        RouterModule.forRoot(appRouting, {useHash:true}),
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule{}