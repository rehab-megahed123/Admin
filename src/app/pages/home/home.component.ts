import { Component, OnInit } from '@angular/core';
import { Company } from '../../interfaces/Company/Company';
import { environment } from '../../environment/environment.development';
import { CompanyService } from '../../Services/CompanyService';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  companies: Company[] = [];
  isLoading = true;
  root = environment.apiUrl; 

  constructor(private companyService: CompanyService) {}

  ngOnInit(): void {
    this.loadCompanies();
  }

  loadCompanies() {
    this.companyService.getAllCompanies().subscribe({
      next: (res) => {
        this.companies = res;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading companies:', err);
        this.isLoading = false;
      }
    });
  }

}
