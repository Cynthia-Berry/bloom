import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from "@angular/router";

import {AuthService} from '../../../shared/services/api/auth/auth.service';
import {StorageService} from "../../../shared/services/storage.service";
import {DisplayService} from "../../../shared/services/display/display.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService,
              private router: Router, private storageService: StorageService,
              private displayService: DisplayService) {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit() {}

  get loginControls() {
    return this.loginForm.controls
  }

  signIn() {
    this.displayService.showLoader('Logging in...');
    this.authService.login(this.loginForm.value).subscribe(async response => {
      await this.storageService.saveToken(response.token);
      await this.displayService.closeLoader();
      await this.displayService.showToast(`${response.message}`, 'success');
      await this.router.navigate(['/dashboard']);
    }, error => {
      console.log(error);
    });
  }

}
