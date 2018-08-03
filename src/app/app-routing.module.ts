import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { SigninComponent } from "./signin/signin.component";
import { SignupComponent } from "./signup/signup.component";


const appRouting:Routes = [
    {path:'', redirectTo:'/signin', pathMatch: 'full'},
    {path:'signin', component: SigninComponent},
    {path:'signup', component: SignupComponent}
]

@NgModule({
    imports: [
        RouterModule.forRoot(appRouting),
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule{}