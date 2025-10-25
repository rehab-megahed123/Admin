import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../../interfaces/Menu/MenuItem';
import { MenuService } from '../../Services/MenuService';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent  implements OnInit {
  menuItems: MenuItem[] = [];
  expandedItem: number | null = null;
   isSidebarOpen = false; 

 

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.menuService.getMenuItems().subscribe({
      next: (data) => this.menuItems = data,
      error: (err) => console.error(err)
    });
  }

  toggle(itemId: number): void {
    this.expandedItem = this.expandedItem === itemId ? null : itemId;
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

}
