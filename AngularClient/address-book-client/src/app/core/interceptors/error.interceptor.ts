import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private toastr: ToastrService, private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error) {
          switch (error.status) {
            case 400:
              if (error.error?.errors) {
                const modalStateErrors = [];
                for (const key in error.error.errors) {
                  if (error.error.errors[key]) {
                    modalStateErrors.push(error.error.errors[key]);
                  }
                }
                throw modalStateErrors.flat();
              } else if (typeof error.error === 'object') {
                this.toastr.error(error.statusText, error.status.toString());
              } else {
                this.toastr.error(error.error, error.status.toString());
              }
              break;

            case 401:
              this.toastr.error('Unauthorized', error.status.toString());
              break;

            case 403:
              this.toastr.error('Forbidden', error.status.toString());
              break;

            case 404:
              this.toastr.error('Not Found', error.status.toString());
              break;

            case 500:
              const navigationExtras = {
                state: { error: error.error },
              };
              this.toastr.error('Server Error', error.status.toString());
              break;

            default:
              this.toastr.error('Something unexpected went wrong');
              console.error(error);
              break;
          }
        }
        return throwError(() => error);
      })
    );
  }
}
