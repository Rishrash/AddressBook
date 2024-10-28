import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressFormComponent } from './address-form/address-form.component';
import { AddressListComponent } from './address-list/address-list.component';



@NgModule({
  declarations: [
    AddressFormComponent,
    AddressListComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AddressModule { }
