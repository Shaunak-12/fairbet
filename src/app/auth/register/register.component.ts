import {
  Component,
  OnInit,
  Renderer2,
  OnDestroy,
  HostBinding
} from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { AppService } from '@services/app.service';
import { ToastrService } from 'ngx-toastr';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthModule } from '@auth/auth.module';

@Component({
  selector: 'app-register',
  imports: [
    RouterModule,
    AuthModule

  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class RegisterComponent implements OnInit, OnDestroy {
  @HostBinding('class') class = 'register-box';

  public registerForm!: UntypedFormGroup;
  public isAuthLoading = false;
  public isGoogleLoading = false;
  public isFacebookLoading = false;

  constructor(
      private renderer: Renderer2,
      private toastr: ToastrService,
      private appService: AppService
  ) {}

  ngOnInit() {
      this.renderer.addClass(
          document.querySelector('app-root'),
          'register-page'
      );
      this.registerForm = new UntypedFormGroup({
          email: new UntypedFormControl(null, Validators.required),
          password: new UntypedFormControl(null, [Validators.required]),
          retypePassword: new UntypedFormControl(null, [Validators.required])
      });
  }

  async registerByAuth() {
      if (this.registerForm.valid) {
          this.isAuthLoading = true;
          // await this.appService.registerByAuth(this.registerForm.value);
          this.isAuthLoading = false;
      } else {
          this.toastr.error('Form is not valid!');
      }
  }

  ngOnDestroy() {
      this.renderer.removeClass(
          document.querySelector('app-root'),
          'register-page'
      );
  }
}
