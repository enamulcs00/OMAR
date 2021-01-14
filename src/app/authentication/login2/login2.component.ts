import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { AuthService } from '../auth.service'
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
import { NgxSpinnerService } from "ngx-spinner";
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login2.component.html',
  styleUrls: ['./login2.scss']
})
export class Login2Component implements OnInit{
  loginForm: FormGroup;
  recoveryForm: FormGroup;
  showPasswordRecoveryForm: boolean = false
  isSubmitted: Boolean = false

  constructor(
    private fb: FormBuilder,
    private toaster: ToastrService,
    private router: Router,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private translate: TranslateService
  ) {
    translate.setDefaultLang('en');
    translate.use(localStorage.getItem('localization'));
  }

  changeLang(val) {
    localStorage.setItem('localization', val)
    this.translate.use(val)
  }
  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: ['']
    })
    if(localStorage.getItem('remembertamshiyahadmin')) {
      let formData = JSON.parse(localStorage.getItem('remembertamshiyahadmin'))
      this.loginForm.patchValue({
        email: formData.email,
        password: formData.password,
        rememberMe: formData.rememberMe
      })  
    }
    this.recoveryForm = this.fb.group({
      email: ['', Validators.required]
    })
  }

  login() {
    this.isSubmitted = true
    if(this.loginForm.invalid) return true
    this.spinner.show()
    this.isSubmitted = false
    let data = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    }
    this.authService.login(data).subscribe(response =>{
      if(response['success']) {
        localStorage.setItem('tamshiyah_admin', JSON.stringify(response['data']))
        if(this.loginForm.value.rememberMe) {
          localStorage.setItem('remembertamshiyahadmin', JSON.stringify(this.loginForm.value))
        } else {
          localStorage.removeItem('remembertamshiyahadmin')
        }
        this.router.navigate(['dashboard']);
      } else {
        this.loginForm.reset()
        this.toaster.error(response['message'])
      }
      this.spinner.hide()
    }, error => {
      this.toaster.error(error['message'])
      this.spinner.hide()
      console.log(error)
    })
  }

  recover() {
    this.isSubmitted = true
    if(this.recoveryForm.invalid) return true
    this.spinner.show()
    let data = this.recoveryForm.value
    data['type'] = 'recover'
    this.isSubmitted = false
    this.authService.sendLink(data).subscribe(response => {
      this.spinner.hide()
      if(response['success']) {
        this.showPasswordRecoveryForm = false
        this.toaster.success(response['message'])
      } else {
        this.recoveryForm.reset()
        this.toaster.error(response['message'])
      }
    }, error => {
      this.spinner.hide()
      this.toaster.error(error['message'])
      console.log(error)
    })
  }

  showRecoverForm() {
    this.showPasswordRecoveryForm = !this.showPasswordRecoveryForm
  }
}
