import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { GrantComponent } from './grant/grant.component';
import { MatButton, MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    GrantComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CommonComponentsModule,
    MatButtonModule
  ],
  exports: [
    LoginComponent,
    GrantComponent
  ]
})
export class AuthModule { }
