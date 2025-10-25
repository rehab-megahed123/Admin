import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ForgotPasswordService } from '../../Services/forgotPasswordService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-send-otp',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './send-otp.component.html',
  styleUrl: './send-otp.component.css'
})
export class SendOtpComponent {
   sendOtpForm!: FormGroup;
  isSubmitting = false;
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private service: ForgotPasswordService, private router: Router) {
    this.sendOtpForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.sendOtpForm.invalid) {
      this.sendOtpForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    const email = this.sendOtpForm.value.email;

    this.service.sendOtp({ email }).subscribe({
      next: (res) => {
        this.isSubmitting = false;
        if (res.isSuccess) {
          this.successMessage = 'OTP has been sent to your email.';
          this.errorMessage = '';

          setTimeout(() => {
            this.router.navigate(['/verify-otp'], { queryParams: { email } });
          }, 1500);
        } else {
          this.errorMessage = res.error.message || 'Failed to send OTP.';
        }
      },
      error: (err) => {
        this.isSubmitting = false;
           const message =
    err.error?.error?.message?.message || // لو الباك رجع error داخل error
    err.error?.message?.message ||        // الشكل الحالي
    err.error?.error?.message ||          // fallback آخر
    err.error?.message ||                 // fallback إضافي
    'Something went wrong.';

  this.errorMessage = message;;
      }
    });
  }

}
