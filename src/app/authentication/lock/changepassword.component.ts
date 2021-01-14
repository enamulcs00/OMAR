import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { AuthService } from '../auth.service'
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
import { NgxSpinnerService } from "ngx-spinner";
import { MustMatch } from './must-match-validator';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html'
})
export class changepasswordComponent implements OnInit {
  form: FormGroup;
  isSubmitted: Boolean = false
  constructor(
    private fb: FormBuilder,
    private toaster: ToastrService,
    private router: Router,
    private authService: AuthService,
    private spinner: NgxSpinnerService
  ) { }


  ngOnInit() {
    this.form = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmNewPassword: ['', Validators.required]
    }, { validator: MustMatch('newPassword', 'confirmNewPassword') })
  }

  save() {
    this.isSubmitted = true
    if (this.form.invalid) return
    this.spinner.show()
    let data = {
      oldPassword: this.form.value.oldPassword,
      newPassword: this.form.value.newPassword,
      confirmPassword: this.form.value.newPassword,
    }
    this.isSubmitted = false
    this.authService.changePassword(data).subscribe(response => {
      this.spinner.hide()
      if (response['success']) {
        this.toaster.success(response['message'])
        this.router.navigate(['dashboard'])
      } else {
        this.toaster.error(response['message'])
      }
    }, error => {
      this.toaster.error(error['message'])
      this.spinner.hide()
    })
  }
}