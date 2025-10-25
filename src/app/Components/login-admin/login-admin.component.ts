import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../Services/AuthService';
@Component({
  selector: 'app-login-admin',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login-admin.component.html',
  styleUrl: './login-admin.component.css'
})
export class LoginAdminComponent implements OnInit {
  loginForm!: FormGroup;
  isSubmitting = false;
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe:[false]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    const loginData = this.loginForm.value;

    this.authService.login(loginData).subscribe({
      next: (response) => {
        this.isSubmitting = false;

        // ✅ Save token
        localStorage.setItem('token', response.token);
        this.successMessage = 'تم تسجيل الدخول بنجاح!';
        this.errorMessage = '';

        setTimeout(() => {
          this.successMessage = '';
          this.router.navigate(['/home']);
        }, 1500);
      },
      error: (err) => {
        this.isSubmitting = false;

        // ✅ Handle backend errors clearly
        if (
          err.error?.error?.includes('Invalid') ||
          err.error?.Error?.includes('Invalid') ||
          err.error?.message?.includes('Invalid')
        ) {
          this.errorMessage = 'البريد الإلكتروني أو كلمة المرور غير صحيحة.';
        } else {
          this.errorMessage = err.error?.error || 'حدث خطأ أثناء تسجيل الدخول. حاول مرة أخرى.';
        }

        this.successMessage = '';
        setTimeout(()=>{
            this.router.navigate(['/home']);
          },2000)

        setTimeout(() => {
          this.errorMessage = '';
        }, 3000);
      },
    });
  }

}
