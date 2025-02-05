import {
  Component,
  HostBinding,
  OnDestroy,
  OnInit,
  Renderer2
} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {AppService} from '@services/app.service';
import { RouterModule } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AuthModule } from '@auth/auth.module';

@Component({
  selector: 'app-forgot-password',
  imports: [
    RouterModule,
    AuthModule
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  @HostBinding('class') class = 'login-box';
  public forgotPasswordForm!: UntypedFormGroup;
  public isAuthLoading = false;

  constructor(
      private renderer: Renderer2,
      private toastr: ToastrService,
      private appService: AppService
  ) {}

  ngOnInit(): void {
      this.renderer.addClass(
          document.querySelector('app-root'),
          'login-page'
      );
      this.forgotPasswordForm = new UntypedFormGroup({
          email: new UntypedFormControl(null, Validators.required)
      });
  }

  forgotPassword() {
      if (this.forgotPasswordForm.valid) {
      } else {
          this.toastr.error('Hello world!', 'Toastr fun!');
      }
  }

  ngOnDestroy(): void {
      this.renderer.removeClass(
          document.querySelector('app-root'),
          'login-page'
      );
  }
}
