import { Component, HostBinding, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import { ApiService } from '@services/api.service';
import { config } from '@services/config';
import { Router, RouterModule } from '@angular/router';
import { AuthModule } from '@auth/auth.module';

@Component({
  selector: 'app-recover-password',
  imports: [
    RouterModule,
    AuthModule

  ],
  templateUrl: './recover-password.component.html',
  styleUrl: './recover-password.component.scss'
})
export class RecoverPasswordComponent implements OnInit, OnDestroy {
	@HostBinding('class') class = 'login-box';
	
	public recoverPasswordForm!: FormGroup;
	public isAuthLoading = false;
	
	constructor( private renderer: Renderer2, private toastr: ToastrService, private apiservice: ApiService, private formBuilder: FormBuilder, private router: Router) {}
	
	ngOnInit(): void {
		this.renderer.addClass(document.querySelector('app-root'),'login-page');
		this.recoverPasswordForm = this.formBuilder.group({
			oldPassword: ['', (Validators.required)],
			newPassword: ['', (Validators.required)],
			confirmPassword: ['', (Validators.required)]
		});
	}
	
	recoverPassword() {
		if (this.recoverPasswordForm.invalid) {
			this.toastr.warning('Please fill all fields properly', 'Error!',{positionClass: 'toast-top-center'});
		} else {
			this.isAuthLoading = true;
			this.apiservice.sendRequest(config['changePassword'],this.recoverPasswordForm.getRawValue(),'changePassword').subscribe((data: any={}) => {
				this.isAuthLoading = false;
				if(data.ErrorCode==0){
					this.toastr.error(data.ErrorMessage,data.Result,{positionClass: 'toast-top-center'});
				}
				else if(data.ErrorCode==3){
					this.toastr.warning(data.ErrorMessage,data.Result,{positionClass: 'toast-top-center'});
				}
				else if(data.ErrorCode==1){
					this.toastr.success(data.ErrorMessage,data.Result,{positionClass: 'toast-top-center'});
					this.router.navigate(['/']);
				}
			}, (error) => {
				this.isAuthLoading = false;
				console.log(error);
				this.toastr.warning('Please try again', 'Error!',{positionClass: 'toast-top-center'});
			});	
		}
	}
	
	ngOnDestroy(): void {
		this.renderer.removeClass(document.querySelector('app-root'),'login-page');
	}
}
