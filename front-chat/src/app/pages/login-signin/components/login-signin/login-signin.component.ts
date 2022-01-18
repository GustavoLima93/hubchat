import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'angular-toastify';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { UtilService } from 'src/app/shared/services/util.service';

import { IAuthFormResponse } from '../../interfaces/IAuthForm';
import { LoginSigninService } from '../../services/login-signin.service';

@Component({
  selector: 'app-login-signin',
  templateUrl: './login-signin.component.html',
  styleUrls: ['./login-signin.component.scss']
})
export class LoginSigninComponent implements OnInit {


  public action: string | null;
  public form: FormGroup;

  public confirmDiffPassword: boolean;
  public spinnerButton = false;

  private formGroupProperties: any = {
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private loginSigninService: LoginSigninService,
    private _toastService: ToastService,
    private utilService: UtilService
  ) { }

  get name() {
    return this.form.controls['name'];
  }

  get email() {
    return this.form.controls['email'];
  }

  get password() {
    return this.form.controls['password'];
  }

  get confirmPassword() {
    return this.form.controls['confirmPassword'];
  }

  ngOnInit(): void {
    this.observeRoute()
  }

  observeRoute() {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (paramMap.get('action')) {
        this.action = paramMap.get('action');

        switch (this.action) {
          case 'signin':
            this.formGroupProperties =
              { ...this.formGroupProperties, name: ['', Validators.required], confirmPassword: ['', Validators.required] }
            this.initForm(this.formGroupProperties);
            this.observeValidPasswordConfirmation();
            break;
          case 'login':
            this.initForm(this.formGroupProperties);
            break;
          default:
            this.resetForm();
            this.router.navigate(['/chat/login']);
            break;
        }

      } else {
        this.resetForm();
        this.router.navigate(['/chat/login'])
      }
    });
  }

  observeValidPasswordConfirmation() {
    return this.form.valueChanges.pipe(
      debounceTime(600),
      distinctUntilChanged()
    ).subscribe(({ password, confirmPassword }) => {
      if (password && confirmPassword) {
        if (password !== confirmPassword) {
          this.confirmDiffPassword = true;
        } else {
          this.confirmDiffPassword = false
        }
      }
    });
  }



  initForm(group: FormGroup) {
    this.form = this.formBuilder.group(group)
  }

  submitForm() {
    if (this.action === 'signin') {
      this.signin();
    }

    if (this.action === 'login') {
      this.login();
    }
  }

  signin() {
    this.spinnerButton = true;
    this.loginSigninService.signinUser(this.form.value).subscribe(
      {
        next: () => {
          this._toastService.success('Conta criada');
          this.router.navigate(['/chat/login']);
          this.resetForm();
        },
        error: () => {
          this._toastService.error('Ocorreu um erro ao se autenticar');
          this.spinnerButton = false;
        },
        complete: () => {}
      }
    );
  }

  login() {
    this.spinnerButton = true;
    this.loginSigninService.loginUser(this.form.value).subscribe({
      next: (resp: IAuthFormResponse) => {
        this.utilService.setLocalStorage('token', resp.token);
        this.router.navigate(['/chat']);
      },
      error: () => {
        this._toastService.error('Ocorreu um erro ao se autenticar');
        this.spinnerButton = false;
      },
      complete: () => {}
    });
  }

  navigation() {
    if (this.action === 'signin') {
      this.resetForm();
      this.router.navigate(['/chat/login']);
    }

    if (this.action === 'login') {
      this.resetForm();
      this.router.navigate(['/chat/signin']);
    }
  }

  resetForm(): void {
    this.formGroupProperties = {
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    }
  }

}
