import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../environment/environment.development';
import { MenuItem } from '../interfaces/Menu/MenuItem';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private baseUrl = `${environment.apiUrl}/api/MenuItems`;

  constructor(private http: HttpClient) {}

  getMenuItems(): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(this.baseUrl).pipe(
      map(items => this.buildMenuTree(items))
    );
  }

 private buildMenuTree(items: MenuItem[]): MenuItem[] {
  const lookup: { [key: number]: any } = {};
  const roots: MenuItem[] = [];

  
  const routeMap: { [key: number]: string } = {
    1: '/home',
    2: '/account-settings',
    3: '/account-info',
    4: '/hr',
    5: '/employees',
    6: '/attendance',
    7: '/payroll',
    8: '/reports',
    9: '/projects',
    10: '/departments',
   
  };

 
  items.forEach(item => {
    lookup[item.id] = {
      ...item,
      route: routeMap[item.pageId ||  0]  ||'', 
      children: []
    };
  });

  
  items.forEach(item => {
    if (item.parentMenuId) {
      const parent = lookup[item.parentMenuId];
      if (parent) {
        parent.children.push(lookup[item.id]);
      }
    } else {
      roots.push(lookup[item.id]);
    }
  });

 
  return roots;
}
}