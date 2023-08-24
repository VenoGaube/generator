export const SHARED_MODULE = [
    {
        'tag': 'sharedModule',
        'value': 'Generate config Truffle',
        'ts':
`import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from "@angular/router";
import {MenubarModule} from "primeng/menubar";
import {ToggleButtonModule} from "primeng/togglebutton";
import {FormsModule} from "@angular/forms";
import {FooterComponent} from "./footer/footer.component";
import {MenuModule} from "primeng/menu";
import {AvatarModule} from "primeng/avatar";
import {ButtonModule} from "primeng/button";



@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MenubarModule,
    ToggleButtonModule,
    FormsModule,
    MenuModule,
    AvatarModule,
    ButtonModule,
  ]
})
export class SharedModule { }

 
`
    }
];