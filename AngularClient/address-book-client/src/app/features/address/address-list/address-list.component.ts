import { Component, OnInit } from '@angular/core';
import { Address } from '../../../core/models/address.model';
import { AddressService } from '../../../core/services/address.service';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.css'],
})
export class AddressListComponent implements OnInit {
  addresses: Address[] = [];
  loading = false;
  selectedAddress: Address | null = null;

  constructor(
    private addressService: AddressService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadAddresses();
  }

  loadAddresses(): void {
    this.loading = true;
    this.addressService
      .getAllAddresses()
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (addresses) => {
          this.addresses = addresses;
        },
        error: (error) => {
          this.toastr.error(error, 'Error Loading Addresses');
        },
      });
  }

  viewAddress(id: number): void {
    this.loading = true;
    this.addressService
      .getAddress(id)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (address) => {
          this.selectedAddress = address;
        },
        error: (error) => {
          this.toastr.error(error, 'Error Loading Address');
        },
      });
  }
}
