import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import {AlertService} from '../../../core/services/alert.service';
import {AlertComponent} from '../../../components/alert/alert.component';
import {TokenService} from '../../../core/services/token.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(public authService: AuthService,
              private router: Router, private matSnackBar: MatSnackBar,
              private tokenService: TokenService) {}
  @Output() toggleDisplay = new EventEmitter();

  isFormDisplay = true;

  // login(): any {
  //   this.authService.login().subscribe(() => {
  //     if (this.authService.isLoggedIn) {
  //       // Usually you would use the redirect URL from the auth service.
  //       // However to keep the example simple, we will always redirect to `/admin`.
  //       const redirectUrl = 'hero/heroes';
  //       // Redirect the user
  //       this.router.navigate([redirectUrl]);
  //     }
  //   });
  // }
  registerForm: any;

  ngOnInit(): void { this.toggleChangeForm(); }

  logout(): any {
    this.authService.logout();
  }

  toggleDisplayCall(): any {
    this.toggleDisplay.emit();
  }
  toggleChangeForm(): any {
    if (this.isFormDisplay) {
      document.getElementById('login').classList.add('show');
      document.getElementById('register').classList.remove('show');
    } else {
      document.getElementById('login').classList.remove('show');
      document.getElementById('register').classList.add('show');
    }
    this.isFormDisplay = !this.isFormDisplay;
  }

  login(username: string, password: string): any {
    this.authService.login({username, password}).subscribe(res => {
      console.log(res);
      if (res.success){
        this.matSnackBar.open('Đăng nhập thành công', 'Undo', {duration: 2000});
        this.authService.isLoggedIn = true;
        this.tokenService.setRefreshToken(res.data.refresh);
        this.tokenService.setToken(res.data.access);
        const redirectUrl = '/';
        this.router.navigate([redirectUrl]);
        this.toggleDisplay.emit();
      }else {
        this.matSnackBar.open(res.error_message, 'Undo', {duration: 2000});
      }
    });
  }

  register(): any {
    console.log(this.registerForm.value);
  }
}
