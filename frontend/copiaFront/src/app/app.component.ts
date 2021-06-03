import { Component } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { AuthguardGuard } from './authguard.guard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private guard: AuthguardGuard, private storage: LocalStorageService) {   
  }

  logout(){
    this.storage.clear('user')
    this.storage.clear('token')
    window.location.replace('/login')
  }
  title = 'copiaFront';
  isLoggedIn =this.guard.canActivate();
}
