import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private fullNameSubject = new BehaviorSubject<string>('');
  fullName$ = this.fullNameSubject.asObservable();
  private loggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loggedIn.asObservable();

  constructor() {
    if (typeof window !== 'undefined' && localStorage) {
      const hasToken = !!localStorage.getItem('token');
      this.loggedIn.next(hasToken);
      const fullName = localStorage.getItem('userFullName') ?? '';
      this.fullNameSubject.next(hasToken ? fullName : '');
    }
  }

  login(): void {
    if (typeof window !== 'undefined' && localStorage) {
      const name = localStorage.getItem('userFullName') ?? '';
      this.fullNameSubject.next(name);
      localStorage.setItem('token', 'mock-token');
      this.loggedIn.next(true);
    }
  }

  logout(): void {
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.removeItem('token');
      localStorage.removeItem('userFullName');
      this.loggedIn.next(false);
    }
  }
}
