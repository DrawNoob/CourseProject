import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  // Mobile Header
  collapsed = true;

  private userSub: Subscription;
  isAutheticated = false;

  constructor(private dataStorageService: DataStorageService, private authService: AuthService) {

  }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAutheticated = !!user;
    });
  }

  // Зберігаємо дані в базі даних
  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  // Витягуєсо дані з бази дани
  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  
}
