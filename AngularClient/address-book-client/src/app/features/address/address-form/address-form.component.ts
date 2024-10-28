import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddressService } from '../../../core/services/address.service';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.css'],
})
export class AddressFormComponent implements OnInit {
  addressForm: FormGroup;
  submitting = false;

  constructor(
    private fb: FormBuilder,
    private addressService: AddressService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.addressForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      addressLine: ['', [Validators.required, Validators.maxLength(200)]],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.addressForm.valid) {
      this.submitting = true;

      this.addressService
        .createAddress(this.addressForm.value)
        .pipe(finalize(() => (this.submitting = false)))
        .subscribe({
          next: () => {
            this.toastr.success('Address created successfully!');
            this.router.navigate(['/addresses']);
          },
          error: (error) => {
            this.toastr.error(error, 'Error Creating Address');
          },
        });
    } else {
      Object.keys(this.addressForm.controls).forEach((key) => {
        const control = this.addressForm.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
    }
  }
}
