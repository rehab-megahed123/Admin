import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ForgotPasswordService } from '../../Services/forgotPasswordService';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit {
  resetForm!: FormGroup;
  isSubmitting = false;
  successMessage = '';
  errorMessage = '';
  email!: string;

  constructor(
    private fb: FormBuilder,
    private service: ForgotPasswordService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.resetForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    });

    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
    });
  }

  onSubmit(): void {
    if (this.resetForm.invalid) {
      this.resetForm.markAllAsTouched();
      return;
    }

    const { newPassword, confirmPassword } = this.resetForm.value;
    if (newPassword !== confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    this.isSubmitting = true;

    this.service.resetPassword({ email: this.email, newPassword }).subscribe({
      next: (res) => {
        this.isSubmitting = false;
        if (res.isSuccess) {
          this.successMessage = 'Password reset successfully!';
          this.errorMessage = '';
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 1500);
        } else {
          this.errorMessage = res.error.message || 'Failed to reset password.';
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
