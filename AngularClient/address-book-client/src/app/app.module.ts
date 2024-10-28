import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddressListComponent } from './features/address/address-list/address-list.component';
import { AddressFormComponent } from './features/address/address-form/address-form.component';
import { LoadingSpinnerComponent } from './shared/components/loading-spinner/loading-spinner.component';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    AddressListComponent,
    AddressFormComponent,
    LoadingSpinnerComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      timeOut: 3000,
      closeButton: true,
      progressBar: true,
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
