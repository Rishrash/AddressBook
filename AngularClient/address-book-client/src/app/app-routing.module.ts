import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressListComponent } from './features/address/address-list/address-list.component';
import { AddressFormComponent } from './features/address/address-form/address-form.component';

const routes: Routes = [
  { path: '', redirectTo: 'addresses', pathMatch: 'full' },
  { path: 'addresses', component: AddressListComponent },
  { path: 'address/new', component: AddressFormComponent },
  { path: '**', redirectTo: 'addresses' }, // Wildcard route for 404
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
