import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { NgxSpinnerService } from 'ngx-spinner'
import { PagesService } from '../pages.service'
import { ToastrService } from 'ngx-toastr'
import { environment } from '../../../environments/environment'
import { TranslateService } from '@ngx-translate/core';

@Component({
  templateUrl: 'profile.component.html'
})
export class ProfileComponent implements OnInit {
 
  imageUrl: String = environment.imageUrl
  file: any;
  image: any;
  isSubmitted: Boolean = false
  form: FormGroup;
  profileData: Object;
  constructor(
    private fb: FormBuilder,
    private service: PagesService,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private translate: TranslateService
  ) {
    translate.setDefaultLang('en');
    translate.use(localStorage.getItem('localization'));
  }

  ngOnInit() {
    this.getProfile()
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      profilePic: [''],
      phone: ['', Validators.pattern("[- +()0-9]+")],
  }, {validators: [this.whiteSpaceFN, this.whiteSpaceLN]})
  }

  whiteSpaceFN(form: FormGroup) {
    const isWhitespace = (form.controls['firstName'].value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespacefn': true };
  }
  whiteSpaceLN(form: FormGroup) {
    const isWhitespace = (form.controls['lastName'].value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespaceln': true };
  }

  getProfile() {
    this.spinner.show()
    this.service.getProfile().subscribe(response => {
      let profile = JSON.parse(localStorage.getItem('tamshiyah_admin'))
      this.spinner.hide()
      this.profileData = response['data']
      this.form.patchValue({
        firstName: response['data'].firstName,
        lastName: response['data'].lastName,
        profilePic: response['data'].profilePic,
        phone: response['data'].phone,
      })
      if(response['data']['profilePic']) {
        this.image = `${this.imageUrl}/${response['data']['profilePic']}`
        profile['profilePic'] = response['data']['profilePic']
      }
      profile['firstName'] = response['data']['firstName']
      profile['lastName'] = response['data']['lastName']
      profile['phone'] = response['data']['phone']
      localStorage.setItem('tamshiyah_admin', JSON.stringify(profile))
  }, error => {
      this.spinner.hide()
      this.toaster.error(error['message'])
    })
  }

  async onChange(event, type) {
    this.file = event.target.files[0]
    this.form.get('profilePic').setValue(event.target.files[0]);
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        if (type === 'image') {
          this.image = event.target.result;
        }
      };
      // const formData = new FormData();
      // this.formData.append('file', file);
      // this.service.uploadFile(formData).subscribe((res: any) => {
      //   if (res['success'] === 200) {
      //     this.toaster.success(res['message']);
      //     if (type === 'image') {
      //       this.form.controls['image'].setValue(res['data']['filePath']);
      //     }
      //   } else {
      //     this.toaster.error(res['message']);
      //   }
      // });
    }
  }

  save() {
    this.isSubmitted = true
    if(this.form.invalid) return
    this.spinner.show()
    this.isSubmitted = false
    let data = new FormData()
    console.log(this.form.get('profilePic').value)
    if(this.file) {
      data.append('profilePic', this.form.get('profilePic').value, this.form.get('profilePic').value['name'])
    }
    for(let key in this.form.value) {
      if(key != 'profilePic') {
        data.append(key, this.form.value[key])
      }
    }
    this.service.updateProfile(data).subscribe(response => {
      this.spinner.hide()
      if(response['success']) {
        this.getProfile()
        this.toaster.success('Profile Updated')  
      } else {
        this.toaster.error(response['message'])
      }
    }, error => {
      this.spinner.hide()
      this.toaster.error(error['message'])
    })
  }
}