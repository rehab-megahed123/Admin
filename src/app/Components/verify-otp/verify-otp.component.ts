import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ForgotPasswordService } from '../../Services/forgotPasswordService';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-verify-otp',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './verify-otp.component.html',
  styleUrl: './verify-otp.component.css'
})
export class VerifyOtpComponent implements OnInit {
  verifyOtpForm!: FormGroup;
  isSubmitting = false;
  successMessage = '';
  errorMessage = '';
  email!: string;
  timer = 120; // ثواني = دقيقتين
  interval: any;

  constructor(
    private fb: FormBuilder,
    private service: ForgotPasswordService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.verifyOtpForm = this.fb.group({
      otp: ['', [Validators.required, Validators.minLength(4)]],
    });

    
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
    });

   
    this.startTimer();
  }

 startTimer(): void {
  this.interval = setInterval(() => {
    if (this.timer > 0) {
      this.timer--;
    } else {
      clearInterval(this.interval);
      this.errorMessage = 'OTP has expired. Please request a new one.';
      
      
      setTimeout(() => {
        this.router.navigate(['/send-otp']);
      }, 1500);
    }
  }, 1000);
}
  onSubmit(): void {
    if (this.verifyOtpForm.invalid) {
      this.verifyOtpForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    const otp = this.verifyOtpForm.value.otp;

    this.service.verifyOtp({ email: this.email, otp }).subscribe({
      next: (res) => {
        this.isSubmitting = false;
        if (res.isSuccess) {
          this.successMessage = 'OTP verified successfully.';
          this.errorMessage = '';
          setTimeout(() => {
            this.router.navigate(['/reset-password'], { queryParams: { email: this.email } });
          }, 1500);
        } else {
          this.errorMessage = res.error.message || 'Invalid OTP.';
        }
      },
      error: (err) => {
        this.isSubmitting = false;
        const message =
          err.error?.error?.message?.message ||
          err.error?.message?.message ||
          err.error?.error?.message ||
          err.error?.message ||
          'Something went wrong.';
        this.errorMessage = message;
      }
    });
  }
}
